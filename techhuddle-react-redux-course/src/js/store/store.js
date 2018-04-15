import { createStore } from 'redux';

const mainReducer = (oldState, action) => {
  if (action.type === "ADD_POST") {
    debugger;
    return Object.assign({}, oldState, {
      posts: [action.post, ...oldState.posts]
    });
  }

  if (action.type === "EDIT_POST") {
    const postToEdit = oldState.posts.find(p => p.id === action.post.id);
    const newPost = Object.assign({}, postToEdit, {
      text: action.post.text
    });
    const postsNotChanged = oldState.posts.filter(p => p.id !== action.post.id);

    return Object.assign({}, oldState, {
      posts: [...postsNotChanged, newPost]
    });
  }

  return Object.assign({}, {
    posts: [
      { text: "Hello world !", user: "Petar", id: 0 },
      { text: "I have a complain", user: "Petar", id: 1 },
      { text: "Do not flush if the water is clear !", user: "Petar", id: 2 },
      { text: "I love cats !", user: "Petar", id: 3 },
    ]
  }, oldState);
};

const addPostAction = {
  type: "ADD_POST",
  post: {
    text: "hello pesho",
    user: "martin",
    id: 4,
  }
};

const editPostAction = {
  type: "EDIT_POST",
  post: {
    text: "bye bye 2",
    id: 2,
  }
};

const Store = createStore(mainReducer);

// Store.subscribe(() => {
//   console.log(Store.getState());
// });

// Store.dispatch(addPostAction);

// Store.dispatch(editPostAction);


export default Store;
