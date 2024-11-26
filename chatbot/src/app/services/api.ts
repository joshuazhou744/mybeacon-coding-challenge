// api.ts

import axios from 'axios';

const API_URL = '/api';

export const sendMessage = async (message: string): Promise<string> => {
    try {
        const response = await axios.post(`${API_URL}/chat`, { message });
        if (response.data.reply) {
            console.log(response.data.reply);
            return response.data.reply;
        } else {
            throw new Error(response.data.error || 'API Error');
        }
    } catch (error) {
        console.log("Error: ", error)
        throw new Error('An error occurred while sending the message.');
    }
}