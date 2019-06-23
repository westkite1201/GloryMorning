module.exports = function (callee) {
    function CallSeverApi(callee) {
        console.log(callee)
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
        var HOST = null;
        (function () {
            switch (callee) {
                case 'weather':
                    HOST = 'http://newsky2.kma.go.kr';
                    break;
                case 'dev':
                    HOST = 'https://dev-api.com';
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
            weather : function (base_date, base_time, nx, ny, type, callback) {
                const request =  require('request')
                const querystring = require('querystring')
                OPTIONS.url = HOST + BASE_PATH;
                //서비스 키에 요상한 값이 있어서 계속 안됌 그래서 그냥 붙히는 걸로 함 ^^;
               let serviceKey = 'ns4Rq1qCb0Ha1vAp30y5ScWW0l%2FBjb3VC1sCe%2B2rPqpxvqBWeHMyKjft7yDnxUsPAqQtf4eeYsMicQc90PAFLg%3D%3D' + '&'
            
               let propertiesObject = querystring.stringify({
                    "base_date": base_date,
                    "base_time": base_time,
                    "nx" : nx,
                    "ny" : ny,
                    "numOfRows" : 80,
                    "_type" : type
                })
                OPTIONS.url += 'ServiceKey='+ serviceKey
                OPTIONS.url += propertiesObject 
                console.log(OPTIONS)
  
                request(OPTIONS, function (err, res, result) {
                   statusCodeErrorHandler(res.statusCode, callback, result);
                });
            }
        };
    }
    function statusCodeErrorHandler(statusCode, callback , data) {
        switch (statusCode) {
            case 200:
                callback(null, JSON.parse(data));
                break;
            default:
                callback('error', JSON.parse(data));
                break;
        }
    }
    var INSTANCE;
    if (INSTANCE === undefined) {
        INSTANCE = new CallSeverApi(callee);
    }
    return INSTANCE;
};