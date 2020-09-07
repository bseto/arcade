import { Event } from "@/events";
import { EventBus } from "../eventBus.js";

// Service for handling connecting, sending, and recieving on websocket.
export default class WebSocketService {
    constructor(webSocketURL, cookieService, eventHandlerService) {
        this.webSocketURL = webSocketURL;
        this.webSocket = null;
        this.cookieService = cookieService;
        this.eventHandlerService = eventHandlerService;
    }

    getWebSocketURL() {
        return this.webSocketURL;
    }

    connect(lobbyId) {
        console.log("Connecting to websocket...");
        const webSocketURL = `${this.webSocketURL}/${lobbyId}`;
        this.webSocket = new WebSocket(webSocketURL);
        this.initWebSocket(this.webSocket, lobbyId);
    }

    disconnect() {
        if (this.isConnected()) {
            this.webSocket.close();
        }
    }

    initWebSocket(webSocket, lobbyId) {
        webSocket.onopen = () => {
            const arcadeSession = this.cookieService.getArcadeCookie();
            if (arcadeSession != null && arcadeSession.ContainsToken != false) {
                this.send(arcadeSession);
            } else {
                const noToken = {
                    api: "auth",
                    payload: {
                        ContainsToken: false,
                    },
                };
                this.send(noToken);
            }

            console.log(
                `Successfully connected to the websocket. ID: ${lobbyId}`
            );
            EventBus.$emit(Event.WEBSOCKET_CONNECTED, lobbyId);
        };

        webSocket.onmessage = (event) => {
            const json = JSON.parse(event.data);
            const api = json.api;
            const payload = json.payload;

            this.eventHandlerService.handle(api, payload);
        };

        webSocket.onclose = () => {
            console.log("Websocket connection is closed");
        };
    }

    send(data) {
        if (this.isConnected()) {
            const json = JSON.stringify(data);
            this.webSocket.send(json);
        } else {
            console.error("NOT CONNECTED");
        }
    }

    isConnected() {
        return (
            this.webSocket != null &&
            this.webSocket.readyState === WebSocket.OPEN
        );
    }
}