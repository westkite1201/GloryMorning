import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


const BackgroundItem = ({item, setBackgroundUrl,setdetailViewItem, classes}) => {
    return (
         <GridListTile key={item.id} 
                        className = {classes.tileSpace}
                        //onClick = {() => setBackgroundUrl(item.largeImageURL)}>
                        onClick = {() => setdetailViewItem(item)}>
            <img src={item.previewURL} alt={item.user} />
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