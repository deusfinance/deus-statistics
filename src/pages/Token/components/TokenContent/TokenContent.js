import React, { useState } from 'react';

import Select from 'components/Select/Select';
import ThreeSelect from 'components/ThreeSelect/ThreeSelect';
import InfoBox from 'components/InfoBox/InfoBox';
import Table from 'components/Table/Table';
import DaySlider from 'components/DaySlider/DaySlider';
import styles from './TokenContent.module.scss';
import ColorBox from 'components/ColorBox/ColorBox';

const rows = [
  [ 'DEUS', '324,424.23', '324,424.23', '324,424.23', '424.34', '324,424.23', '23,324,424.23', <span style={{ color: '#00D16C'}}>+35.34%</span> ],
  [ 'DEA', '324,424.23', '324,424.23', '324,424.23', '424.34', '324,424.23', '23,324,424.23', <span style={{ color: '#D40000'}}>-0.12%</span> ],
  [ 'DEOX', '324,424.23', '324,424.23', '324,424.23', '424.34', '324,424.23', '23,324,424.23', <span style={{ color: '#D40000'}}>-0.12%</span> ],
]

export default function Staking() {
  const [selectActiveItem, setSelectActiveItem] = useState('TOTAL');
  const [threeItem, setThreeItem] = useState('NATIVE');

  return (
    <div className={styles.main}>
      <div className={styles.topBoxes}>
        <ColorBox
          topText="DEUS"
          mainText="Ξ 0.0210 / $26.043"
          cSupply="4,435,539"
          mCap="$115,514,742"
          vLocked="$59,532,525"
          className={styles.firstBox}
        />   
        <ColorBox
          topText="DEA"
          mainText="Ξ 0.5672 / $737.360"
          cSupply="102,880 / 166,670"
          mCap="$75,859,596"
          vLocked="$54,960,277 - 72.54%"
          className={styles.secondBox}
        />
        <ColorBox
          topText="DEUS"
          mainText="Ξ 0.0210 / $26.043 "
          cSupply="102,880 / 166,670"
          mCap="$75,859,596"
          vLocked="$54,960,277 - 72.54%"
          className={styles.thirdBox}
        />
      </div>
      <div className={styles.connectedWallet}>Connected Wallet</div>
      <div className={styles.infoBoxes}>
        <InfoBox topText="2,445.442 DEUS" bottomText="3.451 ETH / $26,345.34" revert className={styles.eachBox} />
        <InfoBox topText="2,445.442 DEA" bottomText="0.0210 ETH / $26" revert className={styles.eachBox} />
        <InfoBox topText="" bottomText="" className={styles.eachBox} />
      </div>
      <div className={styles.selectDiv}>
        <Select left='TOTAL' right='WALLET' activeItem={selectActiveItem} setActiveItem={setSelectActiveItem} />
        <ThreeSelect first='NATIVE' second='SEALED' third='SYNCS' activeItem={threeItem} setActiveItem={setThreeItem} />
      </div>
      <div className={styles.table}>
        <Table
          headers={['Token', 'Circulating', 'Trading Volume', 'Transaction Volume', 'Price', 'Supply', 'Market Cap', 'Price change']}
          sizes={[15, 12, 12, 15, 10, 12, 12, 12]}
          rows={rows}
        />
      </div>
    </div>
  )
}