import React, { useState, useEffect, useRef  } from 'react';
import baseUrl from '../../components/axiosConfig';
import echo from '../../echo'

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
    name: string;
}

interface ChatProps {
    friend: User;
    currentUser: User;
}

const Chat: React.FC<ChatProps> = ({ friend, currentUser }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [isFriendTyping, setIsFriendTyping] = useState<boolean>(false);

    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behavior: 'smooth',
        });
        }
    }, [messages]);

    // Fetch messages and set up Echo listeners
    useEffect(() => {
        // Fetch initial messages
        baseUrl.get('/conversations/{conversation}/messages').then((response) => {
        setMessages(response.data);
        });

        // Listen for new messages and typing events
        const chatChannel = echo.private(`chat.${currentUser.id}`);
            chatChannel
            .listen('MessageSent', (event: { message: Message }) => {
                setMessages((prevMessages) => [...prevMessages, event.message]);
            })
            .listenForWhisper('typing', (event: { userID: number }) => {
                if (event.userID === friend.id) {
                setIsFriendTyping(true);
                if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
                typingTimerRef.current = setTimeout(() => setIsFriendTyping(false), 1000);
                }
            });

        // Cleanup listeners on unmount
        return () => {
            chatChannel.stopListening('MessageSent').stopListeningForWhisper('typing');
        };
    }, [friend.id, currentUser.id]);

    // Send a message
    const sendMessage = () => {
        if (newMessage.trim() !== '') {
            baseUrl
                .post('/conversations/{conversation}/messages', { message: newMessage })
                .then((response) => {
                setMessages((prevMessages) => [...prevMessages, response.data]);
                setNewMessage('');
            });
        }
    };

    // Send typing event
    const sendTypingEvent = () => {
        echo.private(`chat.${friend.id}`).whisper('typing', { userID: currentUser.id });
    };

    // useEffect(() => {
    //     baseUrl.get(`/sanctum/csrf-cookie`).then(() => {
    //         baseUrl.get('/conversations')
    //         .then((response) => setConversations(response.data))
    //     });
    // }, []);

    // const loadMessages = (conversationId: number) => {
    //     setCurrentConversation(conversationId);
    //     baseUrl.get(`/conversations/${conversationId}/messages`)
    //         .then((response) => setMessages(response.data))
    //         .catch((error) => console.error('Error loading messages:', error));
    // };


    // const sendMessage = () => {
    //     if (!newMessage) return;
    //     baseUrl.post(`/conversations/${conversation}/messages`, { content: newMessage })
    //         .then((response) => {
    //             setMessages([...messages, response.data]);
    //             setNewMessage('');
    //         });
    // };

    return (
            <div>
                <div className="flex flex-col justify-end h-80">
                <div
                    ref={messagesContainerRef}
                    className="p-4 overflow-y-auto max-h-fit"
                >
                    {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex items-center mb-2 ${
                        message.user_id === currentUser.id ? 'ml-auto' : 'mr-auto'
                        }`}
                    >
                        <div
                        className={`p-2 rounded-lg ${
                            message.user_id === currentUser.id
                            ? 'text-white bg-blue-500'
                            : 'bg-gray-200'
                        }`}
                        >
                        {message.content}
                        </div>
                    </div>
                    ))}
                </div>
                </div>
                <div className="flex items-center">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={sendTypingEvent}
                    onKeyUp={(e) => {
                    if (e.key === 'Enter') sendMessage();
                    }}
                    placeholder="Type a message..."
                    className="flex-1 px-2 py-1 border rounded-lg"
                />
                <button
                    onClick={sendMessage}
                    className="px-4 py-1 ml-2 text-white bg-blue-500 rounded-lg"
                >
                    Send
                </button>
                </div>
                {isFriendTyping && (
                <small className="text-gray-700">{friend.name} is typing...</small>
                )}
            </div>
        );
    };

export default Chat;
