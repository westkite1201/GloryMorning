import React from 'react';
import styles from './ThumbnailList.module.scss';
import CX from 'classnames';
import Grid from '@material-ui/core/Grid';
import { defaultImg } from '../../../configuration/clientConfig';
import LazyLoad from 'react-lazyload';
//import { Row, Col } from 'antd/lib/index';

const ThumbnailList = ({ thumbnails, selected, onClick }) => (
  <Grid container spacing={3}>
    {thumbnails.map(thumbnail => (
      <Grid item xs={4} key={thumbnail.id}>
        <div className={styles['thumbnail__item']}>
          <img
            src={thumbnail.urls.thumb}
            data-src={defaultImg}
            alt={thumbnail.alt_description}
            className={CX({ [styles.active]: thumbnail.id === selected })}
            onClick={() => onClick(thumbnail)}
          />
          <span>By {thumbnail.user.username}</span>
        </div>
      </Grid>
    ))}
  </Grid>
);

export default ThumbnailList;
