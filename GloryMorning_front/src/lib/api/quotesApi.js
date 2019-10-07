import axios from 'axios';
import cilentConfig from '../../configuration/clientConfig'

export const getWisdomQuotes = (pageNum) => {
    const data = {
        pageNum : pageNum,
    }
    return (axios.post(cilentConfig.endpoint.api + "/quotes/getWisdomQuotes", data ))
  }
  