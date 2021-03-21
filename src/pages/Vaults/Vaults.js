import React from 'react';

import Tabs from 'components/Tabs/Tabs';
import styles from './Vaults.module.scss';
import VaultsContent from './components/VaultsContent/VaultsContent';

const tabs = ['STAKING', 'VAULTS', 'TOKEN', 'MARKETS'];

export default function Statistics() {
  const CurrentPage = VaultsContent; // pages[activeTab];
  return (
    <div className={styles.main}>
      <img src="background.png" className={styles.background} alt="" />
      <span className={styles.title}>STATISTICS</span>
      <div className={styles.tabs}>
        <Tabs tabs={tabs} activeTab={'VAULTS'}>
          <CurrentPage />
        </Tabs>
      </div>
    </div>
  )
}