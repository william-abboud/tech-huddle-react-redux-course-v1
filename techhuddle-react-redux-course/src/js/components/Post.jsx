import React, { Component } from 'react';
import Avatar from './Avatar';
import anonymous from '../../assets/images/anonymous-profile.jpg';

function Comment({ text, author }) {
  return (
    <div className="comment">
      <span>{text}</span>
    </div>
  );
}

class Post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text } = this.props;

    return (
      <div className="post">
        <Avatar firstName="John" lastName="Doe" imageSrc={anonymous} />
        <div className="details">
          <h4>{text}</h4>
          <div className="comments">
            <Comment text="That's right" />
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
