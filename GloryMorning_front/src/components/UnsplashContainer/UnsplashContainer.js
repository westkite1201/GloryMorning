import React, { useState, useEffect, useCallback, useRef } from 'react';
import ThumbnailList from './ThumbnailList';
import * as UnsplashAPI from '../../lib/api/unsplash';
import { downloadPhoto } from '../../lib/downloadPhoto';
import SearchForm from './SearchForm/SearchForm';
import ScrollContainer from '../base/ScrollContainer';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import Loading from '../base/Loading';
import FileUploadForm from './FileUploadForm';

const PER_PAGE = 30;

const UnsplashContainer = () => {
  const currentQuery = useRef('');
  const currentPage = useRef(1);
  const totalPage = useRef(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [photo, setPhoto] = useState(null);
  const rootRef = useRef(null);
  const targetRef = useRef(null);

  async function loadRandomImage(images_) {
    try {
      console.log(images_);
      setLoading(true);
      const data = await UnsplashAPI.getRandomPhotos({ count: 30 });
      currentQuery.current = '';
      setImages(images => [...images, ...data]);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  const loadImage = useCallback(
    async ({ query, page }) => {
      try {
        console.log('loadImage ', loadImage);
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
        console.log('searchImage data ', data);
        setImages(data.results);
      } catch (e) {
        console.error(e);
      }
    },
    [loadImage, loadRandomImage],
  );

  const loadMoreImage = useCallback(async () => {
    console.log('loadMoreImage ', images);
    if (images.length > 0) {
      currentPage.current++;
      const data = await loadImage({
        query: currentQuery.current,
        page: currentPage.current,
      });
      console.log('data ', data);
      setImages([...images, ...data.results]);
    }
  }, [images, loadImage]);

  async function loadMoreImage_() {
    console.log('loadMoreImage ', images);
    if (images.length > 0) {
      currentPage.current++;
      const data = await loadImage({
        query: currentQuery.current,
        page: currentPage.current,
      });
      console.log('data ', data);
      setImages([...images, ...data.results]);
    }
  }

  const downloadImage = useCallback(async () => {
    try {
      //alert('downloadImage');
      console.log(photo);
      setLoading(true);
      //const blob = await downloadPhoto(photo.urls.regular);
      const blob = await UnsplashAPI.getImage(
        photo.urls.regular,
        photo.alt_description,
      );
      setPhoto(blob);
      setSelected(photo.id);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [setError, setPhoto, photo]);

  // useIntersectionObserver({
  //   root: rootRef.current,
  //   target: targetRef.current,
  //   onIntersect: ([{ isIntersecting }]) => {
  //     console.log(isIntersecting)
  //     if (
  //       isIntersecting &&
  //       !!currentQuery.current &&
  //       currentPage.current < totalPage.current
  //     ) {
  //       loadMoreImage();
  //     }
  //   },
  // });

  const handleSelect = photo => {
    console.log(photo);
    setPhoto(photo);
    setSelected(photo.id);
  };

  useEffect(() => {
    let observer;
    if (targetRef.current) {
      observer = new IntersectionObserver(_onIntersect, { threshold: 1 });
      observer.observe(targetRef.current);
    }
    //loadRandomImage();
    return () => observer && observer.disconnect();
  }, [targetRef.curr]);

  const _onIntersect = ([entry]) => {
    console.log('entry ', entry.isIntersecting);
    if (entry.isIntersecting) {
      loadRandomImage();
    }
  };

  const uploadSelectedImage = async () => {
    console.log('photo', photo.urls.regular);
    try {
      if (photo) {
        let params = {
          url: photo.urls.regular,
          id: photo.id,
        };
        let res = await UnsplashAPI.getImageDownloadToUrl(params);
        console.log(res);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div style={{ marginTop: '50px' }}>
      {<FileUploadForm />}
      <SearchForm
        onSearch={searchImage}
        onRandom={loadRandomImage}
        downloadImage={downloadImage}
        uploadSelectedImage={uploadSelectedImage}
      />
      <ScrollContainer height={400} vertical ref={rootRef}>
        <ThumbnailList
          onClick={handleSelect}
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
