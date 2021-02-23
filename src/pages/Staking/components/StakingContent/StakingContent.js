import React, { useState } from 'react';

import Select from 'components/Select/Select';
import InfoBox from 'components/InfoBox/InfoBox';
import Table from 'components/Table/Table';
import DaySlider from 'components/DaySlider/DaySlider';
import styles from './StakingContent.module.scss';

const rows = [
  [ ['Native Balancer Pool', 'BPT'], '-300%', '1,239.8493', '$10,535,432.34', 'Ξ343.3452', [<span style={{filter: 'blur(5px)'}}>'XXX,XXX.XX USD'</span>, <span style={{filter: 'blur(5px)'}}>'Equals to XX.XXXDEA'</span>] ],
  [ ['sDEA', 'Sealed DEA'], '-300%', '1,239.8493', '$12,000,000.00', 'Ξ343.3452', [<span style={{filter: 'blur(5px)'}}>'XXX,XXX.XX USD'</span>, <span style={{filter: 'blur(5px)'}}>'Equals to XX.XXX DEA'</span>] ],
  [ ['sDEUS', 'Sealed DEUS'], '-300%', '1,239.8493', '$12,000,000.00', 'Ξ343.3452', [<span style={{filter: 'blur(5px)'}}>'XXX,XXX.XX USD'</span>, <span style={{filter: 'blur(5px)'}}>'Equals to XX.XXX DEA'</span>] ],
  [ ['Time', 'Time Token'], '-300%', '1,239.8493', '$12,000,000.00', 'Ξ343.3452', [<span style={{filter: 'blur(5px)'}}>'XXX,XXX.XX USD'</span>, <span style={{filter: 'blur(5px)'}}>'Equals to XX.XXX DEA'</span>] ]
]

export default function Staking() {
  const [selectActiveItem, setSelectActiveItem] = useState('TOTAL');

  return (
    <div className={styles.main}>
      <div className={styles.topBoxes}>
        <InfoBox topText="Total Value Locked" bottomText="7,478.938 ETH / $12,252,008.67" className={styles.eachBox} />
        <InfoBox topText="Your Value Locked" bottomText="7,478.938 ETH / $12,252,008.67" className={styles.eachBox} />
        <InfoBox topText="Prices" bottomText="$5.02 DEUS – $234.42 DEA" className={styles.eachBox} />
      </div>
      <Select left='TOTAL' right='WALLET' activeItem={selectActiveItem} setActiveItem={setSelectActiveItem} />
      <div className={styles.table}>
        <Table
          headers={['Staking Pools', 'APY', 'Tokens', 'Value in USD', 'Value in ETH', <div className={styles.row}><span className={styles.usdText}>USD earned<br/>(coming soon)</span><DaySlider /></div>]}
          sizes={[20, 13, 15, 15, 15, 22]}
          rows={rows}
        />
      </div>
    </div>
  )
}