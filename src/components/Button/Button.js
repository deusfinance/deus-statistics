import React from 'react';
import { Button } from 'antd';

import styles from './Button.module.scss';

export default function CustomButton({className, disabled, ...props}) {
  return (
    <Button className={[!disabled && styles.button, className]} disabled={disabled} {...props} />
  )
}