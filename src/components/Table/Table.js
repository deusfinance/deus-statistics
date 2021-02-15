import React from 'react';
import cx from 'classnames';

import styles from './Table.module.scss';

export default function Table({ headers, sizes, rows }) {
  return (
    <div className={styles.main}>
      <div className={styles.headers}>
        {
          headers.map((header, index) => (
            <div key={header} className={styles.header} style={{ width: `${sizes[index]}%` }}>
              {header}
            </div>
          ))
        }
      </div>
      <div className={styles.rows}>
        {
          rows.map((row, rowIndex) => (
            <div className={cx(styles.row, rowIndex === rows.length - 1 && styles.noBottomBorder)} key={row}>
              {
                row.map((col, colIndex) => (
                  <div className={styles.col} key={col} style={{ width: `${sizes[colIndex]}%` }}>
                    {
                      Array.isArray(col) ? (
                        <>
                          <div>{col[0]}</div>
                          <div className={styles.smallText}>{col[1]}</div>
                        </>
                      ) : col
                    }
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}