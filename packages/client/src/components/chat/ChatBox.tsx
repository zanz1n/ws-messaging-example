import { useEffect, useState } from "react";
import { useAuth } from "../../lib/context/AuthContext";
import { Message } from "./Message";

export interface MessageType {
    user: string;
    content: string;
    sentAt: Date;
}

const content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio laborum praesentium totam sapiente veritatis fugit nam quisquam nobis, reiciendis itaque inventore ipsa velit, voluptatem nostrum consequuntur alias sed corrupti deserunt!";

export default function ChatBox() {
    const [messages, setMessages] = useState<MessageType[]>([]);

    const { ping } = useAuth();

    const selfUser = "zanz1n";

    useEffect(() => {
        ping();
        setMessages([...messages, { content, sentAt: new Date(), user: "zanz1n" }, { content, sentAt: new Date(), user: "user2" }, { content, sentAt: new Date(), user: "user3" }]);
    }, []);

    return (
        <div className="chat-box">
            <div className="messages">
                {messages.map((message) => {
                    const messageProps = { message, selfUser };
                    return (<Message { ...messageProps } />);
                })}
            </div>
        </div>
    );
}
