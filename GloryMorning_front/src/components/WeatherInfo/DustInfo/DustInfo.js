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


  useEffect(() => {
    weather.getDustInfo();
  }, []);

  let dustInfoObject = weather.dustInfoObject
  let selectDustMessageInfo = weather.selectDustMessageInfo;
  console.log("[SEO] selectDustMessageInfo" ,selectDustMessageInfo)
  console.log("[SEO] dustInfoObject", dustInfoObject);
  let fontColor = 'white';
  return (
      <div>
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

        <div className="dust_info_overview">
          <DustInfoOverView weather = {weather}/>
        </div>
        </div>
    </div>
  );
});

export default DustInfo;
