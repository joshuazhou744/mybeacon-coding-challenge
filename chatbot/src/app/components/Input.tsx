"use client";
import { useState } from 'react';
import styles from '../styles/Input.module.css';
import Chat from './Chat';
import { v4 as uuidv4 } from 'uuid';

interface MessageType {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

const Input: React.FC = () => {
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
            const botResponse = await simulateBotResponse(input);
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

    const simulateBotResponse = (userInput: string): Promise<string> => {
        return new Promise((resolve) => {
            console.log(userInput)
            setTimeout(() => {
            resolve("I'm here to help with your immigration questions!");
            }, 1000);
        });
    };

    return (
        <div className={styles.inputContainer}>
            <Chat messages={messages} />
            <form onSubmit={handleSend} className={styles.form}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className={styles.input}
                    placeholder="Type your message..."
                />
                <button type="submit" className={styles.button} disabled={isLoading}>
                    Send
                </button>
            </form>
        </div>
    )
}

export default Input;
