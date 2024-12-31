import React from 'react';

interface MessageBubbleProps {
    content: string;
    time: string;
    isSender: boolean;
    avatar: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ content, time, isSender, avatar }) => {
    return (
        <div className={`container ${isSender ? 'darker' : ''}`}>
            <img
                src={avatar}
                alt="Avatar"
                className={isSender ? 'right' : ''}
                style={{ width: '100%' }}
            />
            <p>{content}</p>
            <span className={isSender ? 'time-left' : 'time-right'}>{time}</span>
        </div>
    );
};

export default MessageBubble;
