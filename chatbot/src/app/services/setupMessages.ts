// setupMessages.ts

import {v4 as uuidv4} from 'uuid';

export interface SetupMessage {
    id: string;
    prompt: string;
    sender: 'bot';
}

export const setupMessages: SetupMessage[] = [
    {
        id: uuidv4(),
        prompt: "Please enter your country of origin",
        sender: 'bot'
    },
    {
        id: uuidv4(),
        prompt: "Please enter your destination in Canada",
        sender: 'bot'
    },
    {
        id: uuidv4(),
        prompt: "Please enter your preferred language",
        sender: 'bot'
    },
]