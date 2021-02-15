import React from 'react';
import cx from 'classnames';

import Button from 'components/Button/Button';
import styles from './Select.module.scss';

export default function Select({ left, right, activeItem, setActiveItem }) {
  return (
    <div className={styles.main}>
      <Button
        onClick={() => setActiveItem(left)}
        disabled={activeItem === left}
        className={cx(styles.item, styles.left, activeItem === left && styles.activeItem)}
      >
        { left }
      </Button>
      <Button
        onClick={() => setActiveItem(right)}
        disabled={activeItem === right}
        className={cx(styles.item, styles.right, activeItem === right && styles.activeItem)}
      >
        { right }
      </Button>
    </div>
  )
}