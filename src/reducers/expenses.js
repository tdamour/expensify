// Expenses Reducers 
// combineReducers lets you combine multiple reducers to create a single store that allows to break up the application into multiple smaller reducers as opposed to one huge reducers. 
// combineReducers also takes an argument, this is an object and on this object we're going to provide those key value pairs. 
// the key is going to be the root state name and the value is going to be the reducer that's supposed to managed that. 
const expenseReducerDefaultState = []; 

export default (state=expenseReducerDefaultState, action) => {
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
