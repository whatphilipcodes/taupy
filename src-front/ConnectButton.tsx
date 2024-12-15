import { useState, useEffect } from 'react';
import { invoke } from "@tauri-apps/api/core";

function ConnectButton() {
    const [port, setPort] = useState<number>();
    const [result, setResult] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        invoke<number>('get_port').then(port => {
            setPort(port);
        });
    }, []);

    const handleConnect = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:${port}/api/v1/connect`);
            const data = await response.text();
            setResult(data);
        } catch (error) {
            setResult('Connection failed: ' + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleConnect}
                disabled={isLoading}
                style={{
                    padding: '8px 16px',
                    margin: '10px 0',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isLoading ? 'wait' : 'pointer'
                }}
            >
                {isLoading ? 'Connecting...' : 'Test Connection'}
            </button>

            <div style={{ marginTop: '10px' }}>
                {result && (
                    <div style={{
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}>
                        {result}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ConnectButton;