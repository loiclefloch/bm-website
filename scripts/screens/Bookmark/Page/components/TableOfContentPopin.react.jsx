var React = require('react');

var TableOfContent = require('./TableOfContent.react.jsx');

var TableOfContentPopin = React.createClass({

  propTypes: {
    bookmark: React.PropTypes.any.isRequired
  },

  render: function () {

    var toc = (<TableOfContent html={this.props.bookmark.content} items="h1, h2"/>);

    return (
      <div className="modal fade" tabIndex="-1" role="dialog" id="toc_modal">
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

module.exports = TableOfContentPopin;