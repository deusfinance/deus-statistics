import React from 'react';

import Tabs from 'components/Tabs/Tabs';
import styles from './Markets.module.scss';
import MARKETS from './components/marketsContent/marketsContent';

const tabs = ['STAKING', 'VAULTS', 'TOKEN', 'MARKETS'];

export default function Statistics() {
  const CurrentPage = MARKETS; // pages[activeTab];
  return (
    <div className={styles.main}>
      <img src="background.png" className={styles.background} alt="back" />
      <span className={styles.title}>STATISTICS</span>
      <div className={styles.tabs}>
        <Tabs tabs={tabs} activeTab={'MARKETS'}>
          <CurrentPage />
        </Tabs>
      </div>
    </div>
  )
}