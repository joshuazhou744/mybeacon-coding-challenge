"use client";
import { useState } from 'react';
import styles from '../styles/Input.module.css';
import Chat from './Chat';
import { v4 as uuidv4 } from 'uuid';
import { sendMessage } from '../services/api';
import {ClipLoader} from "react-spinners";
import { setupMessages } from '../services/setupMessages';

interface MessageType {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

const Input = (): JSX.Element => {
    const [input, setInput] = useState<string>(''); // user input state
    const [messages, setMessages] = useState<MessageType[]>([
        {
            id: setupMessages[0].id,
            text: setupMessages[0].prompt,
            sender: 'bot',
        }
    ]); // all messages state
    const [isLoading, setIsLoading] = useState<boolean>(false); // loading state for conditional renders
    const [currentSetupIndex, setCurrentSetupIndex] = useState<number>(0); // current setup message index

    const handleSend = async (e: React.FormEvent) => { // send user messages to the bot
        e.preventDefault();

        if (input.trim() == '') {
            return;
        }
        const userMessage: MessageType = {
            id: uuidv4(),
            text: input,
            sender: 'user'
        }
        setInput('');
        if (currentSetupIndex < setupMessages.length) {

            const newMessages: MessageType[] = [userMessage];

            if (currentSetupIndex < setupMessages.length - 1) {
                const setupMessage: MessageType = {
                    id: setupMessages[currentSetupIndex+1].id,
                    text: setupMessages[currentSetupIndex+1].prompt,
                    sender: 'bot',
                };
                newMessages.push(setupMessage);
            } else {
                const botMessage: MessageType = {
                    id: uuidv4(),
                    text: "Thank you for providing the information. The chatbot is now configured. You may start chatting now.",
                    sender: 'bot',
                }
                newMessages.push(botMessage)
            }
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
            setCurrentSetupIndex(currentSetupIndex + 1);
        } else {
            // add user message to the chat
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setIsLoading(true);
            try {
                let botResponse: string;

                // first real message after configuration
                if (currentSetupIndex == setupMessages.length) {
                    const setupResponses = messages
                        .filter((msg, i) => msg.sender == 'user' && i < setupMessages.length*2)
                        .map(msg => msg.text);

                    const header = `
                        Country of Origin: ${setupResponses[0]}
                        Destination in Canada: ${setupResponses[1]}
                        Preferred Language of Conversation: ${setupResponses[2]}

                        Provided is user information that is NOT error checked.
                        Please ensure the information is valid before proceeding.
                        Check that the "Country of Origin" is a valid country of origin.
                        Check that the "Destination in Canada" is a valid destination in Canada.
                        Check that the "Preferred Language of Conversation" is a valid language.
                        If any of these are invalid, please prompt the user for the correct, valid information.
                    `
                    const inputWithHeader = `${header}\n${input}`;
                    botResponse = await sendMessage(inputWithHeader);

                    setCurrentSetupIndex(currentSetupIndex + 1);
                } else {
                    // normal chat messages
                    botResponse = await sendMessage(input);
                }
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
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
            e.preventDefault();
            handleSend(e);
        }
    };

    return (
        <div className={styles.inputContainer}>
            <Chat messages={messages} isLoading={isLoading} />
            <form onSubmit={handleSend} className={styles.form}>
            <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className={styles.input}
                    placeholder="Type your message..."
                    rows={1}
                    onKeyDown={handleKeyDown}
                ></textarea>
                {!isLoading && (
                    <button type="submit" className={styles.button} disabled={isLoading}>
                        Send
                    </button>
                )}
                {isLoading && (
                    <div className={styles.loadingContainer}>
                        <ClipLoader size={20} color="#FF0000" />
                        <span className={styles.loadingText}>Generating...</span>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Input;
