const posts = [
  {
    id: "1234",
    title: "Hating other people brings together some people",
    author: {
      id: "257",
      firstName: "Jack",
      lastName: "Donovan",
    }
  },
  {
    id: "9857",
    title: "Just hold on 'till 2020",
    author: {
      id: "908",
      firstName: "Sebastian",
      lastName: "Shaw",
    }
  },
  {
    id: "1482",
    title: "Can't wait for Infinity war !!!",
    author: {
      id: "746",
      firstName: "Elizabeth",
      lastName: "Sterling",
    }
  },
  {
    id: "9864",
    title: "Change your perspective, change your world",
    author: {
      id: "231",
      firstName: "Silvia",
      lastName: "Colova",
    }
  },
  {
    id: "6432",
    title: "All about that base",
    author: {
      id: "895",
      firstName: "Rick",
      lastName: "Morty",
    }
  },
  {
    id: "4896",
    title: "Dayum! This React $&*% is dope !",
    author: {
      id: "908",
      firstName: "Sarah",
      lastName: "O'Conner",
    }
  },
];

export function getPost(id) {
  const makePromise = postToReturn => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(postToReturn);
      }, 1000);
    });
  };

  const post = posts.find(p => p.id === id);

  if (!post) {
    return Promise.reject(new Error("Post not found"));
  }

  return makePromise(post);
}

export function getPosts() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(posts);
    }, 2000);
  });

  return promise;
}
