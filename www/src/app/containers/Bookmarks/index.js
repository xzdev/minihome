import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { selectBookmarks } from '../appSelectors';
import styles from './styles.css';

const defaultBookmarks = {
  list: {},
  since: Math.floor(new Date().getTime() / 1000),
};

const renderBookmarks = bookmarks => (
  !bookmarks.list ? [] : Object.keys(bookmarks.list).map((id) => {
    const article = bookmarks.list[id];
    const timeAdded = moment(article.time_added * 1000);
    // const timeUpdated = moment(article.time_updated * 1000);
    const url = article.resolved_url;
    const title = article.resolved_title || article.given_title;
    const excerpt = article.excerpt;
    const isArticle = article.is_article;
    const hasImages = article.has_image;
    const images = article.images;

    return (
      <div className={styles.bookmarkContainer}>
        <div className={styles.title}><a href={url}>{title}</a></div>
        { isArticle === '1' && <div className={styles.excerpt}>{excerpt}</div> }
        { hasImages !== '0' && <image src={images[0]} />}
        <div>Added {timeAdded.fromNow()}</div>
      </div>
    );
  })
);

class BookmarksView extends Component {
  componentWillMount() {
    this.props.fetchBookmarks();
  }

  render() {
    const { bookmarks = defaultBookmarks } = this.props;
    return <div>{renderBookmarks(bookmarks)}</div>;
  }
}

BookmarksView.propTypes = {
  bookmarks: PropTypes.object,
  fetchBookmarks: PropTypes.func.isRequired,
};

BookmarksView.defaultProps = {
  bookmarks: defaultBookmarks,
};

const mapStateToProps = state => ({
  bookmarks: selectBookmarks(state),
});

export default connect(mapStateToProps, dispatch => ({
  fetchBookmarks: () => dispatch({
    type: 'REQUEST_BOOKMARKS',
  }),
}))(BookmarksView);
