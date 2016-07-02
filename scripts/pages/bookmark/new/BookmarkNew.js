import React, { PropTypes } from 'react';

// -- constants
import Events from 'constants/Events';

// -- utils
import Constraint from 'utils/Constraint';

// -- stores
import SessionStore from 'stores/SessionStore';
import BookmarkStore from 'stores/BookmarkStore';

// -- actions
import BookmarkAction from 'actions/BookmarkAction';
import RouteAction from 'actions/RouteAction';

// -- views
import showdown from 'showdown';
import AbstractComponent from 'abstracts/AbstractComponent';

export default class BookmarkNew extends AbstractComponent {

//  mixins: [LoadingMixin, ErrorMixin],

  state = {
    canSubmit: false
  };

  componentDidMount() {
    if (!SessionStore.isLoggedIn()) {
      RouteAction.redirect('login');
    }
    BookmarkStore.addListener(Events.CHANGE, this.onChange);
    BookmarkStore.addListener(Events.LOADING, this.hideLoading);
  }

  componentWillUnmount() {
    BookmarkStore.removeListener(Events.CHANGE, this.onChange);
    BookmarkStore.removeListener(Events.LOADING, this.hideLoading);
  }

  onChange = ()=> {
    this.handleError(BookmarkStore.getErrors());
    return true
  };

  onNotesChange = ()=> {
    const notes = this.refs.notes.value;
    console.log(notes);
    const converter = new showdown.Converter();
    this.state.preview_html = converter.makeHtml(notes);
    console.log(this.state.preview_html);
    this.forceUpdate();
  };

  onSubmit = (e) => {
    e.preventDefault();

    const name = this.refs.name.value;
    let url = this.refs.url.value;
    const notes = this.refs.notes.value;
    const tags = [];

    // add prefix to url
    if (url.indexOf('http') === -1) {
      url = "http://" + url;
    }

    if (Constraint.isEmpty(url) || !Constraint.isUrl(url)) {
      this.handleError('Please enter an url', {
        // options
        'timeout': 3 // seconds before hide the error
      });
    }
    else {
      this.displayLoading();
      BookmarkAction.createBookmark(name, url, tags, notes);
    }
  };

  render() {
    return (
      <div>
        {this.renderLoading()}
        {this.renderErrorView()}

        <div className="page-header">
          <h1>Create bookmark</h1>
        </div>

        <div className="row">
          <form onSubmit={this.onSubmit} className="new_bookmark form row" noValidate>

            <div className="col-xs-12 row">

              <div className="new_bookmark__url form-group col-sm-12 col-md-6">
                <input type="text"
                       className="form-control"
                       placeholder="Url" name="url" ref="url" required />
              </div>

              <div className="new_bookmark__name form-group col-sm-12 col-md-6">
                <input type="text" className="form-control" placeholder="Name" name="name"
                       ref="name" />
              </div>

              <div className="new_bookmark__notes form-group col-sm-12 col-md-6">
                <textarea className="form-control" onChange={this.onNotesChange}
                          placeholder="Notes" name="notes" ref="notes" />
              </div>

              <div className="new_bookmark__preview col-sm-hidden col-md-6">
                <div dangerouslySetInnerHTML={{__html: this.state.preview_html}}></div>
              </div>
            </div>

            <div
              className="new_bookmark__submit col-xs-12 col-md-6 col-md-offset-3 top-buffer-30 text-center">
              <button type="submit" className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    );

  }

}
