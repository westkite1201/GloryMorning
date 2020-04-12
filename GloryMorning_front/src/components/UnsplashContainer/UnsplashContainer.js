import React, { useState, useEffect, useCallback, useRef } from 'react';
import ThumbnailList from './ThumbnailList';
import * as UnsplashAPI from '../../lib/api/unsplash';
//import { downloadPhoto } from '../../lib/downloadPhoto';
import SearchForm from './SearchForm/SearchForm';
import ScrollContainer from '../base/ScrollContainer';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import Loading from '../base/Loading';

const PER_PAGE = 30;

const UnsplashContainer = ({ setPhoto }) => {
  const currentQuery = useRef('');
  const currentPage = useRef(1);
  const totalPage = useRef(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);

  const rootRef = useRef(null);
  const targetRef = useRef(null);

  const loadRandomImage = useCallback(async () => {
    try {
      setLoading(true);
      const data = await UnsplashAPI.getRandomPhotos({ count: 30 });
      currentQuery.current = '';
      setImages(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [setError]);

  const loadImage = useCallback(
    async ({ query, page }) => {
      try {
        setLoading(true);
        const data = await UnsplashAPI.searchPhotos({
          query,
          page,
          per_page: PER_PAGE,
        });
        totalPage.current = data.total_pages;
        return data;
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [setError],
  );

  const searchImage = useCallback(
    async query => {
      if (!query) {
        await loadRandomImage();
        return;
      }

      currentQuery.current = query;
      currentPage.current = 1;
      try {
        const data = await loadImage({ query, page: 1, per_page: PER_PAGE });
        console.log('data ', data);
        setImages(data.results);
      } catch (e) {
        console.error(e);
      }
    },
    [loadImage, loadRandomImage],
  );

  const loadMoreImage = useCallback(async () => {
    if (images.length > 0) {
      currentPage.current++;
      const data = await loadImage({
        query: currentQuery.current,
        page: currentPage.current,
      });
      setImages([...images, ...data.results]);
    }
  }, [images, loadImage]);

  const downloadImage = useCallback(
    async photo => {
      try {
        setLoading(true);
        // const blob = await downloadPhoto(photo.urls.regular);
        // setPhoto(blob);
        // setSelected(photo.id);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [setError, setPhoto],
  );

  useIntersectionObserver({
    root: rootRef.current,
    target: targetRef.current,
    onIntersect: ([{ isIntersecting }]) => {
      if (
        isIntersecting &&
        !!currentQuery.current &&
        currentPage.current < totalPage.current
      ) {
        loadMoreImage();
      }
    },
  });

  useEffect(() => {
    loadRandomImage();
  }, [loadRandomImage]);

  return (
    <div style={{ marginTop: '50px' }}>
      <SearchForm onSearch={searchImage} onRandom={loadRandomImage} />
      <ScrollContainer height={400} vertical ref={rootRef}>
        <ThumbnailList
          onClick={downloadImage}
          selected={selected}
          thumbnails={images}
        />
        <Loading show={loading} />
        <div ref={targetRef} />
      </ScrollContainer>
    </div>
  );
};

export default UnsplashContainer;
