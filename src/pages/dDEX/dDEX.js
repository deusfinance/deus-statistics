import React from 'react';

import Tabs from 'components/Tabs/Tabs';
import styles from './dDEX.module.scss';
import dDEX from './components/dDexContent/dDexContent';

const tabs = ['STAKING', 'VAULTS', 'TOKEN', 'dDEX'];

export default function Statistics() {
  const CurrentPage = dDEX; // pages[activeTab];
  return (
    <div className={styles.main}>
      <img src="background.png" className={styles.background} />
      <span className={styles.title}>STATISTICS</span>
      <div className={styles.tabs}>
        <Tabs tabs={tabs} activeTab={'dDEX'}>
          <CurrentPage />
        </Tabs>
      </div>
    </div>
  )
}