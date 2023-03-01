import { MessageType } from "./ChatBox";

export interface MessageProps {
    message: MessageType;
    selfUser: string;
}

export function Message({ message, selfUser }: MessageProps) {
    return (
        <>
            {
                message.user == selfUser ?
                    (
                        <div className="message self-user">
                            <div className="content">{message.content}</div>
                        </div>
                    ) : // else
                    (
                        <div className="message other-user">
                            <div className="content">{message.content}</div>
                        </div>
                    )
            }
        </>
    );
}
