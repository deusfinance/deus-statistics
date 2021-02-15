import React from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import Button from 'components/Button/Button';
import styles from './Tabs.module.scss';

export default function Tabs({ tabs, activeTab, setActiveTab, children }) {
  return (
    <div className={styles.main}>
      <div className={styles.tabs}>
        {
          tabs.map(tab => (
            <NavLink
              key={tab}
              to={tab.toLowerCase()}
              disabled={activeTab === tab}
              className={cx(styles.tab, activeTab === tab ? styles.activeTab : styles.inActiveTab)}
            >
              {tab}
            </NavLink>
          ))
        }
      </div>
      <div className={styles.tabContainer}>
        {children}
      </div>
    </div>
  )
}