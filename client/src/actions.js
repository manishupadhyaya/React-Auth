const actions = store => ({
    changeUser: state => ({ isAuthenticated: !state.isAuthenticated })
  });
  
  export default actions;