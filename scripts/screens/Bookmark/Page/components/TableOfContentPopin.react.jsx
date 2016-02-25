var React = require('react');

var TableOfContent = require('./TableOfContent.react.jsx');

var TableOfContentPopin = React.createClass({

  propTypes: {
    bookmark: React.PropTypes.any.isRequired
  },

  render: function () {

    if (!_.isEmpty(this.props.bookmark.content)) {

      var jContent = $(this.props.bookmark.content);
      var nbH1 = jContent.find('h1').length;
      var nbH2 = jContent.find('h2').length;
      var nbH3 = jContent.find('h3').length;

      console.log('TOC nb', nbH1, nbH2, nbH3);

      var levels = [];

      if (nbH1 > 1) {
        levels.push('h1');
      }

      if (nbH2 > 1) {
        levels.push('h2');
      }

      if (nbH3 > 1 && nbH3 < 30) { // 30: don't want to display to many levels. Keep it simple.
        levels.push('h3');
      }

      if (nbH1 > 1) {
        levels.push('h1');
      }

      var toc = (<TableOfContent html={this.props.bookmark.content} items={levels}/>);
    }
    else {
      toc = (<div className="toc_popin__empty_toc"></div>);
    }

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