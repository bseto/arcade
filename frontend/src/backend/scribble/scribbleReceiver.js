import { WebSocketEvent } from "@/backend/communication/webSocketEvent";
import { ScribbleEvent } from "./scribbleEvent";
export default class ScribbleReceiver {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    update(event, data) {
        if (event === WebSocketEvent.WEBSOCKET_CONNECTED) {
            this.gameManager.handle(ScribbleEvent.NEW_PLAYER_JOIN, data);
        } else if (event === WebSocketEvent.WEBSOCKET_ONMESSAGE) {
            if (this.gameManager.getCurrentState() == null) {
                this.gameManager.handle(ScribbleEvent.INITIALIZATION, data)
            } else {
                const api = data.api;
                if (api === "hub") {
                    this.gameManager.handle(ScribbleEvent.PLAYER_UPDATE, data);
                }
            }
        }
    }
}
