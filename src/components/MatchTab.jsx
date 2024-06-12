import React from 'react';
import styles from '../css/MatchTab.module.css';

const MatchTab = ({ matches, onMatchClick }) => {
    // Données factices pour les matchs
    const dummyMatches = [
        { id: 1, name: 'Match 1' },
        { id: 2, name: 'Match 2' },
        { id: 3, name: 'Match 3' },
    ];

    return (
        <div className={styles.tab}>
            <ul className={styles.matchList}>
                {dummyMatches.map(match => (
                    <li key={match.id} className={styles.matchItem} onClick={() => onMatchClick(match.id)}>
                        <div className={styles.imagePlaceholder}></div>
                        <div className={styles.matchDetails}>
                            <div className={styles.matchName}>{match.name}</div>
                            <div className={styles.matchPreview}>Start a conversation</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MatchTab;
