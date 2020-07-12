export const article = (state = null, action) => {
  // State must not be modified directly, create new object instead. 
  switch (action.type) {
    case 'SET_ARTICLE':
      return action.article;
    case 'REMOVE_ARTICLE':
      return null;
    default:
      return state;
  }
}