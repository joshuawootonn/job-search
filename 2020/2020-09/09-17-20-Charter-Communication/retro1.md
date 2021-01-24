# Retro

## Scope

Global Scope: The area outside of all the functions. Things defined here can be accessed at any other level of the scope

Local Scope: Encapsulates functional and block scope. Variables defined within a function can only be accessed there, and are said to be local to the function.

Functional Scope: Scope within a function. Var defines variables at the function level

Block Scope: Scope in an if, switch, for, while. Generally anything inside a curly brackets. Introduced in ES6+ with Let and Const. These keywords can be used to declare things at block scope.

Lexical Scope: this mean children scopes have access to parent scope

## Var, Let, Const

* Var you can reassign, functionally scoped, you can reference before declaration 
* Let you can reassign, block scoped, you can't reference before declaration
* Const you can't reassign, block scoped, you can't reference before declaration

## == vs ===

* == is called Abstract Equality Comparison
  * compares after converting to the common type
* === is called Strict Equality Comparison
  * compare values without type comversion

## Closure

A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).

### Application

The process of applying a function to its arguments in order to produce a return value

### Partial Application

The process of applying a function to some of its arguments. The partiallly applied function get returned for later use. Partial application fixes (partially applies the function to) one or more arguments inside the returned function, and the returned function take the remaining parameters as arguments in order to complete the function application

Is a technique of fixing a number of arguments to a function, producing another function of smaller arguments i.e binding values to one or more of those arguments as the chain of function progressed.

```js
function addition(x, y) {
   return x + y;
}
const plus5 = addition.bind(null, 5)
plus5(10) // output -> 15
```

### Curry

A function that takes a function with multiple parameters as input and returns a function with exactly one parameter

```js
function curry(f) { // curry(f) does the currying transform
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```


### Virtual DOM 

As an example, let’s say that you have a list that contains ten items. You check off the first item. Most JavaScript frameworks would rebuild the entire list. That’s ten times more work than necessary! Only one item changed, but the remaining nine get rebuilt exactly how they were before.

Rebuilding a list is no big deal to a web browser, but modern websites can use huge amounts of DOM manipulation. Inefficient updating has become a serious problem.

To address this problem, the people at React popularized something called the virtual DOM.

In React, for every DOM object, there is a corresponding “virtual DOM object.” A virtual DOM object is a representation of a DOM object, like a lightweight copy.

A virtual DOM object has the same properties as a real DOM object, but it lacks the real thing’s power to directly change what’s on the screen.

Manipulating the DOM is slow. Manipulating the virtual DOM is much faster, because nothing gets drawn onscreen. Think of manipulating the virtual DOM as editing a blueprint, as opposed to moving rooms in an actual house.

When you render a JSX element, every single virtual DOM object gets updated.

This sounds incredibly inefficient, but the cost is insignificant because the virtual DOM can update so quickly.

Once the virtual DOM has updated, then React compares the virtual DOM with a virtual DOM snapshot that was taken right before the update.

By comparing the new virtual DOM with a pre-update version, React figures out exactly which virtual DOM objects have changed. This process is called “diffing.”

Once React knows which virtual DOM objects have changed, then React updates those objects, and only those objects, on the real DOM. In our example from earlier, React would be smart enough to rebuild your one checked-off list-item, and leave the rest of your list alone.

In summary, here’s what happens when you try to update the DOM in React:

* The entire virtual DOM gets updated.
* The virtual DOM gets compared to what it looked like before you updated it. * React figures out which objects have changed.
* The changed objects, and the changed objects only, get updated on the real DOM.
* Changes on the real DOM cause the screen to change.