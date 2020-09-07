export default class DrawApiService {
    requestDrawHistory(webSocketConnection) {
        const request = {
            api: "draw",
            payload: {
                requestHistory: true
            }
        }

        this.sendMessage(webSocketConnection, request);
    }

    draw(webSocketConnection, drawAction) {
        const request = {
            api: "draw",
            payload: {
                action: drawAction,
                requestHistory: false,
            }
        }

        this.sendMessage(webSocketConnection, request);
    }

    sendMessage(webSocketConnection, data) {
        webSocketConnection.send(data);
    }
}