"use client";
import { useState } from 'react';
import styles from '../styles/Input.module.css';
import Chat from './Chat';
import { v4 as uuidv4 } from 'uuid';
import { sendMessage } from '../services/api';
import {ClipLoader} from "react-spinners";

interface MessageType {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

const Input = (): JSX.Element => {
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();

        if (input.trim() == '') {
            return;
        }
        const userMessage: MessageType = {
            id: uuidv4(),
            text: input,
            sender: 'user'
        }
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const botResponse = await sendMessage(input);
            const botMessage: MessageType = {
                id: uuidv4(),
                text: botResponse,
                sender: 'bot',
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error fetching bot response:', error);
            const botResponse = "Sorry, I'm having trouble understanding you. Please try again.";
            const botMessage: MessageType = {
                id: uuidv4(),
                text: botResponse,
                sender: 'bot',
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.inputContainer}>
            <Chat messages={messages} isLoading={isLoading} />
            <form onSubmit={handleSend} className={styles.form}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className={styles.input}
                    placeholder="Type your message..."
                />
                {!isLoading && (
                    <button type="submit" className={styles.button} disabled={isLoading}>
                        Send
                    </button>
                )}
                {isLoading && (
                    <div className={styles.loadingContainer}>
                        <ClipLoader size={20} color="#3182ce" />
                        <span className={styles.loadingText}>Generating...</span>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Input;
