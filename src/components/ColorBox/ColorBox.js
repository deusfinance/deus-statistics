import React from 'react';
import cx from 'classnames';

import styles from './ColorBox.module.scss';

export default function ColorBox({ topText, mainText, cSupply, mCap, vLocked, syncs, synchronizers, bottomText, className }) {
  return (
    <div className={cx(styles.box, className)}>
      <div className={styles.topText}>{topText}</div>
      <div className={styles.mainText}>{mainText}</div>
      <div className={styles.bottom}>
        {
          bottomText ? <div style={{ height: 48 }} /> : syncs ? (
            <div className={styles.syncDiv}>
              <div className={styles.syncText}>
                {syncs}
                <div className={styles.smallText}>total Value of all SYNCs</div>
              </div>
              <div className={styles.syncText}>/</div>
              <div className={styles.syncText}>
                {synchronizers}
                <div className={styles.smallText}>total Holding of all Synchronizers</div>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.text}>Circulating Supply: {cSupply}</div>
              <div className={styles.text}>Market Cap: {mCap}</div>
              <div className={styles.text}>Value Locked: {vLocked}</div>
            </>
          )
        }
      </div>
    </div>
  )
}