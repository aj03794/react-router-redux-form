import React, {Component} from 'react';
import {connect} from 'react-redux';
// Link is very similar to the anchor (a) tag
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {fetchPosts} from '../actions/index';

class PostsIndex extends Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <Link className="btn" to={`/posts/${post.id}`}>
          <li className="list-group-item" key={post.id}>
            {post.title}
          </li>
        </Link>
      )
    })
  }

 // If you inspect that link tag, it will be an anchor tag
  render() {
    console.log(this.props.posts)
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add A Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {posts: state.posts};
}

// fetchPosts is an action
// PostsIndex is this class

export default connect(mapStateToProps, {fetchPosts})(PostsIndex);
