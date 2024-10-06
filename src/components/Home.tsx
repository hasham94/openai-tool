// src/App.tsx
import React, { useState } from 'react';
import { fetchOpenAIResponse } from '../container/OpenAIService';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>(''); // Store user input
    const [response, setResponse] = useState<string>(''); // Store OpenAI response
    const [loading, setLoading] = useState<boolean>(false); // Loading state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResponse(''); // Clear the previous response

        try {
            const aiResponse = await fetchOpenAIResponse(prompt);
            setResponse(aiResponse); // Display the AI-generated response
        } catch (error) {
            setResponse('An error occurred while generating the response.');
        }

        setLoading(false);
    };

    return (
        <div>
            <h1>OpenAI GPT Integration with React and TypeScript</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)} // Update state with user input
                    placeholder="Enter your prompt..."
                    rows={5}
                    cols={40}
                />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Submit'}
                </button>
            </form>

            <div>
                <h2>Response from OpenAI:</h2>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default App;
