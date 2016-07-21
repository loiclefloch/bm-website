import _ from 'lodash';

export default class PlayerUtils {

  static getYouTubeIdWithUrl(url:String):String {
    // http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
    const videoId = url.split('v=')[1];
    if (_.isUndefined(videoId)) {
      return null;
    }
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return videoId.substring(0, ampersandPosition);
    }

    return videoId;
  }

}
