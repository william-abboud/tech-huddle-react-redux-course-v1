import React, { Component } from 'react';
import Post from './Post';
import { string, object } from 'prop-types';
import { connect } from 'react-redux';

class PostList extends Component {
  constructor(props) {
    super(props);

    this.addPost = this.addPost.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      text: "",
      user: ""
    };
  }

  addPost(e) {
    e.preventDefault();

    this.props.addPostToState({
      user: this.state.user,
      text: this.state.text,
      id: 88
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.id]: target.value
    });
  }

  componentDidMount() {
    this.setState({ theme: this.context.theme });
  }

  render() {
    const { user, text, theme} = this.state;

    return (
      <div className={`${theme} post-list`}>
        { this.props.posts.map(post => <Post {...post} key={post.text} />) }

        <form onSubmit={this.addPost}>
          <input type="text" id="text" onChange={this.handleChange} value={text} />
          <input type="text" id="user" onChange={this.handleChange} value={user} />
          <button>Add Post</button>
        </form>
      </div>
    );
  }
}

PostList.contextTypes = {
  theme: string,
  store: object,
};

function mapStateToProps({ posts }) {
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return {
    addPostToState: post => {
      const addPostAction = {
        type: "ADD_POST",
        post
      };

      dispatch(addPostAction);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
