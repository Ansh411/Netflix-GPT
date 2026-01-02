export const LOGO = "https://i.ibb.co/wZ6b2Yqd/Netflix-GPT.png";

export const BANNER_IMG = "https://assets.nflxext.com/ffe/siteui/vlv3/c81956f1-5750-454c-9b3c-7a4d990d3d06/web/IN-en-20251208-TRIFECTA-perspective_d69f5f82-9a35-45d7-a7b6-9af6e0643bf5_large.jpg";

export const API_OPTIONS = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_API_KEY
  }
};

export const PLAY = "https://i.ibb.co/G484tVf9/play-1.png";
//  "https://i.ibb.co/RTdDXkqC/play.png";

export const INFO = "https://i.ibb.co/BHVCQ5jy/info-1.png";
//  "https://i.ibb.co/GfzFwhry/info-2.png";

export const SEARCH_GPT = "https://i.ibb.co/J8ZR35C/magnifying-glass-1.png";

export const SEARCH = "https://i.ibb.co/snkcpkF/interface.png";

export const MOVIE = "https://i.ibb.co/WvM5m45x/Movie.png";
// https://i.ibb.co/rRR7hbHm/cinema.png

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";


export const SUPPORTED_LANGUAGES = [
  {identifier: "en", name: "English"},
  {identifier: "hi", name: "Hindi"},
  {identifier: "es", name: "Spanish"},
  {identifier: "fr", name: "French"},
  {identifier: "ar", name: "Arabic"},
  {identifier: "ja", name: "Japanese"},
];