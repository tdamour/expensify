import {createStore} from 'redux'; 
// Action Generators - functions that return action objects 

const incrementCount = ({incrementBy = 1} = {}) => ({
  type: 'INCREMENT', 
  // incrementBy: incrementBy
  incrementBy
}); 

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
}); 

const resetCount = () => ({
  type: 'RESET'
}); 

const setCount = ({count}) => ({
  type: 'SET', 
  count
});

// Reducers 
// They specify how the application changes in response to the actions taken. 
// 1. Reducers are pure functions
// pure functions: the output is only determined by the input. 
// in this case this function's output what it returns is only determined by the things that get passed in, so the state and the action. 
// it doesn't use anything else from outside of the function scope and it doesn't change anything outside of the function scope either. 
// 2. Never change state or action. 
// we get state and action passed to our reducers 
// we don't want to directly change these things so I don't want to assign a value to state or action if they are objects
// I don't want to mutate them instead we should just be reading off of both of those things. 
// Returning an object that represents the new state. 

const countReducer = (state = {count: 0}, action) => {

  switch(action.type){
    
    case 'INCREMENT':
    // check if you count by the incrementBy prop of the action or default by 1 
    // const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1; 
    return{
      count: state.count + action.incrementBy
    }; 
    case 'DECREMENT': 
    // const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1; 
    return{
      count: state.count - action.decrementBy
    }; 
    case 'SET':
    return{
      count: action.count
    }; 
    case 'RESET':
    return{
      count: 0
    }; 
    default: 
    return state; 
  }
}

// const add = ({a,b}, c)=>{
//   return a + b + c; 
// }; 

// console.log(add({a: 1, b:12}, 100)); 

// state is the current state and it's very similar to how our calls to this data set state worked. 
// set a default state inside the ()
// second param is the action 
// we can combine the current action with the state to figure out what the new state should be. 

const store = createStore(countReducer); 

// subscribe
// store.subscribe gets called 
// that's a function, we passed a single function to it 
// and this function gets called every single time the store changes 

const unsubscribe = store.subscribe(() => {
  // get the store state 
  console.log(store.getState()); 
}); 



// Actions - nothing more than an object that gets sent to the store. 
// I'd like to increment the count
// dispatch actually allows us to send off an action object 
// and then the store can do something with this information. 
// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5
// }); 

// stops from subscribing afterwards 
// unsubscribe(); 

// store.dispatch({
//   type: 'INCREMENT'
// }); 

store.dispatch(incrementCount({incrementBy: 5})); 

store.dispatch(incrementCount()); 

// Reset 
store.dispatch(resetCount()); 

// decrement
store.dispatch(decrementCount());

store.dispatch(decrementCount({decrementBy: 10}));
// I'd like to reset the count to zero


// we can also just create actions that have required types by just using them directly as opposed to checking if they exist 
store.dispatch(setCount({count: 101}));