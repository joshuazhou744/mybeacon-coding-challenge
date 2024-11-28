// Chat.tsx
import { useEffect, useRef } from 'react';
import styles from '../styles/Chat.module.css';
import Message from './Message';
import TypingBubble from './TypingBubble';

interface MessageType {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

interface Props {
    messages: MessageType[];
    isLoading: boolean;
}

const Chat = ({messages, isLoading}: Props): JSX.Element => {

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
            {isLoading && <TypingBubble/>}
        </div>
    )

}

export default Chat;
