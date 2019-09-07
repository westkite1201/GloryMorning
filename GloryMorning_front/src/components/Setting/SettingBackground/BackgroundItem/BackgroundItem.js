import React from 'react';

const BackgroundItem = ({item, setBackgroundUrl}) => {
    return (
        <div onClick = {() => setBackgroundUrl(item.largeImageURL)}>
            <img src = {item.previewURL}/>
        </div>
    );
};

export default BackgroundItem;