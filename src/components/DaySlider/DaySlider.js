import React from 'react';
import { Slider } from 'antd';
import 'antd/lib/slider/style/index.css';
import 'antd/lib/tooltip/style/index.css';

import styles from './DaySlider.module.scss';

const marks = {
  0: '7 Days',
  50: '2 Weeks',
  100: '1 Month'
};

export default function DaySlider() {
  return (
    <div className={styles.slider}>
      <Slider marks={marks} step={null} defaultValue={0} tipFormatter={value => marks[value]} />
    </div>
  )
}