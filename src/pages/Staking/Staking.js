import React from 'react';

import Tabs from 'components/Tabs/Tabs';
import styles from './Staking.module.scss';
import Staking from './components/StakingContent/StakingContent';

const tabs = ['STAKING', 'VAULTS', 'TOKEN', 'MARKETS'];

export default function Statistics() {
  const CurrentPage = Staking; // pages[activeTab];
  return (
    <div className={styles.main}>
      <img src="background.png" className={styles.background} alt="back" />
      <span className={styles.title}>STATISTICS</span>
      <div className={styles.tabs}>
        <Tabs tabs={tabs} activeTab={'STAKING'}>
          <CurrentPage />
        </Tabs>
      </div>
    </div>
  )
}