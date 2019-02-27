console.log("utils.js is running"); 

export const square = (x) => x * x; 
export const add = (a,b) => a + b; 

const subtract = (a,b) => a - b; 

// setup a default export 
// there's a big difference betwen export default 

// export default cannot come before a variable declaration like const subtract 

// so just declare an export default like this...
export default subtract; 

// or this way 
// export default (a,b) => a - b; 


// you cannot have no more than one default  in an export 
//export { square, add, subtract as default }; 

// export - default export - named exports 