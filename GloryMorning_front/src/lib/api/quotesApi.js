import axios from 'axios';
import cilentConfig from '../../configuration/clientConfig'

export const getWisdomQuotes = (pageNumber) => {
    const data = {
        pageNumber : pageNumber,
    }
    return (axios.post(cilentConfig.endpoint.api + "/quotes/getWisdomQuotes", data ))
}

export const setWisdomQuotes = (quotes, author) => {
    const data = {
        quotes : quotes,
        author : author,
    }
    return (axios.post(cilentConfig.endpoint.api + "/quotes/setWisdomQuotes", data ))
}

export const updateWisdomQuotes = (quotesNum ,quotes, author) => {
    const data = {
        quotesNum : quotesNum,
        quotes : quotes,
        author : author,
    }
    return (axios.post(cilentConfig.endpoint.api + "/quotes/updateWisdomQuotes", data ))
    
}
export const deleteWisdomQuotes = (quotesNum) => {
    console.log("[SEO] deleteWisdomQuotes ", quotesNum)
    const data = {
        quotesNum : quotesNum,
    }
    return (axios.post(cilentConfig.endpoint.api + "/quotes/deleteWisdomQuotes", data ))
}
