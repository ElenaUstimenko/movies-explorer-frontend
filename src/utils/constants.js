export const MOVIES_API_SETTINGS = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const MAIN_API_SETTINGS = {
  baseUrl: "https://api.diplommovies.nomoredomainsmonster.ru",
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
};

export const SHORT_MOVIE_MINUTES = 40;

export const DESKTOP = 12;
export const TABLET = 12;
export const SMALLTABLET = 8;
export const MOBILE = 5;

export const DESKTOP_ADD = 4;
export const TABLET_ADD = 3;
export const MOBILE_ADD = 2;

export const isDesktopMin = 1237;
export const isTabletMin = 970;
export const isTabletMax = 1236;
export const isSmallTabletMin = 729;
export const isSmallTabletMax = 969;
export const isMobileMin = 320;
export const isMobileMax = 728;