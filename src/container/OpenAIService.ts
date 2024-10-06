import OpenAI from 'openai';

// Configure the OpenAI API with your API key
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,// Secure the API key using an environment variable
    dangerouslyAllowBrowser: true // if you need to test the project locally you can allow locally passing this as true
});

// Fetch the OpenAI completion for the provided prompt
export const fetchOpenAIResponse = async (prompt: string): Promise<string> => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            stream: true,
        });

        const data: any = response;
        console.log('data', data)

        // Return the text of the first choice
        return data.choices[0].text.trim();
    } catch (error) {
        console.error('Error fetching OpenAI response:', error);
        throw error;
    }
};

// for further guide please check here https://platform.openai.com/docs/quickstart?quickstart-example=completions