import React from 'react';

import styles from './BlurBar.module.scss';

export default function BlurBar() {
  return (
    <div>
      <div className={styles.top} />
      <div className={styles.bottom} />
    </div>
  )
}