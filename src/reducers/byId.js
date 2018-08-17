const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.posts
    }
  }

  return state;
}

export default byId;

export const getPost = (state,id) => state[id];
