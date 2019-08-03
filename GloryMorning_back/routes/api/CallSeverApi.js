module.exports = function (callee) {
    function CallSeverApi(callee) {
        //console.log(callee)
        var OPTIONS = {
            url: null,
            qs: null,
            method: "GET",
            timeout: 10000, 
            followRedirect: true, 
            maxRedirects: 10
        };
        const PORT = '3500';
        const BASE_PATH = '/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?';
        const BASE_PATH_SHORT_TERM = '/service/SecndSrtpdFrcstInfoService2/ForecastTimeData?';
        const BASE_PATH_GET_DUST_INFO = '/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?'
        const BASE_PATH_NEAR_STATION = '/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?'
        var HOST = null;
        (function () {
            switch (callee) {
                case 'weather':
                    HOST = 'http://newsky2.kma.go.kr';
                    break;
                case 'dust':
                    HOST = 'http://openapi.airkorea.or.kr';
                    break;
                case 'prod':
                    HOST = 'https://prod-api.com';
                    break;
                case 'another':
                    HOST = 'http://localhost';
                    break;
                default:
                    HOST = 'http://localhost';
            }
        })(callee);
        return {
            //?base_date=20190619&base_time=0630&nx=60&ny=125&_type=json
            weather : function (base_date, base_time, nx, ny, type, shortTermYn, callback) {
                const request =  require('request')
                const querystring = require('querystring')
                if( shortTermYn ){
                    OPTIONS.url = HOST + BASE_PATH_SHORT_TERM;
                }else{
                    OPTIONS.url = HOST + BASE_PATH;
                }
               
                //서비스 키에 요상한 값이 있어서 계속 안됌 그래서 그냥 붙히는 걸로 함 ^^;
                //공개 위험
               let serviceKey = 'ns4Rq1qCb0Ha1vAp30y5ScWW0l%2FBjb3VC1sCe%2B2rPqpxvqBWeHMyKjft7yDnxUsPAqQtf4eeYsMicQc90PAFLg%3D%3D' + '&'
            
               let propertiesObject = querystring.stringify({
                    "base_date": base_date,
                    "base_time": base_time,
                    "nx" : nx,
                    "ny" : ny,
                    "numOfRows" : 175,
                    "_type" : type
                })
                OPTIONS.url += 'ServiceKey='+ serviceKey
                OPTIONS.url += propertiesObject 
                console.log(OPTIONS)
  
                request(OPTIONS, function (err, res, result) {
                   statusCodeErrorHandler(res.statusCode, callback, result);
                });
            },
            getDustNearStation :  async(tmX, tmY) =>{
                const request =  require('request')
                const querystring = require('querystring')
                OPTIONS.url = HOST + BASE_PATH_NEAR_STATION;
                //서비스 키에 요상한 값이 있어서 계속 안됌 그래서 그냥 붙히는 걸로 함 ^^;
                //공개 위험
               let serviceKey = 'ns4Rq1qCb0Ha1vAp30y5ScWW0l%2FBjb3VC1sCe%2B2rPqpxvqBWeHMyKjft7yDnxUsPAqQtf4eeYsMicQc90PAFLg%3D%3D' + '&'
            
               let propertiesObject = querystring.stringify({
                    "tmX" : tmX,
                    "tmY" : tmY,
                    "_returnType" : 'json'
                })
                OPTIONS.url += 'ServiceKey='+ serviceKey
                OPTIONS.url += propertiesObject 
                //console.log(OPTIONS)

                let response;

                //async를 위해 request 함수 선언 
                function doRequest() {
                    return new Promise(function (resolve, reject) {
                        request(OPTIONS, (err, res, result) => {
                             response =  statusCodeErrorHandlerAsync(res.statusCode, result);
                             if(response.message  !== 'error'){
                                 resolve(response)
                             }
                             else{
                                reject(err);
                             }
                             //console.log(response)
                        });
                    });
                }

                let res = await doRequest();
                //console.log("response " , res)
                return res
            },

         
          
            getDustInfo :  async(stationName) => {
                const request =  require('request')
                const querystring = require('querystring')
                OPTIONS.url = HOST + BASE_PATH_GET_DUST_INFO;
                //서비스 키에 요상한 값이 있어서 계속 안됌 그래서 그냥 붙히는 걸로 함 ^^;
                //공개 위험
               let serviceKey = 'ns4Rq1qCb0Ha1vAp30y5ScWW0l%2FBjb3VC1sCe%2B2rPqpxvqBWeHMyKjft7yDnxUsPAqQtf4eeYsMicQc90PAFLg%3D%3D' + '&'
              
               console.log("stationName", stationName)
               let propertiesObject = querystring.stringify({
                    "stationName" : stationName,
                    "dataTerm" : "DAILY",
                    "pageNo" : 1,
                    "numOfRows" : 1,
                    "ver" : 1.3,
                    "_returnType" : 'json'
                })
              
         
                propertiesObject = querystring.unescape(propertiesObject);
                OPTIONS.url += propertiesObject 
                OPTIONS.url = encodeURI(OPTIONS.url); 
                //console.log(OPTIONS)
                OPTIONS.url += '&ServiceKey='+ serviceKey

                //console.log( OPTIONS.url)
            
                //async를 위해 request 함수 선언 
                function doRequest() {
                    return new Promise(function (resolve, reject) {
                        request(OPTIONS, (err, res, result) => {
                            
                             response =  statusCodeErrorHandlerAsync(res.statusCode, result);
                             if(response.message  !== 'error'){
                                 resolve(response)
                             }
                             else{
                                reject(err);
                             }
                             //console.log(response)
                        });
                    });
                }

                let res = await doRequest();
                return res;
            }
        };
    }
    function statusCodeErrorHandler(statusCode, callback , data) {
        try{
            switch (statusCode) {
                case 200:
                    callback(null, JSON.parse(data));
                    break;
                default:
                    callback('error', JSON.parse(data));
                    break;
            }
        }catch(e){
            console.log(e)
        }
    }
     statusCodeErrorHandlerAsync = (statusCode , data)=> {
        try{
            switch (statusCode) {
                case 200:
                    return  { message : null,  data : JSON.parse(data) }
                default:
                    return  { message : 'error', data : JSON.parse(data) } 
             
            }
        }catch(e){
            console.log(e)
        }
    }

    var INSTANCE;
    if (INSTANCE === undefined) {
        INSTANCE = new CallSeverApi(callee);
    }
    return INSTANCE;
};