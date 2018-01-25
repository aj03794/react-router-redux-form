import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions';
import {Link} from 'react-router-dom';

class PostsShow extends Component {

  componentDidMount() {
    if (!this.props.post){
    // This is provided by react router
    // params lists all the different wildcard tokens that exist
    // inside of the URL, in our case we only have id
    const {id} = this.props.match.params
    this.props.fetchPost(id);
    }
  }

  onDeleteClick() {
    const {id} = this.props.match.params
    this.props.deletePost(id, () => {
      // Programmatic navigation back to the root url (home page)
      this.props.history.push('/');
    });
  }

  render() {

    const {post} = this.props

    if(!post) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        > Delete Post </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}

// called ownProps by convention
// this.props === ownProps
// Not uncommon to have your mapStateToProps in other file
// this makes this component not have the dependency on getting the whole list of posts
function mapStateToProps({posts}, ownProps) {
  return {post: posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow)
