 // app.js is just bootstrapping code that lives else where 
 // BrowserRouter to create a new router 
 // Route to create a route for every single page. 
 // provide things to route like the path we want to match for and waht we want to do when the user visits that path. 
 import React from 'react';
 import ReactDOM from 'react-dom';
 // Provider is going to allow us to provide the store to all of the components 
 // that make up our application. 
 // it means we do not need to pass the store around, Instead indivdual components that want to access the store can just access it. 
 import { Provider } from 'react-redux';
 import AppRouter from './routers/AppRouter';
 import configureStore from './store/configureStore'; 
 import { addExpense } from './actions/expenses'; 
 import { setTextFilter } from './actions/filters'; 
 import getVisibleExpenses from './selectors/expenses'; 
 import 'normalize.css/normalize.css'; 
 import './styles/styles.scss';
 import 'react-dates/lib/css/_datepicker.css'; 



const store = configureStore(); 

store.dispatch(addExpense({description: 'Water bill', amount: 4500})); 
store.dispatch(addExpense({description: 'Gas bill', createdAt: 1000})); 
store.dispatch(addExpense({description: 'Rent', amount: 109500})); 
// store.dispatch(setTextFilter('water')); 

// setTimeout(() => {
//   store.dispatch(setTextFilter('bill')); 
// }, 3000); 

const state = store.getState(); 
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters); 

console.log(visibleExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouter /> 
  </Provider> 
); 
ReactDOM.render(jsx, document.getElementById('app'));