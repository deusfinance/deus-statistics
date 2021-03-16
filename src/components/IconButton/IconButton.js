import React from 'react';
import { Button } from 'antd';

import Tooltip from '../Tooltip/Tooltip';
import styles from './IconButton.module.scss';

export default function IconButton({type, address}) {
  const handleClick = () => {
    navigator.clipboard.writeText(type === 'copy' ? address : 'https://etherscan.io/address/' + address);
  }

  return (
    <Tooltip overlay={<span>copy address</span>} placement='top'>
      <span className={styles.wrapper}>
        <Button className={styles.button} onClick={() => handleClick()}>
          <img src={type === 'copy' ? '/img/copy.png' : 'etherscan' ? '/img/etherscan.png' : null} className={styles.icon} />
        </Button>
      </span>
    </Tooltip>
  )
}