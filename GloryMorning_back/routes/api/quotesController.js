let express = require('express');
let router = express.Router();
const QuotesDaoNew = require('../../model/mysql/QuotesDaoNew')

/* db에서 weather shortTerm data 조회  */
router.post('/getWisdomQuotes',  async(req, res) => {
    try{
      const data = {
        pageNumber :  req.body.pageNumber,
      } 
      //console.log(data)
      let rows = await QuotesDaoNew.getWisdomQuotes(data); // LOCATION 정보 XX,YY  
      
      if(rows){ //온경우
          return res.json(rows)
      }else{
        console.log('error')
      }
    }catch(e){
      console.log('error' ,e)
    }
  });



module.exports = router;