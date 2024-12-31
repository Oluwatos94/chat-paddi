import React, { useState, useEffect } from 'react';
import axios from '../../components/axiosConfig';
import MessageBubble from './MessageBubble';


interface Message {
    id: number;
    content: string;
    created_at: string;
    user_id: number;
}

interface Conversation {
    id: number;
    name: string;
}

interface User {
    id: number;
    avatar: string;
}

const ChatPage: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentConversation, setCurrentConversation] = useState<number | null>(null);
    const [newMessage, setNewMessage] = useState<string>('');
    const currentUserId = 1;
    const userAvatar = '/path/to/user/avatar.jpg'; // Replace with the actual avatar path
    const otherAvatar = '/path/to/other/avatar.jpg'; // Replace with the actual avatar path

    useEffect(() => {
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios.get('/conversations')
            .then((response) => setConversations(response.data))
        });
    }, []);

    const loadMessages = (conversationId: number) => {
        setCurrentConversation(conversationId);
        axios.get(`/conversations/${conversationId}/messages`).then((response) => setMessages(response.data));
    };

    const sendMessage = () => {
        if (!newMessage) return;
        axios
            .post(`/api/conversations/${currentConversation}/messages`, { content: newMessage })
            .then((response) => {
                setMessages([...messages, response.data]);
                setNewMessage('');
            });
    };

    return (
        <div className="chat-page">
            <aside className="conversations">
                {conversations.map((conv: any) => (
                    <div key={conv.id} onClick={() => loadMessages(conv.id)}>
                        {conv.name || `Conversation ${conv.id}`}
                    </div>
                ))}
            </aside>
            <main className="messages">
                <div className="message-list">
                    {messages.map((msg: any) => (
                        <MessageBubble
                            key={msg.id}
                            content={msg.content}
                            time={new Date(msg.created_at).toLocaleTimeString()}
                            isSender={msg.user_id === currentUserId} // Replace `currentUserId` with the actual user's ID
                            avatar={msg.user_id === currentUserId ? userAvatar : otherAvatar}
                        />
                    ))}
                </div>
                <div className="message-input">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </main>
        </div>
    );
};

export default ChatPage;
