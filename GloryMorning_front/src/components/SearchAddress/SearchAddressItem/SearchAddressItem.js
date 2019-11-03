import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    input : {
        color :'black'
    }
  }));

const SearchAddressItem = ({addressName}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <List className ={classes.input} >
                <ListItem>
                {/*
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                */}
                    <ListItemText
                        primary= {addressName}
                    />
                </ListItem>
            </List>
        </div>
    );
};

export default SearchAddressItem;