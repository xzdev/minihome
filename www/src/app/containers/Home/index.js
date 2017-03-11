import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectBlogs } from '../appSelectors';
import Blog from '../../components/Blog';

const BLOG_PAGE_SIZE = 50;

class View extends Component {

  static propTypes = {
    appBootup: PropTypes.func.isRequired,
    blogs: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.appBootup({
      pageIndex: 0,
    });
  }

  renderBlogs() {
    const { blogsMap, total } = this.props.blogs;
    const pageBlogs = [];
    for (let i = 0; i < BLOG_PAGE_SIZE; i += 1) {
      const blog = blogsMap[i];
      if (blog) {
        pageBlogs.push(blog);
      }
    }

    return (
      <div>
        {
          pageBlogs.map(blog => (
            <Blog blog={blog} />
          ))
        }
        <div>{total}</div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>Blogs</div>
        { this.renderBlogs() }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  blogs: selectBlogs,
});

function mapDispatchToProps(dispatch) {
  return {
    appBootup: (options) => { dispatch({ type: 'APPLICATION_BOOT_REQUESTED', payload: options }); },
  };
}

const HomeView = connect(mapStateToProps, mapDispatchToProps)(View);

export default HomeView;
