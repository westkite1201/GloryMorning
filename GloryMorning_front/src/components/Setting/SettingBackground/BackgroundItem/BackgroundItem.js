import React from 'react';

const BackgroundItem = ({item}) => {
    return (
        <div>
            <img src = {item.previewURL}/>
        </div>
    );
};

export default BackgroundItem;