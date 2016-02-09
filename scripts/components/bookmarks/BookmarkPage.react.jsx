var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var BookmarkStore = require('../../stores/BookmarkStore.react.jsx');
var Events = require('../../utils/Events.js');
var BookmarkActionCreators = require('../../actions/BookmarkActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var State = require('react-router').State;
var moment = require('moment');
var BookmarkUtils = require('../../utils/BookmarkUtils.js');
var showdown = require('showdown');
var _ = require('lodash');
var Loading = require('../common/Loading.react.jsx');

var BookmarkPage = React.createClass({

  mixins: [State],

  getInitialState: function () {
    return {
      bookmark: BookmarkStore.getBookmark(),
      errors: [],
      loading: true
    };
  },

  componentDidMount: function () {

    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('login');
    }

    BookmarkStore.addListener(Events.CHANGE, this._onChange);
    BookmarkStore.addListener(Events.LOADING, this._onLoadingEnd);
    BookmarkActionCreators.loadBookmark(this.getParams().bookmarkId);
  },

  componentWillUnmount: function () {
    BookmarkStore.removeListener(Events.CHANGE, this._onChange);
    BookmarkStore.removeListener(Events.LOADING, this._onLoadingEnd);
    BookmarkStore.clearBookmark();
  },

  displayLoading: function () {
    this.setState({
      loading: true
    });
  },

  _onChange: function () {
    this.setState({
      bookmark: BookmarkStore.getBookmark(),
      errors: BookmarkStore.getErrors()
    });
  },

  _onLoadingEnd: function () {
    this.setState({
      loading: false
    });
  },

  _deleteBookmark: function (e) {
    e.preventDefault();
    var bookmark = this.state.bookmark;
    var self = this;
    bootbox.confirm("Are you sure you want to remove the bookmark " + bookmark.name + " ?", function (result) {
      if (result == true) {
        self.displayLoading();
        WebAPIUtils.deleteBookmark(bookmark.id);
      }
    });

  },

  render: function () {

    var bookmark = this.state.bookmark;

    var converter = new showdown.Converter();
    var html = converter.makeHtml(bookmark.notes);

    return (
      <div id="bookmark" className="row">
        <Loading display={this.state.loading}/>

        <BookmarkFloatMenu bookmark={bookmark}/>

        <div className="col-xs-12">
          <div className="bookmark__page_header">
            <h1 className="bookmark__title">{BookmarkUtils.getDefaultName(bookmark)}</h1>
          </div>

          <div className="bookmark__action_bar row">
            <a href="#" onClick={this._deleteBookmark}>Delete</a>
          </div>
        </div>

        <div className="col-xs-12">

          { bookmark.description &&
          <div>
            <hr />
            <p>{bookmark.description}</p>
          </div>}

          <div className="top-buffer-30">
            <TagList tags={bookmark.tags}/>
          </div>

          <div className="top-buffer-30">
            { bookmark.icon &&
            <div className="bookmark__icon"><img src={bookmark.icon}/></div>
              }
            { !bookmark.icon &&
            <div className="bookmarks__item_no_icon"></div>
              }

            <a href={bookmark.url} target="_blank">
              {BookmarkUtils.getPrettyUrl(bookmark.url)}
            </a>
          </div>

          { bookmark.notes &&
          <div>
            <hr />
            <div dangerouslySetInnerHTML={{__html: html}}></div>
          </div>}

          <hr />

        </div>

        <div className="col-xs-12">
          <BookmarkContent content={bookmark.content}/>
        </div>

        <div className="col-xs-12 top-buffer-50"></div>

        <div>
          <TableOfContentPopin bookmark={bookmark}/>
        </div>
      </div>

    );
  }

});

var BookmarkContent = React.createClass({

  render: function () {

    if (_.isEmpty(this.props.content)) {
      return (
        <div className="bookmark__content_empty"></div>
      )
    }

    return (
      <div className="bookmark__content">
        <div dangerouslySetInnerHTML={{__html: this.props.content}}></div>
      </div>
    )
  }
});

var TagList = React.createClass({

  render: function () {

    if (_.isEmpty(this.props.tags)) {
      return (
        <div className="bookmark__tag_list_empty"></div>
      )
    }

    var tags = [];
    this.props.tags.forEach(function (tag) {
      tags.push(<TagItem tag={tag}/>);
    }.bind(this));

    return (
      <div className="bookmark__tag_list">
        {tags}
      </div>
    );
  }

});


var TagItem = React.createClass({

  render: function () {
    var tag = this.props.tag;
    var style = {
      background: tag.color
    };

    return (
      <div className="bookmark__tag label" style={style}>
        {tag.name}
      </div>
    );
  }
});

var BookmarkFloatMenu = React.createClass({

  goTop: function () {
    $('html, body').animate({
      scrollTop: 0
    }, 'fast');
  },
  editNotes: function () {

  },
  displayTableOfContent: function () {
    $('#toc_modal').modal('show');
  },
  render: function () {

    var menuList = [];

    menuList.push(<li onClick={this.editNotes}>Notes</li>);

    // Only display if there is a table of content.
    if ($('h1').size() > 1 || $('h2').size() > 2) {
      menuList.push(<li onClick={this.displayTableOfContent}>Table Of Content</li>);
    }
    menuList.push(<li onClick={this.goTop}>Go top</li>);

    return (
      <div className="bookmark__float_menu hidden-sm">
        <ul>
          {menuList}
        </ul>
      </div>
    );

  }
});

var TableOfContentPopin = React.createClass({
  render: function () {

    var toc = (<TableOfContent html={this.props.bookmark.content} items="h1, h2"/>);

    return (
      <div className="modal fade" tabindex="-1" role="dialog" id="toc_modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Table Of Content</h4>
            </div>
            <div className="modal-body">
              {toc}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

/**
 * Add a table of contents
 * @param html String The html
 * @param items String The different tags to handle
 */
var TableOfContent = React.createClass({

  render: function () {
    var html = this.props.html;
    var items = this.props.items;

    var toc = [];
    var i = 0;

    if (_.isEmpty(html)) {
      return (<div className="toc__empty"></div>);
    }

    var tree = $("<div>" + html + "</div>");
    var elems = tree.find(items);

    elems.each(function () {
      var elem = $(this);
      var title = elem.text();

      var id = '';
      if (!_.isEmpty(elem.attr('id'))) {
        id = elem.attr('id');
      }
      else {
        id = elem.children().attr('id');
      }

      var link = '#' + id;

      var tocLevel = 'toc__level_';

      if (elem.is('h1')) {
        tocLevel += "h1"
      }
      else if (elem.is('h2')) {
        tocLevel += "h2"
      }
      else if (elem.is('h3')) {
        tocLevel += "h3"
      }
      else if (elem.is('h4')) {
        tocLevel += "h4"
      }

      toc.push(<TOCItem level={tocLevel} link={link} title={title}/>);
      i = i + 1
    });

    return (<div className="toc">{toc}</div>)
  }
});

var TOCItem = React.createClass({

  render: function () {
    return (
      <li className={this.props.level}>
        <a href={this.props.link}> {this.props.title} </a>
      </li>
    )
  }
});

module.exports = BookmarkPage;

