import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import io from 'socket.io-client';
import * as _ from 'lodash';
import * as helpers from '../lib/helpers';
import * as weatherApi from '../lib/api/weatherApi';
import clientConfig from '../configuration/clientConfig';

// PRIVATE -> API 키 이용해서 직접 호출
// MEMBER -> 내 DB에서 조회 호출
//const MODE = "PRIVATE_MODE" // PRIVATE_MODE 모드 DEFAULT 세팅 없음 개인 유저키로 운영
const MODE = 'MEMBER_MODE';
export default class WeatherStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable locationInfo = null;
  @observable timeSocket = null;
  @observable timeObj = {
    hour: '',
    minute: '',
    second: '',
  };

  //LEGACY
  @observable error = null;
  @observable isFetchingRain = false;
  @observable isFetchingTemp = false;
  @observable isFetchingHumi = false;

  @observable selectDustMessageInfo = 'dustMessageInfoPm10'; //default
  @observable dustInfoObject = {
    //초 미세먼지
    dustMessageInfoPm10: {
      name: '',
      InfoHeader: '',
      infoIcon: '',
      infoMessage: '',
      level: '',
      color: '',
      value: '',
    },
    //미세먼지
    dustMessageInfoPm25: {
      name: '',
      InfoHeader: '',
      infoIcon: '',
      infoMessage: '',
      level: '',
      color: '',
      value: '',
    },
    //오존
    dustMessageInfoO3: {
      name: '',
      InfoHeader: '',
      infoIcon: '',
      infoMessage: '',
      level: '',
      color: '',
      value: '',
    },
    //일산화탄소
    dustMessageInfoCo: {
      name: '',
      InfoHeader: '',
      infoIcon: '',
      infoMessage: '',
      level: '',
      color: '',
      value: '',
    },
    //이산화
    dustMessageInfoNo2: {
      name: '',
      InfoHeader: '',
      infoIcon: '',
      infoMessage: '',
      level: '',
      color: '',
      value: '',
    },
    //아황산
    dustMessageInfoSo2: {
      name: '',
      InfoHeader: '',
      infoIcon: '',
      infoMessage: '',
      level: '',
      color: '',
      value: '',
    },
    addr: '',
    coGrade: '',
    coValue: '',
    dataTerm: '',
    dataTime: '',
    distance: 0,
    khaiGrade: '',
    khaiValue: '',
    mangName: '',
    no2Grade: '',
    no2Value: '',
    numOfRows: '',
    o3Grade: '',
    o3Value: '',
    pageNo: '',
    pm10Grade: '',
    pm10Grade1h: '',
    pm10Value: '',
    pm10Value24: '',
    pm25Grade: '',
    pm25Grade1h: '',
    pm25Value: '',
    pm25Value24: '',
    resultCode: '',
    resultMsg: '',
    rnum: 0,
    serviceKey: '',
    sidoName: '',
    so2Grade: '',
    so2Value: '',
    stationCode: '',
    stationName: '',
    totalCount: '',
    ver: '',
    _returnType: '',
  };
  @observable weatherInfoObject = {
    baseTime: '',
    baseDate: '',
    weatherclassNames: '',
    weatherInfoName: '',
    temperatureNow: '',
    rainNow: '',
    humidityNow: '',
  };

  @observable weatherClassName = '';
  @observable temperatureNow = '';
  @observable weatherInfoData = [];
  @observable weatherData = [];
  @observable rainData = [];
  @observable humidityData = [];
  @observable temperatureData = [];
  @observable nowLocation = '서울역 날씨';

  @observable isFetchingSky = false;
  @observable isFetchingRain = false;
  @observable isFetchingRainmm = false;
  @observable isFetchingTemp = false;
  @observable isFetchingHumi = false;

  @observable isUpdatedSky = false;
  @observable isUpdatedRain = false;
  @observable isUpdatedRainmm = false;
  @observable isUpdatedTemp = false;
  @observable isUpdatedHumi = false;

  @observable isFetchingShortTerm = false;
  @observable isFetchingHumiDust = false;

  @observable humidityDataList = []; //습도
  @observable rainfallDataList = []; //강수확률
  @observable rainfallmmDataList = []; //강수량
  @observable skyDataList = []; //날씨
  @observable temperatureDataList = []; //온도

  @observable humidityDataListYesterday = []; //어제 습도
  @observable rainfallDataListYesterday = []; //어제 강수확률
  @observable rainfallmmDataListYesterday = []; //어제 강수량
  @observable skyDataListYesterday = []; // 어제 날씨
  @observable temperatureDataListYesterday = []; //어제 온도

  @observable currentX = null; // 좌표 X
  @observable currentY = null; // 좌표 Y

  @observable LocationA = '';
  @observable LocationB = '';
  @observable LocationC = '';

  @observable justFitClothes = {
    top: '',
    bottom: '',
  };

  @observable weatherArray = [];
  @observable yesterdayArray = [];
  @observable isWeatherDataFetchedYn = false;

  /* dustInfoOverView 에 버튼 클릭시  */
  @action
  setSelectDustMessageInfo = objectName => {
    this.selectDustMessageInfo = objectName;
  };

  @action
  setHumidityDataListEmpty = () => {
    this.humidityDataList = [];
  };
  @action
  setRainfallDataListEmpty = () => {
    this.rainfallDataList = [];
  };
  @action
  setRainfallmmDataEmpty = () => {
    this.rainfallmmDataList = [];
  };
  @action
  setSkyDataListEmpty = () => {
    this.skyDataList = [];
  };
  @action
  setTemperatureDataListEmpty = () => {
    this.temperatureDataList = [];
  };
  @action
  initChart = () => {
    this.humidityDataList = [];
    this.rainfallDataList = [];
    this.rainfallmmDataList = [];
    this.rainfallmmDataList = [];
    this.skyDataList = [];
    this.temperatureDataList = [];

    this.humidityDataListYesterday = []; //어제 습도
    this.rainfallDataListYesterday = []; //어제 강수확률
    this.rainfallmmDataListYesterday = []; //어제 강수량
    this.skyDataListYesterday = []; // 어제 날씨
    this.temperatureDataListYesterday = []; //어제 온도
  };

  @action
  setSocketConnection = () => {
    // console.log('[SetSocketConnectio]');
    if (_.isEmpty(this.timeSocket)) {
      const timeSocket = io(clientConfig.endpoint.socket);
      // console.log(socket)
      timeSocket.on('connect', () => {
        console.log('[seo] connected');
      });
      this.timeSocket = timeSocket;
      /* socketIo를 통한 시계 구현  */
      timeSocket.on('getTime', data => {
        if (!_.isNil(data.serverTime)) {
          this.timeObj = data.serverTime;
        }
      });
      /* socket 이름 변경 요망  */
      timeSocket.on('updateWeatherData', data => {
        //alert('hell');
        this.upateWeatherData();
      });
    }
  };

  @action
  settingLocationInfo = async () => {
    try {
      this.locationInfo = await this.nowGeolocation();
    } catch (e) {
      console.log('[settingLocationInfo] error');
      this.locationInfo = null;
    }
  };
  /*process => 
    0. componentDidMount에서 한번 전체 실행되고 
    그이후 update

  */
  @action
  upateWeatherData = () => {
    this.getWeatherDataV2('ALL');
  };

  @action
  updateWeatherDataShortTerm = () => {
    this.getWeatherDataShortTerm();
  };

  //사용할지 안할지 생각해보기
  @action
  initDefaultUpdateWeater = async () => {
    //console.log('[seo] initDefaultUpdateWeater 1');
    await this.settingLocationInfo();
    //console.log('[seo] initDefaultUpdateWeater 2');
    //gps기반 세팅이 된경우
    if (this.locationInfo) {
      //console.log('[initDefaultUpdateWeater]');
      await this.getWeatherDataV2('ALL');
      await this.getWeatherDataShortTerm();
      await this.getDustInfo();
    } else {
      //console.log('[initDefaultUpdateWeater] this locationInfo is null');
      //아닌 경우
      let addressList = this.rootStore.search.selectedAddressList;
      // db에서 가져와서 세팅이 되어있는 경우
      //console.log('[initDefaultUpdateWeater] addressList', addressList);
      if (addressList && addressList.length !== 0) {
        //console.log('[initDefaultUpdateWeater] addressList is fine');
        this.rootStore.search.setThisLocation(addressList[0]);
      } else {
        //console.log('[initDefaultUpdateWeater] addressList is null');
        //아닌경우 호출후 첫번쨰
        await this.rootStore.search.getSettingLocation();
        addressList = this.rootStore.search.selectedAddressList;
        this.rootStore.search.setThisLocation(addressList[0]);
      }
    }
  };

  /* 임시로 time socket 사용  */
  @action
  updateWeatherDataIntevalStart = () => {
    this.timeSocket.emit('updateWeatherData', 'updateWeatherData');
  };
  @action
  getTimeIntervalStart = () => {
    this.timeSocket.emit('time', 'getTimeStart');
  };

  @action
  setSocketDisconnect = () => {
    console.log('[SEO] setSocketDisconnect');
    this.timeSocket.emit('disconnect', 'disconnect');
    //this.timeSocket = null;
  };

  @action
  getJustFitClothes = temperature => {
    temperature = parseInt(temperature);
    if (temperature >= 28) {
      this.justFitClothes = {
        top: '반팔',
        bottom: '반바지',
      };
      //반팔 반바지
    }
    if (27 >= temperature && temperature >= 23) {
      this.justFitClothes = {
        top: '반팔, 얇은 셔츠',
        bottom: '반바지, 면바지',
      };
      //반팔, 얇은 셔츠, 반바지, 면바지
    }
    if (22 >= temperature && temperature >= 20) {
      this.justFitClothes = {
        top: '얇은 가디건, 긴팔',
        bottom: '반바지, 면바지',
      };
      //얇은 가디건, 긴판, 반바지, 면바지
    }
    if (19 >= temperature && temperature >= 17) {
      this.justFitClothes = {
        top: '얇은 니트, 맨투맨, 가디건',
        bottom: '청바지',
      };
      //얇은 니트 , 맨투맨 , 가디건, 청바지
    }
    if (16 >= temperature && temperature >= 12) {
      this.justFitClothes = {
        top: '자켓, 가디건, 야상 ',
        bottom: '청바지, 면바지',
      };
      //자켓, 가디건, 야상, 청바지, 면바지
    }
    if (11 >= temperature && temperature >= 9) {
      this.justFitClothes = {
        top: '자켓, 트렌치, 코트, 니트',
        bottom: '청바지, 면바지',
      };
      //자켓, 트렌치코트 ,야상 , 니트 ,
    }
    if (8 >= temperature && temperature >= 5) {
      this.justFitClothes = {
        top: '자켓, 트렌치, 코트, 니트',
        bottom: '청바지, 면바지',
      };
      //코트 ,가죽자켓 , 히트텍 ,니트
    }
    if (4 >= temperature) {
      this.justFitClothes = {
        top: '패딩, 얼,죽,코, 목도리.',
        bottom: '기모',
      };
      //패딩, 두꺼운 코트 ,목도리 ,기모
    }
    if (-5 >= temperature) {
      this.justFitClothes = {
        top: '방한용품 착용하세요...',
        bottom: '히트텍 입으셈...',
      };
      //방한용품 착용하세요...
    }
  };

  @action
  getAreaRiseSetInfo = async () => {
    try {
      let response = await weatherApi.getAreaRiseSetInfo();
      let resData = response.data.data;
      return resData.response.body.items;
    } catch (e) {
      console.log('error', e);
      return 'error';
    }
  };

  //현재 위치 알것  nowGeolocation이용
  //현재 위치 에서 가장 근처에 있는 측정소를 찾을 것
  //가장 근처에 있는 측정소 미세먼지 정보 RETURN
  @action
  getDustInfo = async (isDefault, item) => {
    try {
      let locationInfo = this.locationInfo;
      let tmCordinate;
      // if (isDefault) {
      //   console.log('[SEO] getDustInfo1');
      //   if (!locationInfo) {
      //     locationInfo = await this.nowGeolocation();
      //   }
      //   console.log('[SEO] getDustInfo2 locationInfo', locationInfo);
      //   tmCordinate = await this.getCordinate('TM', locationInfo);
      //   console.log('[SEO] getDustInfo3');
      //   console.log('[SEO]  tmCordinate ', tmCordinate);
      // }

      // else {
      //selected에서 클릭이벤트
      locationInfo = {
        currentX: item.x,
        currentY: item.y,
      };
      tmCordinate = await this.getCordinate('TM', locationInfo);
      //}

      let tmX = tmCordinate.x;
      let tmY = tmCordinate.y;
      const response = await weatherApi.getNearbyMsrstnList(tmX, tmY);
      console.log('[SEO] getNearbyMsrstnList ', response);
      if (response.status === 200 && response.statusText === 'OK') {
        let dustInfoObject = response.data;

        dustInfoObject.dustMessageInfoPm10 = helpers.getDustIcon(
          'pm10',
          parseInt(dustInfoObject.pm10Value),
        );
        dustInfoObject.dustMessageInfoPm25 = helpers.getDustIcon(
          'pm25',
          parseInt(dustInfoObject.pm25Value),
        );
        dustInfoObject.dustMessageInfoO3 = helpers.getDustIcon(
          'o3',
          parseInt(dustInfoObject.o3Value),
        );
        dustInfoObject.dustMessageInfoCo = helpers.getDustIcon(
          'co',
          parseInt(dustInfoObject.coValue),
        );
        dustInfoObject.dustMessageInfoNo2 = helpers.getDustIcon(
          'no2',
          parseInt(dustInfoObject.no2Value),
        );
        dustInfoObject.dustMessageInfoSo2 = helpers.getDustIcon(
          'so2',
          parseInt(dustInfoObject.so2Value),
        );

        /* 왜 겹치지? */
        dustInfoObject.dustMessageInfoPm10.value = dustInfoObject.pm10Value;
        dustInfoObject.dustMessageInfoPm25.value = dustInfoObject.pm25Value;

        dustInfoObject.dustMessageInfoO3.value = dustInfoObject.o3Value;
        dustInfoObject.dustMessageInfoCo.value = dustInfoObject.coValue;
        dustInfoObject.dustMessageInfoNo2.value = dustInfoObject.no2Value;
        dustInfoObject.dustMessageInfoSo2.value = dustInfoObject.so2Value;

        dustInfoObject.dustMessageInfoPm10.name = '미세먼지';
        dustInfoObject.dustMessageInfoPm25.name = '초미세먼지';
        dustInfoObject.dustMessageInfoO3.name = '오존';
        dustInfoObject.dustMessageInfoCo.name = '일산화탄소';
        dustInfoObject.dustMessageInfoNo2.name = '이산화질소';
        dustInfoObject.dustMessageInfoSo2.name = '아황산가스';

        console.log(
          '[SEO] dustInfoObject ',
          dustInfoObject,
          dustInfoObject.length,
        );

        this.dustInfoObject = dustInfoObject;
      }
    } catch (e) {
      console.log('ç', e);
    }
  };

  /*
      shortTerm 같은 경우는 일단 private로 진행하는게..?
    */
  @action
  getWeatherDataShortTerm = async (isDefault, item) => {
    //console.log('[SEO][getWeatherDataShortTerm][item] ', item);
    let locationInfo = this.locationInfo;
    let dayTimeYn;
    let responsedata;
    let nx;
    let ny;
    try {
      let riseSetInfo = await this.getAreaRiseSetInfo();
      /* 로케이션에서 클릭이벤트로 이함수를 호출했을때  */
      if (!isDefault && !_.isNil(item)) {
        dayTimeYn = riseSetInfo.item.isDayTimeYn;
        this.getLocationName(parseFloat(item.x), parseFloat(item.y));
        responsedata = this.convert(parseFloat(item.y), parseFloat(item.x));
        nx = responsedata.x;
        ny = responsedata.y;
      } else {
        //기본 default
        if (!locationInfo) {
          locationInfo = await this.nowGeolocation();
        }
        dayTimeYn = riseSetInfo.item.isDayTimeYn;
        responsedata = this.convert(
          locationInfo.currentY,
          locationInfo.currentX,
        );
        nx = responsedata.x;
        ny = responsedata.y;
      }
    } catch (e) {
      console.log(e);
    }

    try {
      let response;
      if (MODE === 'MEMBER_MODE') {
        this.isFetchingShortTerm = true;
        response = await weatherApi.getWeatherDataShortTerm(nx, ny);
      } else if (MODE === 'PRIVATE_MODE') {
        this.isFetchingShortTerm = true;
        response = await weatherApi.getWeatherDataPrivateMode(nx, ny, true);
      }
      console.log('[seo][getWeatherDataShortTerm] response ', response);
      let sky; //날씨
      let pty; //강수형태
      let temperatureNow;
      let humidityNow;
      let rainNow;
      let baseDate;
      let baseTime;
      let weatherInfo;
      if (MODE === 'PRIVATE_MODE') {
        let responseData = response.data.data.response.body;
        //console.log("responseData" , responseData)
        weatherInfo = responseData.items.item;

        weatherInfo.map(item => {
          //console.log('item', item.CATEGORY)
          if (item.category === 'SKY') {
            sky = parseInt(item.fcstValue);
          }
          if (item.category === 'PTY') {
            pty = parseInt(item.fcstValue);
          }
          if (item.category === 'T1H') {
            temperatureNow = parseInt(item.fcstValue);
          }
          if (item.category === 'RN1') {
            rainNow = item.fcstValue;
          }
          if (item.category === 'REH') {
            humidityNow = parseInt(item.fcstValue);
          }
          baseDate = item.baseDate;
          baseTime = item.baseTime;
        });
        let skyInfoStr = String(sky) + String(pty);
        let weatherInfoData = this.getWeatherClassName(skyInfoStr, dayTimeYn);
        let weatherInfoObject = {
          baseDate: baseDate,
          baseTime: baseTime,
          weatherClassName: weatherInfoData.weatherClassName,
          weatherInfoName: weatherInfoData.weatherInfoName,
          temperatureNow: temperatureNow,
          rainNow: rainNow,
          humidityNow: humidityNow,
        };
        this.weatherInfoObject = weatherInfoObject;
      }
      if (MODE === 'MEMBER_MODE') {
        weatherInfo = response.data;
        if (!weatherInfo) {
          return;
        }
        weatherInfo.map(item => {
          //console.log('item', item.CATEGORY)
          if (item.CATEGORY === 'SKY') {
            sky = parseInt(item.FCST_VALUE);
          }
          if (item.CATEGORY === 'PTY') {
            pty = parseInt(item.FCST_VALUE);
          }
          if (item.CATEGORY === 'T1H') {
            temperatureNow = parseInt(item.FCST_VALUE);
          }
          if (item.CATEGORY === 'RN1') {
            rainNow = item.FCST_VALUE;
          }
          if (item.CATEGORY === 'REH') {
            humidityNow = parseInt(item.FCST_VALUE);
          }
          baseDate = item.BASE_DATE;
          baseTime = item.BASE_TIME;
        });
        let skyInfoStr = String(sky) + String(pty);

        //.temperatureNow = temperatureNow;
        //this.weatherClassName = this.getWeatherClassName(skyInfoStr)
        //this.weatherInfoData = weatherInfo;
        let weatherInfoData = this.getWeatherClassName(skyInfoStr, dayTimeYn);
        let weatherRainBoxInfoData = this.getWeatherGamsungName(
          skyInfoStr,
          dayTimeYn,
        );
        let weatherInfoObject = {
          baseDate: baseDate,
          baseTime: baseTime,
          weatherClassName: weatherInfoData.weatherClassName,
          weatherInfoName: weatherInfoData.weatherInfoName,
          weatherInfoGamsung: weatherRainBoxInfoData.info, //rainComponent 용
          weatherInfoCode: weatherRainBoxInfoData.rainViewCode, //rainComopnent용
          temperatureNow: temperatureNow,
          rainNow: rainNow,
          humidityNow: humidityNow,
        };
        console.log('weatherInfoObject ', weatherInfoObject);
        this.getJustFitClothes(weatherInfoObject.temperatureNow);
        this.weatherInfoObject = weatherInfoObject;
        this.isFetchingShortTerm = false;
      }
    } catch (e) {
      this.isFetchingShortTerm = false;
      console.log(e);
    }
  };

  getWeatherGamsungName = (skyInfoStr, dayTimeYn) => {
    //sunny
    //rain
    let weatherCode = skyInfoStr.split('');
    let sky = weatherCode[0];
    let pty = weatherCode[1];
    //흐림 0
    //sunny 1
    //rain  2
    //drizzle 3  //추후 추가 예정
    //storm  4   //추후 추가 예정
    //snow

    //day 1
    //night 2
    if (sky === 1) {
      if (!dayTimeYn) {
        return { rainViewCode: '11', info: '맑은 밤이에요.' };
      }
      return { rainViewCode: '12', info: '맑은 하루에요.' };
    } else {
      if (pty === 1 || pty === 2) {
        if (!dayTimeYn) {
          return { rainViewCode: '22', info: '비오는 밤.' };
        }
        return { rainViewCode: '12', info: '맑은 밤이에요.' };
      } else if (pty === 3 || pty === 4) {
        if (!dayTimeYn) {
          return { rainViewCode: '52', info: '눈오는 밤.' };
        }
        return { rainViewCode: '51', info: '눈이 내려요.' };
      } else {
        if (!dayTimeYn) {
          return { rainViewCode: '02', info: '흐린 밤이네요.' };
        }
        return { rainViewCode: '01', info: '흐린 하루에요.' };
      }
    }
  };

  getWeatherClassName = (skyInfoStr, dayTimeYn) => {
    let className = '';
    let weatherInfoName = '';
    // sky
    // ① 1 : 맑음
    // ② 2 : 구름조금
    // ③ 3 : 구름많음
    // ④ 4 : 흐림

    // pty
    // ① 0 : 없음
    // ② 1 : 비
    // ③ 2 : 비/눈
    // ④ 3 : 눈/비
    // ⑤ 4 : 눈
    switch (skyInfoStr) {
      //맑음
      case '10':
        className = dayTimeYn ? 'wi wi-day-sunny' : 'wi wi-night-clear';
        weatherInfoName = '맑음';
        break;

      case '20':
        className = dayTimeYn ? 'wi wi-day-cloudy' : 'wi wi-night-alt-cloudy';
        weatherInfoName = '구름 적음';
        break;
      case '21':
        className = dayTimeYn ? 'wi wi-day-rain' : 'wi wi-night-alt-rain';
        weatherInfoName = '구름 적고 비';
        break;
      case '22':
        className = dayTimeYn ? 'wi wi-day-sleet' : 'wi wi-night-alt-sleet';
        weatherInfoName = '구름 적고 비 또는 눈';
        break;
      case '23':
        className = dayTimeYn ? 'wi wi-day-sleet' : 'wi wi-night-alt-sleet';
        weatherInfoName = '구름 적고 눈 또는 비';
        break;
      case '24':
        className = dayTimeYn ? 'wi wi-day-snow' : 'wi wi-night-alt-snow';
        weatherInfoName = '구름 적고 눈';
        break;

      case '30':
        className = dayTimeYn ? 'wi wi-cloud' : 'wi wi-night-alt-cloudy';
        weatherInfoName = '구름 많음';
        break;
      case '31':
        className = dayTimeYn ? 'wi wi-rain' : 'wi wi-night-alt-rain';
        weatherInfoName = '구름 많고 비';
        break;
      case '32':
        className = dayTimeYn ? 'wi wi-sleet' : 'wi wi-night-alt-sleet';
        weatherInfoName = '구름 많고 비 또는 눈';
        break;
      case '33':
        className = dayTimeYn ? 'wi wi-sleet' : 'wi wi-night-alt-sleet';
        weatherInfoName = '구름 많고 눈 또는 비';
        break;
      case '34':
        className = dayTimeYn ? 'wi wi-snow' : 'wi wi-night-alt-snow';
        weatherInfoName = '구름 많고 눈 ';
        break;

      case '40':
        className = dayTimeYn ? 'wi wi-cloudy' : 'wi wi-night-alt-cloudy';
        weatherInfoName = '흐림';
        break;
      case '41':
        className = dayTimeYn ? 'wi wi-rain' : 'wi wi-night-alt-rain';
        weatherInfoName = '흐리고 비';
        break;
      case '42':
        className = dayTimeYn ? 'wi wi-sleet' : 'wi wi-night-alt-sleet';
        weatherInfoName = '흐리고 비 또는 눈';
        break;
      case '43':
        className = dayTimeYn ? 'wi wi-sleet' : 'wi wi-night-alt-sleet';
        weatherInfoName = '흐리고 눈 또는 비';
        break;
      case '44':
        className = dayTimeYn ? 'wi wi-snow' : 'wi wi-night-alt-snow';
        weatherInfoName = '흐리고 눈';
        break;

      default:
        break;
    }
    //---------weather code

    // 10 맑음  wi-day-sunny
    //-- 존재 불가
    // 11  맑음 비
    // 12  맑은 비/눈
    // 13  맑은 눈/비
    // 14  맑은 눈

    // 20 구름조금    wi-day-cloudy
    // 21  구름조금 비   wi-day-rain
    // 22  구름조금 비/눈 wi-day-sleet
    // 23  구름조금 눈/비   wi-day-sleet
    // 24  구름조금 눈  wi-day-snow

    // 30 구름많음 wi-cloud
    // 31  구름많음 비  wi-rain
    // 32  구름많음 비/눈 wi-sleet
    // 33  구름많음 눈/비  wi-sleet
    // 34  구름많음 눈   wi-snow

    // 40  흐림 wi-cloudy
    // 41  흐림 비  wi-rain
    // 42  흐림 비/눈  wi-sleet
    // 43  흐림 눈/비   wi-sleet
    // 44  흐림 눈  wi-snow
    return { weatherClassName: className, weatherInfoName: weatherInfoName };
  };

  /* gps 좌표를 바탕으로 
      현재 gps 세팅함 
    */

  getPosition = options => {
    console.log('getPosition');
    return new Promise((resolve, reject) => {
      //navigator.geolocation.watchPosition(resolve, reject, options);
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  @action
  nowGeolocation = async () => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      try {
        const position = await this.getPosition();
        this.currentX = position.coords.longitude;
        this.currentY = position.coords.latitude;
        let currentX = position.coords.longitude;
        let currentY = position.coords.latitude;
        let locationInfo = await this.getLocationName(currentX, currentY);
        this.locationInfo = locationInfo;
        return locationInfo;
      } catch (e) {
        console.log('[nowGeolocation] error ', e);
        return null;
      }
    } else {
      console.log('error gps 자원 안함');
      alert('GPS를 지원하지 않습니다');
    }
  };

  //1. 현재 위치 받아오기
  //2. 현재 위치에 대한 data insert시켜
  // weatherChain = async() =>{
  //   weatherApi.insertWeatherData();
  // }

  checkisLocationSet = () => {
    //X Y 좌표를 아직 세팅을 안했다면
    //5초마다 세팅을 하게 함
    if (_.isNil(this.currentX) || _.isNil(this.currentY)) {
      this.setInterval(() => {
        this.nowGeolocation();
      }, 3000);
    }
  };

  @action
  getLocationName = async (currentX, currentY) => {
    //현재 x,y 에 대한 동네 위치 요청
    //console.log("axiosTest!!")
    // _.isNil(this.currentX) ? this.currentX = 127.10459896729914 : this.currentX = this.currentX
    // _.isNil(this.currentY) ? this.currentY = 37.40269721785548 : this.currentY = this.currentY
    console.log(
      '[SEO][getLocationName] currentX ,   currentY',
      currentX,
      currentY,
    );

    //https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=127.10459896729914&y=37.40269721785548
    try {
      //오류날 경우 반복 요청해야하나?
      const res = await axios.get(
        'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json',
        {
          params: {
            // query string
            //  x: '127.10459896729914',
            //  y: '37.40269721785548'
            x: currentX.toString(),
            y: currentY.toString(),
          },
          headers: {
            // 요청 헤더
            Authorization: 'KakaoAK ' + process.env.REACT_APP_KAKAO_API_KEY,
          },
          timeout: 3000, // 3초 이내에 응답이 오지 않으면 에러로 간주
        },
      );
      //카카오톡에 요청
      if (res.data.documents) {
        let resData = res.data.documents[1];
        let LocationA = resData.region_1depth_name;
        let LocationB = resData.region_2depth_name;
        let LocationC = resData.region_3depth_name;
        this.LocationA = LocationA;
        this.LocationB = LocationB;
        this.LocationC = LocationC;
        console.log(
          '[SEO][getLocationName] LocationA LocationB, LocationC',
          LocationA,
          LocationB,
          LocationC,
        );
        return {
          LocationA: LocationA,
          LocationB: LocationB,
          LocationC: LocationC,
          currentX: currentX,
          currentY: currentY,
        };
        //this.getTmCordinate();
      } else {
        return {
          LocationA: '',
          LocationB: '',
          LocationC: '',
          currentX: currentX,
          currentY: currentY,
        };
      }
    } catch (e) {
      console.log('[SEO][getLocationName][ERROR] ', e);
      alert(
        '[에러] 현재 동네 위치를 알수가 없습니다. 인터넷 연결을 확인해주세요 ',
      );
      return {
        LocationA: '',
        LocationB: '',
        LocationC: '',
        currentX: currentX,
        currentY: currentY,
      };
    }
  };

  /* tm 좌표를 가져옴  */
  /* 미세먼지 좌표를 위한  */
  @action
  getCordinate = async (outputCoord, locationInfo) => {
    //현재 x,y 에 대한 동네 위치 요청
    // _.isNil(this.currentX) ? this.currentX = 127.10459896729914 : this.currentX = this.currentX
    // _.isNil(this.currentY) ? this.currentY = 37.40269721785548 : this.currentY = this.currentY
    //https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=127.10459896729914&y=37.40269721785548
    try {
      //?x=160710.37729270622&y=-4388.879299157299&input_coord=WTM&output_coord=WGS84"
      const response = await axios.get(
        'https://dapi.kakao.com/v2/local/geo/transcoord.json?',
        {
          params: {
            // query string
            // x: '127.10459896729914',
            // y: '37.40269721785548'
            x: locationInfo.currentX,
            y: locationInfo.currentY,
            input_coord: 'WGS84',
            output_coord: outputCoord,
          },
          headers: {
            // 요청 헤더
            Authorization: 'KakaoAK ' + process.env.REACT_APP_KAKAO_API_KEY,
          },
          timeout: 3000, // 1초 이내에 응답이 오지 않으면 에러로 간주
        },
      );
      if (response.data.documents) {
        let resData = response.data.documents;
        return resData[0];
      } else {
        return false;
      }
    } catch (e) {
      console.log('[getCordinate] error ', e);
    }
  };

  makeWeatherArray = weatherArray => {
    return weatherArray.map(item => {
      let momentobj = moment(item.FCST_DATE + item.FCST_TIME, 'YYYYMMDDHHmm');
      return [momentobj._d.valueOf(), parseInt(item.FCST_VALUE)];
    });
  };

  @action
  getWeatherDataV2 = async (category, isDefault = true, item) => {
    let response;
    let locationInfo = this.locationInfo;
    let responsedata;
    let nx;
    let ny;

    //location 클릭 이벤트로 진입
    if (!isDefault && item) {
      responsedata = this.convert(parseFloat(item.y), parseFloat(item.x));
      nx = responsedata.x;
      ny = responsedata.y;
    } else {
      if (!locationInfo) {
        locationInfo = await this.nowGeolocation();
      }
      const { currentY, currentX } = locationInfo;
      responsedata = this.convert(currentY, currentX);
      nx = responsedata.x;
      ny = responsedata.y;
    }

    if (category === 'ALL') {
      this.isFetchingHumi = true;
      this.isFetchingRain = true;
      this.isFetchingRainmm = true;
      this.isFetchingSky = true;
      this.isFetchingTemp = true;

      this.isUpdatedHumi = false;
      this.isUpdatedRain = false;
      this.isUpdatedRainmm = false;
      this.isUpdatedSky = false;
      this.isUpdatedTemp = false;
    }
    if (MODE === 'MEMBER_MODE') {
      console.log('[seo] response 호출 nx,ny categoty', nx, ny, category);
      response = await weatherApi.getWeatherData(nx, ny, category);
      console.log('[seo] response 중 ');
      if (response.statusText === 'OK') {
        let weatherArray;
        let yesterdayArray;
        weatherArray = response.data;
        console.log('[seo] weatherArray! ', weatherArray);
        //어제 부터 오늘
        console.log(
          '[SEO] yesterdayPlus',
          moment()
            .subtract(2, 'days')
            .format('YYYYMMDD'),
        );

        let yesterdayPlus = moment()
          .subtract(2, 'days')
          .format('YYYYMMDD');
        let yesterday = moment()
          .subtract(1, 'days')
          .format('YYYYMMDD');
        let today = moment().format('YYYYMMDD');
        let tommorow = moment()
          .add(1, 'days')
          .format('YYYYMMDD');

        yesterdayArray = weatherArray.filter(item => {
          return yesterdayPlus <= item.FCST_DATE && item.FCST_DATE <= today;
        });
        console.log('[SEO] YESTERDAY ', yesterdayArray);

        //현재 ARRAY
        weatherArray = weatherArray.filter(item => {
          return yesterday <= item.FCST_DATE && item.FCST_DATE <= tommorow;
        });
        console.log('[SEO] TODAY ', weatherArray);
        /* yesterdayArray가 커서 보여지는게 헷갈려서 아예 날려버림  */
        if (yesterdayArray.length < weatherArray.length) {
          yesterdayArray = [];
        }

        this.weatherArray = weatherArray;
        this.yesterdayArray = yesterdayArray;
        this.isWeatherDataFetchedYn = true;
      }
    }
  };

  getWeather = category => {
    let weatherArray = this.weatherArray.slice();
    let yesterdayArray = this.yesterdayArray.slice();
    switch (category) {
      case 'REH':
        weatherArray = weatherArray.filter(item => item.CATEGORY === category);
        yesterdayArray = yesterdayArray.filter(
          item => item.CATEGORY === category,
        );
        console.log('weatherArray ', weatherArray);
        console.log('yesterdayArray ', yesterdayArray);
        this.humidityDataList = this.makeWeatherArray(weatherArray);
        this.humidityDataListYesterday = this.makeWeatherArray(yesterdayArray);
        this.isFetchingHumi = false;
        this.isUpdatedHumi = true;
        break;
      case 'POP':
        weatherArray = weatherArray.filter(item => item.CATEGORY === category);
        yesterdayArray = yesterdayArray.filter(
          item => item.CATEGORY === category,
        );
        this.rainfallDataList = this.makeWeatherArray(weatherArray);
        this.rainfallDataListYesterday = this.makeWeatherArray(yesterdayArray);
        this.isFetchingRain = false;
        this.isUpdatedRain = true;
        break;
      case 'R06':
        weatherArray = weatherArray.filter(item => item.CATEGORY === category);
        yesterdayArray = yesterdayArray.filter(
          item => item.CATEGORY === category,
        );
        this.rainfallmmDataList = this.makeWeatherArray(weatherArray);
        this.rainfallmmDataListYesterday = this.makeWeatherArray(
          yesterdayArray,
        );
        this.isFetchingRainmm = false;
        this.isUpdatedRainmm = true;
        break;
      case 'SKY':
        weatherArray = weatherArray.filter(item => item.CATEGORY === category);
        yesterdayArray = yesterdayArray.filter(
          item => item.CATEGORY === category,
        );
        this.skyDataList = this.makeWeatherArray(weatherArray);
        this.skyDataListYesterday = this.makeWeatherArray(yesterdayArray);
        this.isFetchingSky = false;
        this.isUpdatedSky = true;
        break;
      case 'T3H':
        weatherArray = weatherArray.filter(item => item.CATEGORY === category);
        yesterdayArray = yesterdayArray.filter(
          item => item.CATEGORY === category,
        );
        this.temperatureDataList = this.makeWeatherArray(weatherArray);
        this.temperatureDataListYesterday = this.makeWeatherArray(
          yesterdayArray,
        );
        this.isFetchingTemp = false;
        this.isUpdatedTemp = true;
        break;
      default:
        break;
    }
    this.isWeatherDataFetchedYn = false;
  };

  @action
  getAllWeatherData = async (locationA, locationB, locationC) => {
    try {
      this.isFetchingHumi = true;
      this.isFetchingRain = true;
      const response = await weatherApi.getLocation(
        locationA,
        locationB,
        locationC,
      );
      if (response.statusText === 'OK') {
        //포스트 작성 성공
        //console.log(response)
        let responseData = response.data.response.body;
        let weatherArray = responseData.items.item;
        //console.log(weatherArray)

        let rainfallArr = [];
        let rainfallmmArr = [];
        let humidityArr = [];
        let skyArr = [];
        let temperatureArr = [];
        weatherArray.map(item => {
          if (item.category === 'POP') {
            rainfallArr.push(item);
          }
          if (item.category === 'PTY') {
            rainfallmmArr.push(item);
          }
          if (item.category === 'REH') {
            humidityArr.push(item);
          }
          if (item.category === 'SKY') {
            skyArr.push(item);
          }
          if (item.category === 'T3H') {
            temperatureArr.push(item);
          }
        });

        humidityArr.map(item => {
          this.humidityDataList.push([
            item.fcstTime.toString(),
            parseInt(item.fcstValue),
          ]);
        });
        rainfallArr.map(item => {
          this.rainfallDataList.push([
            item.fcstTime.toString(),
            parseInt(item.fcstValue),
          ]);
        });
        rainfallmmArr.map(item => {
          this.rainfallmmDataList.push([
            item.fcstTime.toString(),
            parseInt(item.fcstValue),
          ]);
        });
        skyArr.map(item => {
          this.skyDataList.push([
            item.fcstTime.toString(),
            parseInt(item.fcstValue),
          ]);
        });
        temperatureArr.map(item => {
          this.temperatureDataList.push([
            item.fcstTime.toString(),
            parseInt(item.fcstValue),
          ]);
        });

        this.isFetchingHumi = false;
        this.isFetchingRain = false;
      }
    } catch (e) {
      console.log(e);
    }
  };

  @action setWeatherData = weatherData => {
    this.weatherData = weatherData;
  };

  convert = (xx, yy) => {
    console.log('[SEO] [CONVERT] ', xx, yy);
    var RE = 6371.00877; // 지구 반경(km)
    var GRID = 5.0; // 격자 간격(km)
    var SLAT1 = 30.0; // 투영 위도1(degree)

    var SLAT2 = 60.0; // 투영 위도2(degree)
    var OLON = 126.0; // 기준점 경도(degree)
    var OLAT = 38.0; // 기준점 위도(degree)
    var XO = 43; // 기준점 X좌표(GRID)
    var YO = 136; // 기1준점 Y좌표(GRID)

    // LCC DFS 좌표변환 ( code :
    //          "toXY"(위경도->좌표, v1:위도, v2:경도),
    //          "toLL"(좌표->위경도,v1:x, v2:y) )
    //
    function dfs_xy_conv(code, v1, v2) {
      var DEGRAD = Math.PI / 180.0;
      var RADDEG = 180.0 / Math.PI;

      var re = RE / GRID;
      var slat1 = SLAT1 * DEGRAD;
      var slat2 = SLAT2 * DEGRAD;
      var olon = OLON * DEGRAD;
      var olat = OLAT * DEGRAD;

      var sn =
        Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
        Math.tan(Math.PI * 0.25 + slat1 * 0.5);
      sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
      var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
      sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
      var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
      ro = (re * sf) / Math.pow(ro, sn);
      var rs = {};
      if (code == 'toXY') {
        rs['lat'] = v1;
        rs['lng'] = v2;
        var ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
        ra = (re * sf) / Math.pow(ra, sn);
        var theta = v2 * DEGRAD - olon;
        if (theta > Math.PI) theta -= 2.0 * Math.PI;
        if (theta < -Math.PI) theta += 2.0 * Math.PI;
        theta *= sn;
        rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
        rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
      } else {
        rs['x'] = v1;
        rs['y'] = v2;
        var xn = v1 - XO;
        var yn = ro - v2 + YO;
        ra = Math.sqrt(xn * xn + yn * yn);
        if (sn < 0.0) {
          ra = -ra;
        }
        var alat = Math.pow((re * sf) / ra, 1.0 / sn);
        alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

        if (Math.abs(xn) <= 0.0) {
          theta = 0.0;
        } else {
          if (Math.abs(yn) <= 0.0) {
            theta = Math.PI * 0.5;
            if (xn < 0.0) {
              theta = -theta;
            }
          } else theta = Math.atan2(xn, yn);
        }
        var alon = theta / sn + olon;
        rs['lat'] = alat * RADDEG;
        rs['lng'] = alon * RADDEG;
      }
      return rs;
    }

    var rs = dfs_xy_conv('toXY', xx, yy);
    console.log(rs);

    return rs;
  };
}
