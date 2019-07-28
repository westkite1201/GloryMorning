const _ = require('lodash')


let countdown = 1000;
let countDownArr = [];
let IntervalArrayList = [];

let socketIdList = [] //현재 소켓 id가 속한 roomList를 반환 
let idList = [] //  id에 속한 room 리스트를 반환 
let roomList = []

setCountDown = (room, countDown) =>{
    console.log("setCountDown! " , countDownArr[room] )
    if( _.isNil(countDownArr[room])){ //없는 경우 세팅 다시 
        countDownArr[room] = countDown
    }
    console.log("countDownArr", countDownArr)
}



let count = 0;
const connection = (io) =>{
    let timeInterval = '';
    let timeNsp = io.of('/time') // timer 네임 스페이스 생성 
    // namespace /timer 에 접속한다.
    let time = timeNsp.on('connection', function(socket){
        console.log('timerSocketConnection')
        //타이머 테스트
        socket.on('time', function(data){
            timeInterval = setInterval(function() {
                let serverTime = new Date();
                let hour = serverTime.getHours();
                let minute = serverTime.getMinutes();
                let second = serverTime.getSeconds();
                let timeObj = {
                    hour : hour,
                    minute : minute,
                    second : second,
                }

                time.emit('getTime', {
                    message: 'success',
                    status : 200,
                    serverTime:  timeObj
                });
            }, 1000);

        socket.emit('timeConnection', { 
            message: 'connection success',
            status : 200
        });
            //timerStart(timer,room);
        });

        socket.on('disconnect', function(data){
            clearInterval(timeInterval);
        })

        socket.on('getTime', function(data) {
            console.log("socket.id " , socket.id)
            console.log('message from client: ', data);
            console.log(socket.room)
            //let serverTime = new date.now();
            let serverTime = new Date();
            data.serverTime = serverTime;
            console.log('data ', data )
            nsp.emit('time', data);
        });
    })
}
module.exports =  {
    connection : connection
};