import React from 'react';

import Tabs from 'components/Tabs/Tabs';
import styles from './Token.module.scss';
import Token from './components/TokenContent/TokenContent';

const tabs = ['STAKING', 'VAULTS', 'TOKEN', 'MARKETS'];
export default function Statistics() {
  const CurrentPage = Token; // pages[activeTab];
  return (
    <div className={styles.main}>
      <img src="background.png" className={styles.background} alt="" />
      <span className={styles.title}>STATISTICS</span>
      <div className={styles.tabs}>
        <Tabs tabs={tabs} activeTab={'TOKEN'}>
          <CurrentPage />
        </Tabs>
      </div>
    </div>
  )
}