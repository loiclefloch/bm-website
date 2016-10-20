import React, { PropTypes, Component } from 'react';
import showdown from 'showdown';

// -- entities
import Bookmark from 'entities/Bookmark';

export default class NotesEditor extends Component {

  static propTypes = {
    bookmark: PropTypes.objectOf(Bookmark).isRequired,

    onClose: PropTypes.func.isRequired
  };

  state = {
    notes: this.props.bookmark.notes
  }

  onNotesChange = () => {
    const notes = this.refs.notes.value;

    this.setState({
      notes
    });
  };

  get bookmark():Bookmark {
    return this.props.bookmark;
  }

  get notes() {
    return this.state.notes;
  }

  render() {
    // Convert markdown
    const converter = new showdown.Converter();
    const notesHtml = converter.makeHtml(this.notes);

    return (
      <div className="note_editor">

        <div className="col-xs-12 col-sm-12 editor_area">
          <textarea
            className="form-control editor"
            value={this.notes}
            onChange={this.onNotesChange}
            placeholder="Notes"
            name="notes"
            ref="notes"
          />
        </div>

        {/* <div className="col-xs-12 col-sm-6">
          <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: notesHtml }}
          >
          </div>
        </div>*/}
      </div>
    );
  }
}
