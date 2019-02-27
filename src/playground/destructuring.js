// // Object Destructuring 
// const person = {
//   name: 'Tim', 
//   age: 28, 
//   location:{
//     city: 'Williamston', 
//     temp: 50
//   }
// };

// // person is the object we are trying to 
// // destructure. 
// const {name: firstName = "Anonymous", age} = person; 
// // const name = person.name; 
// // const age = person.age; 

// console.log(`${firstName} is ${age}`); 

// //

// const {city, temp: temperature} = person.location; 

// if(city && temperature){
//   console.log(`It's ${temperature} in ${city}`); 
// }


// const book = {
//   title: 'Ego is the Enemy', 
//   author: 'Ryann Holiday', 
//   publisher: {
//     // name: 'Penguin'
//   }
// }; 

// const {name: publisherName = 'Self-Published'} = book.publisher;
// console.log(publisherName); 


// Array Destructing 

const address = ['1299 S. Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

// destruct the array 
const [, city, state = 'New York'] = address; 

console.log(`You are in ${city}, ${state}.`); 

const item = ['coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [itemName,,mediumPrice] = item; 

console.log(`A ${itemName} costs ${mediumPrice}`);
