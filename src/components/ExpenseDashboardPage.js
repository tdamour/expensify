import React from 'react'; 
import ExpenseList from './ExpenseList'; 
// connects your component to the redux store
import { connect } from 'react-redux'; 
import ExpenseListFilter from './ExpenseListFilters'; 

const ExpenseDashboardPage = () => 
(
   <div>
     <ExpenseListFilter /> 
     <ExpenseList />  
   </div>
);

export default ExpenseDashboardPage; 