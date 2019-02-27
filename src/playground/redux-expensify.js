import {createStore, combineReducers} from 'redux'; 

import uuid from 'uuid'; 
import { userInfo } from 'os';

// Actions 
// ADD_EXPENSE
// uuid - universally unique idenifiers 
const addExpense = (
  {
    description = '', 
    note='', 
    amount=0, 
    createdAt = 0
  } = {}
  ) => ({
    type: 'ADD_EXPENSE', 
    expense: {
      id: uuid(),
      description, 
      note, 
      amount,
      createdAt
    }
}); 
// REMOVE_EXPENSE
const removeExpense = ({id}) => ({
  type:'REMOVE_EXPENSE',
  id
});
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE', 
  id,
  updates
}); 
// SET_TEXT_FILTER
const setTextFilter = (text = '') =>({
  type: 'SET_TEXT_FILTER', 
  text
}); 
// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});
// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT' 
});
// SET_START_DATE
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE', 
  startDate
});
// SET_END_DATE
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE', 
  endDate
}); 
// Expenses Reducer
// combineReducers lets you combine multiple reducers to create a single store that allows to break up the application into multiple smaller reducers as opposed to one huge reducers. 
// combineReducers also takes an argument, this is an object and on this object we're going to provide those key value pairs. 
// the key is going to be the root state name and the value is going to be the reducer that's supposed to managed that. 
const expenseReducerDefaultState = []; 

const expensesReducer = (state=expenseReducerDefaultState, action) => {
  switch(action.type){
    case 'ADD_EXPENSE': 
     return [
       ...state,
       action.expense
     ];
     case 'REMOVE_EXPENSE': 
     return state.filter(({id}) => id !== action.id); 
     case 'EDIT_EXPENSE': 
     return state.map((expense) => {
      if(expense.id === action.id)
      {
        return{
          ...expense, 
          ...action.updates
        }
      }else{
        return expense; 
      }
     });
    default: 
      return state; 
  }
};

// Filters Reducer 
const filtersReducerDefaultState = {
  text: '', 
  sortBy: 'date', 
  startDate: undefined, 
  endDate: undefined
}; 

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch(action.type){
    case 'SET_TEXT_FILTER':
    return{
      ...state,
      text: action.text
    };
    case 'SORT_BY_AMOUNT':
      return{
        ...state,
        sortBy: 'amount'
      };
      case 'SORT_BY_DATE':
      return{
        ...state,
        sortBy: 'date'
      };
      case 'SET_START_DATE':
      return {
        ...state, 
        startDate: action.startDate
      }; 
      case 'SET_END_DATE':
      return {
        ...state, 
        endDate: action.endDate
      }; 
    default: 
      return state; 
  }
}; 
// startDateMatch, endDateMatch, and textMatch
// are timestamps. 
// These timestamps are any positive or negative integer value. 
// timestamps count in milliseconds. 
// unix epoch
// Jan. 1st 1970
// 33400, 10, -203
// Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) =>{
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate; 
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate; 
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()); 

    // figure out if expenses.description has the text variable starting inside of it. 
    // includes method 
    // convert both strings to lower case. 

    return startDateMatch && endDateMatch && textMatch; 
  }).sort((a,b) => {
    if(sortBy === 'date'){
      return a.createdAt < b.createdAt ? 1 : -1; 
    }
    else if(sortBy === 'amount'){
      return a.amount < b.amount ? 1 : -1; 
    }
  }); 
}; 


// Store creation
// put array on expenses property.
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState(); 
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters); 
  console.log(visibleExpenses); 
}); 

const expenseOne = store.dispatch(addExpense({
    description: 'Rent', 
    amount: 100,
    createdAt: 1000
}));

const expenseTwo = store.dispatch(addExpense({
  description: 'Coffee', 
  amount: 300,
  createdAt: -1000
}));

// console.log(expenseOne);

// store.dispatch(removeExpense({ id: expenseOne.expense.id })); 

// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));

store.dispatch(setTextFilter('rent')); 
// store.dispatch(setTextFilter()); 

store.dispatch(sortByAmount());  
// store.dispatch(sortByDate());  

// store.dispatch(setStartDate(125)); 
// store.dispatch(setStartDate()); 
// store.dispatch(setEndDate(1250)); 



const demoState = {
  expenses: [{
    id: 'ajsfdkjl', 
    description: 'January Rent', 
    note: 'This was the final payment for that address', 
    amount: 54500,
    createdAt: 0
  }], 
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined, 
    endDate: undefined
  }
};

const user = {
  name: 'Jen', 
  age: 24
}; 

console.log({
  ...user,
  location: 'Detroit',
  age: 27
}); 