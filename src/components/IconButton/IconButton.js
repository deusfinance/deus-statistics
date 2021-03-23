import React from 'react';
import { Button, notification } from 'antd';

import Tooltip from '../Tooltip/Tooltip';
import styles from './IconButton.module.scss';

export default function IconButton({type, address}) {
  const handleClick = () => {
    navigator.clipboard.writeText(address);
    notification.success({
      message: 'Notification',
      description: 'Address copied',
      duration: 3
    });
  }

  return (
    <Tooltip overlay={<span>{type === 'copy' ? 'Copy address' : 'Etherscan Link'}</span>} placement='top'>
      <span className={styles.wrapper}>
        {
          type === 'copy' ?
            <Button className={styles.button} onClick={() => handleClick()}>
              <img src='/img/copy.png' className={styles.icon} alt="icon" />
            </Button>
          :
            <a className={styles.button} href={'https://etherscan.io/address/' + address} target='_blank' rel="noreferrer">
              <img src='/img/etherscan.png' className={styles.icon} alt="icon" />
            </a>
        }
        
      </span>
    </Tooltip>
  )
}