import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


const BackgroundItem = ({item,index, setBackgroundUrl,setdetailViewItem, classes}) => {
    /* css 문제인가... 뭐지 일단 이걸로 처리해놈  */
    const imgStyle = {
        left: '50%',
        height: 'auto',
        position: 'relative',
        transform: 'translateX(-50%)',
    }
    return (
         <GridListTile key={index} 
                       className = {classes.tileSpace}
                        //onClick = {() => setBackgroundUrl(item.largeImageURL)}>
                       onClick = {() => setdetailViewItem(item)}>
            <img src={item.previewURL} alt={item.user} style ={imgStyle}/>
            <GridListTileBar
                title={item.tags}
                subtitle={<span>by: {item.user}</span>}
                actionIcon={
                <IconButton aria-label={`info about ${item.user}`} className={classes.icon}>
                 <InfoIcon />
                </IconButton>
                }
            />
         </GridListTile>
    );
};

export default BackgroundItem;