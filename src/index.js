function createStore(reducer) {
  let state;

  function dispatch(action) {
    state = reducer(state, action);
    render();
  }

  function getState() {
    return state;
  }

  return {
    dispatch,
    getState
  }
}

function candyReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_CANDY':
      return [...state, action.candy];
    default:
      return state;
  }
}

function render() {
  let container = document.getElementById('container');

  if(store.getState()) {
    container.textContent = store.getState().join(' ')
  } else {
    throw new Error("the store's state has not been defined yet")
  }
};

let form = document.getElementById('candy');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  store.dispatch({type: 'ADD_CANDY', candy: e.target.firstElementChild.value});
  form.reset();
})

let store = createStore(candyReducer);
store.dispatch({type: '@@INIT'});
