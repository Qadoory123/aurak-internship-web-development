# JavaScript Learning Notes

## let / const vs var
`let` and `const` provide block scope, making code safer and easier to manage than `var`, which has function scope. `const` is used for values that do not change, while `let` is used for variables that may be reassigned.

Example:
```javascript
const name = "Abdalqader";
let age = 21;
```

## Arrow Functions
Arrow functions provide a shorter syntax for writing functions.

Example:
```javascript
const greet = () => {
    console.log("Hello");
};
```

## Array Methods

### map()
Creates a new array by transforming each element.

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
```

### filter()
Creates a new array containing elements that meet a condition.

```javascript
const numbers = [1, 2, 3, 4];
const even = numbers.filter(num => num % 2 === 0);
```

### reduce()
Reduces an array to a single value.

```javascript
const numbers = [1, 2, 3];
const sum = numbers.reduce((total, num) => total + num, 0);
```

### forEach()
Executes a function once for each array element.

```javascript
const fruits = ["Apple", "Banana"];
fruits.forEach(fruit => console.log(fruit));
```

## Template Literals
Template literals allow variables to be embedded within strings using backticks.

Example:
```javascript
const name = "Ali";
console.log(`Hello, ${name}!`);
```

## Destructuring
Destructuring extracts values from arrays or objects into variables.

Example:
```javascript
const person = { name: "Sara", age: 20 };
const { name, age } = person;
```

## DOM Manipulation

### querySelector()
Selects the first element that matches a CSS selector.

```javascript
const button = document.querySelector("button");
```

### addEventListener()
Attaches an event handler to an element.

```javascript
button.addEventListener("click", () => {
    console.log("Clicked");
});
```

### Dynamic UI Updates
JavaScript can modify webpage content without refreshing the page.

Example:
```javascript
document.querySelector("h1").textContent = "Updated Title";
```
