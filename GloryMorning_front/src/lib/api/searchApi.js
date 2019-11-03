import axios from 'axios';
import cilentConfig from '../../configuration/clientConfig'

export const searchAddress = (query) => {
  const data = {
    params: { // query string
        query : query
    },
    headers: { // 요청 헤더
      'Authorization': cilentConfig.apiKeys.kakaoApiKey
    },
    timeout: 3000 // 3초 이내에 응답이 오지 않으면 에러로 간주
  }
  return axios.get('https://dapi.kakao.com/v2/local/search/address.json?',data)
}


