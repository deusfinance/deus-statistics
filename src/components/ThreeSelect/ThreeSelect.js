import React from 'react';
import cx from 'classnames';

import Button from 'components/Button/Button';
import styles from './ThreeSelect.module.scss';

export default function ThreeSelect({ first, second, third, activeItem, setActiveItem }) {
  return (
    <div className={styles.main}>
      <Button
        onClick={() => setActiveItem(first)}
        disabled={activeItem === first}
        className={cx(styles.item, styles.first, activeItem === first && styles.firstActiveItem)}
      >
        { first }
      </Button>
      <Button
        onClick={() => setActiveItem(second)}
        disabled={activeItem === second}
        className={cx(styles.item, styles.second, activeItem === second && styles.secondActiveItem)}
      >
        { second }
      </Button>
      <Button
        onClick={() => setActiveItem(third)}
        disabled={activeItem === third}
        className={cx(styles.item, styles.third, activeItem === third && styles.thirdActiveItem)}
      >
        { third }
      </Button>
    </div>
  )
}