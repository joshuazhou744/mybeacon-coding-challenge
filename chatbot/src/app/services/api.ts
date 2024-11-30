// api.ts

import axios from 'axios';

const API_URL = '/api/chat'; // api route url suffix


// send message to the api from the client
export const sendMessage = async (message: string): Promise<string> => {
    try {
        const response = await axios.post(`${API_URL}`, { message }); // axios POST request to the api
        if (response.data.reply) {
            // console.log(response.data.reply);
            return response.data.reply; // return bot response
        } else {
            throw new Error(response.data.error || 'API Error');
        }
    } catch (error) {
        console.log("Error: ", error)
        throw new Error('An error occurred while sending the message.');
    }
}

export const clearLogs= async (): Promise<void> => {
    try {
        // axios DELETE request to the api
        const response = await axios.delete(`${API_URL}`, { 
            data: {},
         });
        console.log("Response: ", response)
    } catch (error) {
        console.log("Error: ", error)
        throw new Error('An error occurred while sending the message.');
    }
}