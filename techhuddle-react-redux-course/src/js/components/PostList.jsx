import React, { Component } from 'react';
import Post from './Post';

class PostList extends Component {
  constructor(props) {
    super(props);

    this.addPost = this.addPost.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      posts: [],
      newPostText: ""
    };
  }

  addPost(e) {
    e.preventDefault();

    const addPostAction = {
      type: "ADD_POST",
      post: {
        id: 4,
        user: "petar",
        text: this.state.newPostText
      }
    };

    window.Store.dispatch(addPostAction);

    setTimeout(() => {
      window.Store.dispatch({
        type: "DELETE_POST"
      });
    }, 20000);
  }

  handleChange({ target }) {
    this.setState({
      newPostText: target.value
    });
  }

  componentDidMount() {
    window.Store.subscribe(() => {
      const newPosts = window.Store.getState().posts;

      this.setState({ posts: newPosts });
    });

    const { posts } = window.Store.getState();

    this.setState({ posts });
  }

  render() {
    return (
      <div className="post-list">
        { this.state.posts.map(post => <Post {...post} key={post.text} />) }

        <form onSubmit={this.addPost}>
          <input type="text" onChange={this.handleChange} value={this.state.newPostText} />
          <button>Add Post</button>
        </form>
      </div>
    );
  }
}

export default PostList;
