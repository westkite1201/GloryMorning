import React, { Fragment } from 'react';
import { observer } from "mobx-react";
import { makeStyles } from '@material-ui/core/styles';
import {isNil, isEmpty} from 'lodash'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import { searchAddress } from '../../../lib/api/searchApi';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    address : {
        color :'black'
    },

  }));

const SearchAddressItem = observer(({item, search, value}) => {
    const classes = useStyles();

   // const [checked, setChecked] = React.useState([-1]); // 배열 세팅 

    const handleToggle = value => () => {
    //   const currentIndex = checked.indexOf(value);
    //   const newChecked = [...checked];

    //   if (currentIndex === -1) { //현재 배열에 없으면 
    //     newChecked.push(value);
    //   } else { // 있으면 
    //     newChecked.splice(currentIndex, 1); // 현재 인덱스만 날림 
    //   }
    //   setChecked(newChecked);

      search.setSelectItem({name : item.address_name , item : item});
      
    };

    const labelId = `checkbox-list-label-${value}`;
    return (

        <div className={classes.root}>
            {
                !isEmpty(item.road_address) ? (
                   <div className ={classes.address}>
                        <span> 도로명 주소 :  </span>
                        <div>
                            { item.road_address.address_name } 
                        </div>
                       {item.road_address.zip_code}
                   </div>
                ) : null
             }
            <div>
                {   
                !isEmpty(item.address) ? (
                    <div className ={classes.address}>
                        <span> 지번  </span>
                        {item.address.address_name}
                        {item.address.zip_code}
                    </div>
                 ) : null
                }
            </div>


            <div className = "checkBox">
                <Checkbox
                    onClick={handleToggle(value)}
                    edge="start"
                    //checked={checked.indexOf(value) !== -1}
                    checked={search.checkSeleted(item.address_name)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}/>
            </div>
        </div>
    );
});

export default SearchAddressItem;