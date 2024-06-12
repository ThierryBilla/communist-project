import React, { useState } from 'react';
import ChatTab from '../components/ChatTab';
import MatchTab from '../components/MatchTab';
import styles from '../css/Sidebar.module.css';

const Sidebar = ({ matches, messages, onMatchClick, onMessageClick }) => {
    const [activeTab, setActiveTab] = useState('chat');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.tabContainer}>
                <div
                    className={`${styles.tab} ${activeTab === 'chat' && styles.active}`}
                    onClick={() => handleTabClick('chat')}
                >
                    Chat
                </div>
                <div
                    className={`${styles.tab} ${activeTab === 'match' && styles.active}`}
                    onClick={() => handleTabClick('match')}
                >
                    Match
                </div>
            </div>
            {activeTab === 'chat' && <ChatTab messages={messages} onMessageClick={onMessageClick} />}
            {activeTab === 'match' && <MatchTab matches={matches} onMatchClick={onMatchClick} />}
        </div>
    );
};

export default Sidebar;
