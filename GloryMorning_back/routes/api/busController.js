var express = require('express');
var router = express.Router();

let arr =[1,1];
router.post('/get_data', async (req, res) => {
  try {

      var x = (new Date()).getTime(), // current time
          y = Math.random()+10;
          console.log(x,y)
          

    return res.json([x,y]);
  }
  catch (error) {
    console.error(error);
    return res.json({
      message: 'fail',
      code: 200,
      error: error
    });
  }
})

router.post('/get_server_time', async (req, res) => {
    try {
      const moment = require('moment-timezone');
      const now = moment();
  
      const server_time = now.tz("Asia/Seoul").format('YYYY-MM-DD');
  
      return res.json(server_time);
    }
    catch (error) {
      console.error(error);
      return res.json({
        message: 'fail',
        code: 200,
        error: error
      });
    }
  })

//   router.post('/get_system_date_and_min_date', async (req, res) => {
//     try {
//       async.waterfall(
//         [
//           (cb) => {
//             contentDao.connect(cb);
//           },
//           (conn, cb) => {
//             contentDao.getSystemDateAndMinDate(conn, cb);
//           }
//         ],
//         (error, conn, result) => {
  
//           if( conn ){
//             contentDao.release(conn);
//           }
//           if( error ){
//             return res.json({
//               error: error
//             });
//           }
//           else{
//             return res.json(result);
//           }
//         }
//       )
//     }
//     catch (error) {
//       console.error(error);
//       return res.json({
//         message: 'fail',
//         code: 200,
//         error: error
//       });
//     }
//   })
module.exports = router;
