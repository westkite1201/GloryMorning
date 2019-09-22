import React from 'react';
import './TagItem.scss'
const TagItem = ({item}) => { 
    return(
        <span className = 'tagitem'>
            {item}
        </span>
    )

}

export default TagItem;