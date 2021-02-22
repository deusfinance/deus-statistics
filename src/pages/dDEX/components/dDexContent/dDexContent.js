import React, { useState } from 'react';

import Select from 'components/Select/Select';
import ColorBox from 'components/ColorBox/ColorBox';
import Table from 'components/Table/Table';
import DaySlider from 'components/DaySlider/DaySlider';
import styles from './dDexContent.module.scss';

const rows = [
  [ 'ALL', '11.7 M', <span style={{ color: '#00D16C'}}>'+35.34%'</span>, '$10,535,432.34', 'Ξ343.3452' ],
  [ 'sUNI-LP-DEUS-DEA Vaults', '-300%', <span style={{ color: '#D40000'}}>'-0.12%'</span>, '$1,200,000.00', 'Ξ343.3452' ],
  [ 'sUNI-LP-DEA-USDC Vaults', '-300%', <span style={{ color: '#00D16C'}}>'+35.34%'</span>,, '$1,200,000.00', 'Ξ343.3452' ],
  [ 'sDEA single Vault', '-300%', <span style={{ color: '#00D16C'}}>'+35.34%'</span>,, '$1,200,000.00', 'Ξ343.3452' ],
  [ 'sDEA single Vault', '-300%', <span style={{ color: '#00D16C'}}>'+35.34%'</span>,, '$1,200,000.00', 'Ξ343.3452' ],
]

export default function Staking() {
  const [selectActiveItem, setSelectActiveItem] = useState('TOTAL');

  return (
    <div className={styles.main}>
      <div className={styles.topBoxes}>
        <ColorBox
          topText="SYNCHRONIZER THRESHOLD"
          mainText="103%"
          syncs="$25,284.46"
          synchronizers="$26,043.00"
          className={styles.firstBox}
        />   
        <ColorBox
          topText="SYNC BALANCE SHEET"
          mainText="739,369.34 DAI"
          bottomText
          className={styles.secondBox}
        />
        <ColorBox
          topText="DEUS"
          mainText="$26,45M/Ξ2210"
          bottomText
          className={styles.thirdBox}
        />
      </div>
      <div className={styles.table}>
        <Table
          headers={['Valuts', 'TVL', 'TVL growth last 24th', 'Sealed token Minted', 'Time token minted']}
          sizes={[25, 15, 18, 21, 21]}
          rows={rows}
        />
      </div>
    </div>
  )
}