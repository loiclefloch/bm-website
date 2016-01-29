var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var BookmarkStore = require('../../stores/BookmarkStore.react.jsx');
var BookmarkActionCreators = require('../../actions/BookmarkActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var State = require('react-router').State;
var moment = require('moment');
var BookmarkUtils = require('../../utils/BookmarkUtils.js');
var showdown = require('showdown');

var BookmarkPage = React.createClass({

    mixins: [State],

    getInitialState: function () {
        return {
            bookmark: BookmarkStore.getBookmark(),
            errors: []
        };
    },

    componentDidMount: function () {

        if (!SessionStore.isLoggedIn()) {
            RouteActionCreators.redirect('login');
        }

        BookmarkStore.addChangeListener(this._onChange);
        BookmarkActionCreators.loadBookmark(this.getParams().bookmarkId);
    },

    componentWillUnmount: function () {
        BookmarkStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({
            bookmark: BookmarkStore.getBookmark(),
            errors: BookmarkStore.getErrors()
        });
    },

    _deleteBookmark: function (e) {
        e.preventDefault();
        bookmark = this.state.bookmark;
        bootbox.confirm("Are you sure you want to remove the bookmark " + bookmark.name + " ?", function(result) {
            if (result == true) {
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

                <div className="col-xs-12">
                    <div className="bookmark__page_header">
                        <h1 className="bookmark__title">{BookmarkUtils.getDefaultName(bookmark)}</h1>
                    </div>

                    <div className="bookmark__action_bar row">
                        <a href={bookmark.url} target="_blank">Open</a>
                        <a href="#" onClick={this._deleteBookmark}>Delete</a>
                    </div>
                </div>

                <div className="col-xs-12">

                    { bookmark.description &&
                        <div>
                            <hr />
                            <p>{bookmark.description}</p>
                        </div>
                    }

                    <div className="top-buffer-30">
                        <TagList tags={bookmark.tags}/>
                    </div>

                    <div className="top-buffer-30">
                        <a href={bookmark.url} target="_blank">
                            {BookmarkUtils.getPrettyUrl(bookmark.url)}
                        </a>
                    </div>

                    { bookmark.notes &&
                        <div>
                            <hr />
                            <div dangerouslySetInnerHTML={{__html: html}}/>
                        </div>
                    }

                    <hr />

                </div>

                <div className="col-xs-12">
                    <BookmarkContent content={bookmark.content}/>
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
                <div dangerouslySetInnerHTML={{__html: this.props.content}}/>
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
            <div className="bookmark__tag" style={style}>
                {tag.name}
            </div>
        );
    }
});


module.exports = BookmarkPage;

