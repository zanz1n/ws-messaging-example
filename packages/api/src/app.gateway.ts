import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({ namespace: "chat" })
export class AppGateway {
    @SubscribeMessage("message")
    handleMessage(client: any, payload: any): string {
        return "Hello world!";
    }
}
