import { API_KEY } from "./config.js";




// 서치 api 넘겨주기

export const searchBooks = async (keyword) => {

   let url = `https://dapi.kakao.com/v3/search/book?query=${keyword}`;
  
    const response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${API_KEY}`
      }
    });
  
    const data = await response.json();
    return data;
    
  };


