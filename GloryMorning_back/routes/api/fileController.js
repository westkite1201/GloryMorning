const multer = require("multer");
const path = require("path");
let fs = require('fs');
let express = require('express');
let router = express.Router();



//https://velopert.com/wp-content/uploads/2019/04/New-Project-950x500.png
//https://images.velog.io/post-images/velopert/71fe4960-6919-11e9-b78e-1d53f38537b8/New-Project.png
//이름 별로 들어가는 듯 

var storage = multer.diskStorage({
      // 서버에 저장할 폴더
      destination: function (req, file, cb) { //storage  생성
        //console.log('destination', req)
        cb(null, "public/images")
      },
      // 서버에 저장할 파일 명
      filename: function (req, file, cb) {
        //console.log(file , req)
        file.uploadedFile = {
          name: file.originalname.split('.')[0],
          ext: file.mimetype.split('/')[1]
        };
        cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
      }
});

var upload = multer(
    {
        storage: storage,
    }
).single('upload')

// app.post('/upload', upload.single('userfile'), function(req, res){
//     res.send('Uploaded! : '+req.file); // object를 리턴함
//     console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
//   });


router.post('/upload', function (req, res) {
    console.log(req.header)
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        console.log(err)
      // A Multer error occurred when uploading.
    } else if (err) {
        console.log(err)
      // An unknown error occurred when uploading.
    }
    return res.send('success')
    // Everything went fine.
  })
})


const pathDir = "C:/react/myGitRepos/oneDropInk/seo_back/public/images/"
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