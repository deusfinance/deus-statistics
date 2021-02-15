import React, { useState } from 'react';

import Select from 'components/Select/Select';
import InfoBox from 'components/InfoBox/InfoBox';
import Table from 'components/Table/Table';
import DaySlider from 'components/DaySlider/DaySlider';
import styles from './VaultsContent.module.scss';

const rows = [
  [ 'All', '11.7M', <span style={{ color: '#00D16C'}}>+35.34%</span>, '$10,535,432.34', 'Ξ343.3452' ],
  [ 'sUNI-LP-DEUS-DEA Vaults', '-300%', <span style={{ color: '#D40000'}}>-0.12%</span>, '$12,000,000.00', 'Ξ343.3452' ],
  [ 'sUNI-LP-DEA-USDC Vaults', '-300%', <span style={{ color: '#00D16C'}}>+35.34%</span>, '$12,000,000.00', 'Ξ343.3452' ],
  [ 'sDEA single Vault', '-300%', <span style={{ color: '#00D16C'}}>+35.34%</span>, '$12,000,000.00', 'Ξ343.3452' ],
  [ 'sDEA single Vault', '-300%', <span style={{ color: '#00D16C'}}>+35.34%</span>, '$12,000,000.00', 'Ξ343.3452' ]
]

export default function Staking() {
  const [selectActiveItem, setSelectActiveItem] = useState('TOTAL');

  return (
    <div className={styles.main}>
      <div className={styles.topBoxes}>
        <InfoBox topText="Total Value Locked" bottomText="7,478.938 ETH / $12,252,008.67" className={styles.eachBox} />
        <InfoBox topText="Your Value Locked" bottomText="7,478.938 ETH / $12,252,008.67" className={styles.eachBox} />
        <InfoBox topText="Prices" bottomText="$5.02 DEUS – $234.42 DEA – $1.23 DEOX" className={styles.eachBox} />
      </div>
      <Select left='TOTAL' right='WALLET' activeItem={selectActiveItem} setActiveItem={setSelectActiveItem} />
      <div className={styles.table}>
        <Table
          headers={['Vaults', 'TVL', 'TVL growth last 24th', 'Sealed token Minted', 'Time token minted']}
          sizes={[22, 15, 20, 20, 23]}
          rows={rows}
        />
      </div>
    </div>
  )
}