import React from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

import styles from './Tooltip.module.scss';

export default function CustomTooltip(props) {
  return (
    <Tooltip {...props} className={styles.tooltip} />
  )
}