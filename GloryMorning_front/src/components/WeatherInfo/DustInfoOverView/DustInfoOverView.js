import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import Progress from '../../Common/Progress'


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: 'rgba( 255, 255, 255, 0.5 )',
    },
  }),
);

/* progress 만들기  */
const makeProgress = (dustMessageInfo) =>{
  let {color, level, value} = dustMessageInfo;
  //초기
  color === '' ? color = '#ffffff' : color = color
  return (
    <Progress backgroundColor = {color}
              fcstValue = {level * 12.5} 
              value = {value}
              height = {15}/>
  )
} 
export default function DustInfoOverView({dustInfoObject}) {

  console.log("[SEO][dustInfoObject] ", dustInfoObject)
  const { dustMessageInfoPm10, 
          dustMessageInfoPm25,
          dustMessageInfoO3,
          dustMessageInfoCo,
          dustMessageInfoNo2,
          dustMessageInfoSo2 } = dustInfoObject;
  const classes = useStyles();
  console.log("[SEO][dustMessageInfoPm10] ", dustInfoObject.dustMessageInfoPm10)
  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            pm10
          </Avatar>
        </ListItemAvatar>
       {makeProgress(dustMessageInfoPm10)}
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            pm25
          </Avatar>
        </ListItemAvatar>
        {makeProgress(dustMessageInfoPm25)}
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            03
          </Avatar>
        </ListItemAvatar>
        {makeProgress(dustMessageInfoO3)}
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            c0
          </Avatar>
        </ListItemAvatar>
        {makeProgress(dustMessageInfoCo)}
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
           no2
          </Avatar>
        </ListItemAvatar>
        {makeProgress(dustMessageInfoNo2)}
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            so2
          </Avatar>
        </ListItemAvatar>
        {makeProgress(dustMessageInfoSo2)}
      </ListItem>
    </List>
  );
}