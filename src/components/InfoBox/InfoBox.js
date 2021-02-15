import React from 'react';
import cx from 'classnames';

import styles from './InfoBox.module.scss';

export default function InfoBox({ topText, bottomText, revert, className }) {
  return (
    <div className={cx(styles.main, className)}>
      {
        topText ? (
          <div className={cx(styles.topText, revert ? styles.white : styles.gray)}>{topText}</div>
        ) : (
          <div className={styles.topBar} />
        )
      }
      {
        bottomText ? (
          <div className={cx(styles.bottomText, revert ? styles.gray : styles.white)}>{bottomText}</div>
        ) : (
          <div className={styles.bottomBar} />
        )
      }
    </div>
  )
}