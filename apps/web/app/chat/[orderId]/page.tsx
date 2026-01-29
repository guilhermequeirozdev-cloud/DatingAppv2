'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import PageShell from '../../../components/PageShell';
import Card from '../../../components/Card';
import PrimaryButton from '../../../components/PrimaryButton';
import { API_URL } from '../../../lib/api';

interface Message {
  id?: string;
  content: string;
  senderId: string;
}

export default function ChatPage({ params }: { params: { orderId: string } }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const client = io(API_URL);
    client.emit('join', { orderId: params.orderId });
    client.on('message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });
    setSocket(client);
    return () => {
      client.disconnect();
    };
  }, [params.orderId]);

  const sendMessage = () => {
    if (!content.trim()) return;
    socket?.emit('message', { orderId: params.orderId, senderId: 'demo-user', content });
    setContent('');
  };

  return (
    <PageShell>
      <Card>
        <h1 className="text-2xl font-semibold">Chat da negociação</h1>
        <div className="mt-6 flex h-72 flex-col gap-3 overflow-y-auto rounded-xl border border-border-soft p-4">
          {messages.map((message, index) => (
            <div key={message.id ?? index} className="rounded-xl bg-bg-card/80 px-4 py-2">
              <p className="text-xs text-text-muted">{message.senderId}</p>
              <p>{message.content}</p>
            </div>
          ))}
          {messages.length === 0 && <p className="text-text-muted">Nenhuma mensagem ainda.</p>}
        </div>
        <div className="mt-4 flex gap-3">
          <input
            className="flex-1 rounded-full border border-border-soft bg-bg-card px-4 py-2"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Digite sua mensagem"
          />
          <PrimaryButton onClick={sendMessage}>Enviar</PrimaryButton>
        </div>
      </Card>
    </PageShell>
  );
}
