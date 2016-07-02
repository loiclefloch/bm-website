import React from 'react';

// -- store
import TagStore from 'stores/TagStore';
import SessionStore from 'stores/SessionStore';

// -- utils
import ViewUtils from 'utils/ViewUtils';

// -- constants
import Events from 'constants/Events';

// -- actions
import TagAction from 'actions/TagAction';
import RouteAction from 'actions/RouteAction';

// -- entities
import TagsList from 'entities/TagsList';

// -- views
import AbstractComponent from 'abstracts/AbstractComponent';
import LoadMore from './components/LoadMore';
import SearchBox from 'components/SearchBox';
import TagsTable from './components/TagsTable';
import NoTags from './components/NoTags';

export default class TagListPage extends AbstractComponent {

  state = {
    tagsList: TagStore.getTagsList(),

    searchQuery: ''
  };


  componentDidMount() {
    if (!SessionStore.isLoggedIn()) {
      RouteAction.redirect('login');
    }

    // Do not display the loading if we have already load the Page.
    // For example, when we came back to this page from the tag page.
    if (_.isEmpty(this.state.tags)) {
      this.showLoading();
    }


    TagStore.addListener(Events.CHANGE, this.onChange);
    TagStore.addListener(Events.LOADING, this.hideLoading);

    if (_.isEmpty(this.state.tags)) { // do not call if we came back on the page
      TagAction.loadTags();
    }

    $.material.init();
  }

  componentWillUnmount() {
    TagStore.removeErrors();
    TagStore.removeListener(Events.CHANGE, this.onChange);
    TagStore.removeListener(Events.LOADING, this.hideLoading);
  }

  onChange = () => {
    this.setState({
      tagsList: TagStore.getTagsList(),
    });
  };

  onSearchInput = (searchQuery) => {
    this.setState({
      searchQuery
    });
  };

  render() {
    let tagTable = (<div className="tags__loading"></div>);
    let tags = [];

    if (_.isNull(this.state.tagsList)) {
      return this.renderOnLoadingContent();
    }

    if (_.isEmpty(this.state.searchQuery)) {
      console.log(this.state);
      tags = this.state.tagsList.tags;
    }
    else {
      // Use searchQuery Page
      _.each(this.state.tagsList.tags, (tag) => {
        if (ViewUtils.searchStringOn(this.state.searchQuery, tag.name)) {
          tags.push(tag);
        }
      });

    }

    const tagsList:TagsList = new TagsList();
    tagsList.tags = tags;

    if (!_.isEmpty(tags)) {
      tagTable = (
        <TagsTable
          tagsList={tagsList}
        />
      );
    }
    else if (_.isEmpty(tags) && this.state.loading == false) {
      tagTable = (<NoTags />);
    }

    console.log('tags', tags);

    return (
      <div id="tags-list">
        {this.renderErrorView()}
        {this.renderLoading()}

        {/*
         <Fab />
         */}
        <div className="row">

          <div className="col-sm-12 col-md-9 col-md-offset-2">

            <SearchBox
              search={this.state.searchQuery}
              onSearchInput={this.onSearchInput}
            />

            <div className="top-buffer-50"></div>

            {tagTable}

          </div>

        </div>

        <div className="top-buffer-50"></div>

      </div>
    );

  }
}
