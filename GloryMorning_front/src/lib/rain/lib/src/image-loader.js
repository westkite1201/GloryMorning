function loadImage(src, i, onLoad) {
  return new Promise((resolve, reject) => {
    if (typeof src == 'string') {
      src = {
        name: 'image' + i,
        src,
      };
    }
    console.log('[rain] src', src);
    let img = new Image();
    img.crossOrigin = 'anonymous';
    src.img = img;

    try {
      img.addEventListener('load', event => {
        if (typeof onLoad == 'function') {
          onLoad.call(null, img, i);
        }
        console.log('[rain] resolve');
        resolve(src);
      });
      img.src = src.src;
    } catch (e) {
      console.log('[rain] ', e);
      reject();
    }
  });
}

function loadImages(images, onLoad) {
  console.log('[rain] loadImages');
  return Promise.all(
    images.map((src, i) => {
      return loadImage(src, i, onLoad);
    }),
  );
}

export default function ImageLoader(images, onLoad) {
  return new Promise((resolve, reject) => {
    loadImages(images, onLoad).then(loadedImages => {
      let r = {};
      loadedImages.forEach(curImage => {
        r[curImage.name] = {
          img: curImage.img,
          src: curImage.src,
        };
      });

      resolve(r);
    });
  });
}
