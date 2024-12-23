import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';

function ConnectButton() {
  const [port, setPort] = useState<number>();
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    invoke<number>('get_port').then((port) => {
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
    <div className='flex w-2/3 flex-col gap-4'>
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className='cursor-pointer rounded border-none bg-blue-500 p-2 text-neutral-950 disabled:cursor-wait dark:text-neutral-50'
      >
        {isLoading ? 'Connecting...' : 'Test Connection'}
      </button>

      <div>
        {result && (
          <div className='select-text rounded border border-neutral-950 p-2 dark:border-neutral-50'>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConnectButton;
