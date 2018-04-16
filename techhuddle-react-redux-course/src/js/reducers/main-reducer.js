function postsReducer(oldState = [], action) {
  if (action.type === "ADD_POST") {
    return [action.post, ...oldState];
  }

  if (action.type === "EDIT_POST") {
    const postToEdit = oldState.find(p => p.id === action.post.id);
    const newPost = Object.assign({}, postToEdit, {
      text: action.post.text
    });
    const postsNotChanged = oldState.filter(p => p.id !== action.post.id);

    return [...postsNotChanged, newPost];
  }

  return oldState;
}

function userReducer(oldState = {}, action) {
  if (action.type === "LOAD_USER_DETAILS") {
    return actions.user;
  }

  return oldState;
}

const mainState = {
  posts: postsReducer,
  loggedInUser: userReducer
};

export default mainState;
