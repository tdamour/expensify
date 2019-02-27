import React from 'react'; 
import { connect } from 'react-redux'; 
import ExpenseForm from './ExpenseForm'; 
import { editExpense, removeExpense } from '../actions/expenses'; 


export class EditExpensePage extends React.Component{
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense); 
    this.props.history.push('/'); 
    console.log('updated', expense); 
  };
  onRemove = () => {
      this.props.removeExpense({ id: this.props.expense.id }); 
      this.props.history.push('/')
    }; 

    render(){
      return(
        <div>
         <ExpenseForm
         expense={this.props.expense}
          onSubmit={this.onSubmit}
         />
         <button onClick={this.onRemove}>Remove</button>
        </div>
      ); 
    }
}; 

// const EditExpensePage = (props) => {
  
 
// }

/* 
  Searching for the expenses array for an expense whose ID matches this prop match up params ID. 

  to access, thru the second argument in mapStateToProps function in props.

  So we can take some of the current props we passed into the high component and we can use 
  them to calculate the props that we want to add on so react router renders our higher order component
  The higher order component passes the props through and it also allows us to add on some 
  new ones right. 

  array.find allows us to search through an array 
  looking for a single item. 
  We determine whether or not we found the correct item by returning true from the callback.

*/ 
const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: (data) => dispatch(removeExpense(data))
}); 

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage); 