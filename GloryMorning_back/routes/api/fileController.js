const multer = require("multer");
const path = require("path");
let fs = require('fs');
let express = require('express');
let router = express.Router();
const userRedis = require('../../model/redis/redisDao');


/* bus 에 있는 백그라운드랑 겹쳐서 일단 주석 처리함  */
// router.post('/getBackgroundImageUrl', async (req, res) => {
//     // const images = [
//     //     'https://cdn.pixabay.com/photo/2016/11/29/12/41/desk-1869579_960_720.jpg',
//     //     'https://cdn.pixabay.com/photo/2015/10/12/14/59/milky-way-984050_960_720.jpg',
//     //     'https://cdn.pixabay.com/photo/2015/12/30/05/43/a-total-solar-eclipse-1113799_960_720.jpg',
//     //     'https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_960_720.jpg',
//     //     'https://cdn.pixabay.com/photo/2016/01/19/17/47/mountain-1149897_960_720.jpg',
//     //     'https://cdn.pixabay.com/photo/2013/02/21/19/10/sea-84629_960_720.jpg',

//     // ]  

//     // let random = Math.round( Math.random() * images.length) ;
//     // console.log(random)
//     let userId = 'testUser'
//     let backgroundURL = await userRedis.getUserBackGround({
//       userId: userId,
//     });

//     try{
//         res.json({
//             message: 'success',
//             backgroundURL: backgroundURL,
//         })
//     }
//     catch(e){
//         res.json(e);
//     }
  
// });


// 이미지파일 호스팅 로직 
router.get('/image/:name',function (req,res){     
    var filename = req.params.name;
    console.log("filename" , pathDir + filename)
    fs.exists( pathDir + filename, function (exists) {
        if (exists) {
            fs.readFile(pathDir + filename, function (err,data){
                res.end(data);
            });
        } else {
            res.end('file is not exists');
        }
    })
});

module.exports = router;