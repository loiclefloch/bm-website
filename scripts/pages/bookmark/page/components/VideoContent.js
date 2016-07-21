import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

// -- utils
import PlayerUtils from 'utils/PlayerUtils';

// -- entities
import Bookmark from 'entities/Bookmark';
import YoutubePlayer from 'components/player/YoutubePlayer';

// -- views
// import FontAwesome from 'react-fontawesome';

export default class VideoContent extends Component {

  static propTypes = {
    bookmark: PropTypes.objectOf(Bookmark).isRequired
  };

  get bookmark():Bookmark {
    return this.props.bookmark;
  }

  render() {
    if (this.bookmark.isYouTubeVideo()) {
      const videoId = PlayerUtils.getYouTubeIdWithUrl(this.bookmark.url);

      if (!_.isNull(videoId)) {
        return (
          <div className="youtube_video_player">
            <YoutubePlayer
              videoId={videoId}
              playbackState={YoutubePlayer.State.UNSTARTED}
            />
          </div>
        );
      }
    }

    // empty
    return (
      <div className="not_supported_video_player"></div>
    );
  }
}
