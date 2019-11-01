import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DustInfoOverView from '../DustInfoOverView'
import "./DustInfo.scss";
import UseStores from "../../Setting/UseStores";

//측정일  :dateTime
//미세먼지  pm10Value
//초미세먼지 pm25Value
//오존  o3Value
//이산화질소 no2Value
//일산화탄소 coValue
//아황산가스 so2Value
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
}
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      //backgroundColor: theme.palette.background.paper,
      opacity : 0.5,
    },
  }));

const DustInfo = observer(() => {
  const { weather } = UseStores();
  const classes = useStyles();
  // componentDidMount(){
  //     const {getDustInfo} = this.props;
  //     getDustInfo();
  // }
  useEffect(() => {
    weather.getDustInfo();
  }, []);

  const [value, setValue] = React.useState(0);
  function handleChange(event, newValue) {
    setValue(newValue);
  }

  let dustInfoObject = weather.dustInfoObject
  let selectDustMessageInfo = weather.selectDustMessageInfo;
  console.log("[SEO] selectDustMessageInfo" ,selectDustMessageInfo)
  console.log("[SEO] dustInfoObject", dustInfoObject);
  let fontColor = 'white';
  return (
      <div>
      {/*
      <div className={classes.root}>
        <AppBar position="static" color="default">
            <Tabs value={value} 
                    onChange={handleChange} 
                    aria-label="simple tabs example"
                    variant="fullWidth"
                    >
            <Tab label="pm10" {...a11yProps(0)} />
            <Tab label="pm25" {...a11yProps(1)} />
            <Tab label="ozon" {...a11yProps(2)} />

            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
        <div className="dust_info_container">
        <div className="station_info">
            <div> 측정일 {dustInfoObject.dataTime} </div>
            <div>
            {" "}
            가장 가까운 관측소와의 거리는 {dustInfoObject.distance} 입니다
            </div>
            <div> 관측소 이름: {dustInfoObject.addr}</div>
        </div>
      {!_.isNil(dustInfoObject.dustMessageInfoPm10) &&
        <div className="display_icon_wrapper">
            <div className="info_header">
              {dustInfoObject.dustMessageInfoPm10.InfoHeader}
            </div>
            <div className="info_icon">
            {dustInfoObject.dustMessageInfoPm10.infoIcon}
            </div>
            <div className="info_value">미세먼지 {dustInfoObject.pm10Value}</div>
            <div className="infoMessage">
            {dustInfoObject.dustMessageInfoPm10.infoMessage}
            </div>
        </div>
      }

        <div className="sub_dust_info">
            <div> 초미세먼지 {dustInfoObject.pm25Value}</div>
            <div> 오존 {dustInfoObject.o3Value} </div>
            <div> 일산화탄소{dustInfoObject.coValue} </div>
            <div> 이산화질소 {dustInfoObject.no2Value}</div>
            <div> 아황산가스 {dustInfoObject.so2Value} </div>
        </div>
        </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
            Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
            Item Three
        </TabPanel>
    </div>
    */}

        <div className="dust_info_container">
          <div className="station_info">
              <div  className="station_info_date"> 
                측정일
                <div  className="station_info_dateTime"> 
                  {dustInfoObject.dataTime} 
                </div> 
              </div>

              <div className="station_info_distance">
              {" "}
                관측소와의 거리 :  {dustInfoObject.distance}km
              </div>
              <div  className="station_info_name"> 
                관측소 이름 
              </div>
              <div  className="station_info_addr">
                {dustInfoObject.addr} 
              </div>
          </div>

        {!_.isNil(dustInfoObject[selectDustMessageInfo]) &&
          <div className="display_icon_wrapper">
              <div className="info_header" style ={{color : fontColor}}>
                {dustInfoObject[selectDustMessageInfo].InfoHeader}
              </div>
              <div className="info_icon">
              {dustInfoObject[selectDustMessageInfo].infoIcon}
              </div>
              <div className= "info_name" >
                {dustInfoObject[selectDustMessageInfo].name}
              </div>
              <div className="info_value" style ={{color : dustInfoObject[selectDustMessageInfo].color}}> 
                {dustInfoObject[selectDustMessageInfo].value}
              </div>
              <div className="info_message" style ={{color : dustInfoObject[selectDustMessageInfo].color}}>
              {dustInfoObject[selectDustMessageInfo].infoMessage}
              </div>
          </div>
        }
        {/*
        <div className="sub_dust_info">
            <div> 초미세먼지 {dustInfoObject.pm25Value}</div>
            <div> 오존 {dustInfoObject.o3Value} </div>
            <div> 일산화탄소{dustInfoObject.coValue} </div>
            <div> 이산화질소 {dustInfoObject.no2Value}</div>
            <div> 아황산가스 {dustInfoObject.so2Value} </div>
        </div>
        */}
        <div className="dust_info_overview">
          <DustInfoOverView weather = {weather}/>
        </div>
        </div>
    </div>
  );
});

export default DustInfo;
