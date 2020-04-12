import React from 'react';
import styles from './Loading.module.scss';
import { SmileOutlined } from '@ant-design/icons';

const Loading = ({ show }) => (
  <>
    {show && (
      <div className={styles['loading']}>
        <SmileOutlined />
        <span className={styles['loading__text']}>loading...</span>
      </div>
    )}
  </>
);

export default Loading;
