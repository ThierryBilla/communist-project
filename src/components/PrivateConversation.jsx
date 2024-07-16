import React, { useRef, useEffect } from 'react';
import styles from '../css/ChatBox.module.css'; // Utilisation des mêmes styles que ChatBox

const PrivateConversation = ({ conversation, onBack, isFromSwiperCard }) => {
    const messageListRef = useRef(null);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [conversation]);

    return (
        <div className={styles.chatBox}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={onBack}>
                    <i className="fas fa-arrow-left"></i>
                </button>
                <div className={styles.chatUserInfo}>
                    <img src={conversation[0]?.sender?.profilePicture || 'https://via.placeholder.com/50'} alt="Profile" className={styles.userImage} />
                    <div className={styles.userName}>{conversation[0]?.sender?.username}</div>
                </div>
            </div>
            <div className={styles.messageListContainer} ref={messageListRef}>
                <div className={styles.messageList}>
                    {conversation.length > 0 ? (
                        conversation.map((msg, index) => {
                            const isMessageRight = isFromSwiperCard
                                ? msg.sender.id !== conversation[0].sender.id
                                : msg.sender.id === conversation[0].sender.id;
                            const messageClass = isMessageRight ? styles.messageRight : styles.messageLeft;
                            return (
                                <div key={index} className={messageClass}>
                                    {msg.content}
                                </div>
                            );
                        })
                    ) : (
                        <p>No conversation found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrivateConversation;
