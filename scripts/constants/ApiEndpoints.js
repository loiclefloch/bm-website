import Config from './Config';

const ApiEndpoints = {
  LOGIN: Config.SERVER_URL + '/oauth/v2/token',

  BOOKMARKS: Config.API_URL + '/api/bookmarks',

  TAGS: Config.API_URL + '/api/tags',

  SEARCH_BOOKMARKS: Config.API_URL + '/api/search/bookmarks',

  DATA: Config.API_URL + '/api/data'
};

export default ApiEndpoints;
