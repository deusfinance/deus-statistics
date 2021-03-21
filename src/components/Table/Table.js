import React from 'react';
import cx from 'classnames';

import { formatCol } from 'utils/formatUI';
import styles from './Table.module.scss';

export default function Table({ headers, sizes, rows }) {
  return (
    <div className={styles.main}>
      <div className={styles.headers}>
        {
          headers.map((header, index) => (
            <div key={index} className={styles.header} style={{ width: `${sizes[index]}%` }}>
              {header}
            </div>
          ))
        }
      </div>
      <div className={styles.rows}>
        {
          rows.map((row, rowIndex) => (
            <div className={cx(styles.row, rowIndex === rows.length - 1 && styles.noBottomBorder)} key={rowIndex}>
              {
                row.map((col, colIndex) => (
                  <div className={styles.col} key={colIndex} style={{ width: `${sizes[colIndex]}%` }}>
                    {
                      Array.isArray(col) ? (
                        <>
                          <div>{col[0]}</div>
                          <div className={styles.smallText}>{col[1]}</div>
                        </>
                      ) : formatCol(col)
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