var React = require('react');

/**
 * Display a block with inner html.
 * Use react dangerouslySetInnerHTML or jquery.
 * Use jquery to remove error "Uncaught Invariant Violation: Danger: Expected
 * markup to render 14 nodes, but rendered 2."
 * See http://stackoverflow.com/questions/26689900/react-js-invariant-violation-processupdates-when-rendering-a-table-with-a-di
 * "Every table needs a <tbody> element. If it doesn't exist, the browser will
 * add it. However, React doesn't work if the DOM is manipulated from the outside"
 * So we add the html content with jquery manually on componentDidUpdate because
 * we don't need react on it, and it fix the problem.
 */
var HtmlBlock = React.createClass({

  propTypes: {
    content: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    withReact: React.PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      withReact: false,
    };
  },

  componentDidUpdate: function() {
    if (this.props.withReact == false) {
      $('.html_block').find('.' + this.props.id).html(this.props.content);
    }
  },

  render: function() {
    if (this.props.withReact == false) {
      return (
        <div className="html_block">
          <div className={this.props.id}></div>
        </div>
      )
    }
    return (
      <div className="html_block">
        <div dangerouslySetInnerHTML={{__html: this.props.content}}></div>
      </div>
    )
  }
});

module.exports = HtmlBlock;
