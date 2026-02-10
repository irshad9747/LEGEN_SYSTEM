import { useEffect, useState } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';

const retellWebClient = new RetellWebClient();

export const useRetell = () => {
    const [isCallActive, setIsCallActive] = useState(false);
    const [agentState, setAgentState] = useState<'listening' | 'speaking' | 'idle'>('idle');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Event listeners
        retellWebClient.on('conversationStarted', () => {
            setIsCallActive(true);
            setAgentState('listening'); // Default start state
            console.log('Conversation started');
        });

        retellWebClient.on('conversationEnded', () => {
            setIsCallActive(false);
            setAgentState('idle');
            console.log('Conversation ended');
        });

        retellWebClient.on('error', (err) => {
            setError(err.message);
            setIsCallActive(false);
            setAgentState('idle');
            console.error('Retell error:', err);
        });

        retellWebClient.on('agentStartTalking', () => {
            setAgentState('speaking');
            console.log('Agent start talking');
        });

        retellWebClient.on('agentStopTalking', () => {
            setAgentState('listening');
            console.log('Agent stop talking');
        });

        return () => {
            if (isCallActive) retellWebClient.stopCall();
        };
    }, []);

    const startCall = async (accessToken: string) => {
        try {
            setError(null);
            await retellWebClient.startCall({
                accessToken,
            });
        } catch (err: any) {
            setError(err.message || 'Failed to start call');
            console.error('Start call error:', err);
        }
    };

    const stopCall = () => {
        // if (isCallActive) {
        retellWebClient.stopCall();
        // }
    };

    return {
        isCallActive,
        agentState,
        error,
        startCall,
        stopCall,
    };
};
