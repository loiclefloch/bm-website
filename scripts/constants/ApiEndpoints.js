import Config from './Config';

const ApiEndpoints = {
  LOGIN: Config.SERVER_URL + '/oauth/v2/token',

  BOOKMARKS: Config.API_URL + '/bookmarks',

  TAGS: Config.API_URL + '/tags',

  SEARCH_BOOKMARKS: Config.API_URL + '/search/bookmarks',

  DATA: Config.API_URL + '/data'
};

export default ApiEndpoints;
