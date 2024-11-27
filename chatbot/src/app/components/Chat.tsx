// Chat.tsx
import { useEffect, useRef } from 'react';
import styles from '../styles/Chat.module.css';
import Message from './Message';

interface MessageType {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

interface Props {
    messages: MessageType[];
}

const Chat: React.FC<Props> = ({messages}) => {

    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        // console.log(messages)
    }, [messages]);
    
    return (
        <div className={styles.chatContainer}>
            {messages.length == 0 ? (
                <div className={styles.noMessage}></div>
            ) : (
                messages.map((msg) => <Message key={msg.id} message={msg} />)
            )}
            <div ref={chatEndRef} />
        </div>
    )

}

export default Chat;
