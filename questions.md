### What is the difference between Component and PureComponent? give an example where it might break my app. 

The big difference is that the PureComponent does a comparision between props and next props before re-rendering. If there are no difference it wont re-render. 

### Context + ShouldComponentUpdate might be dangerous. Can think of why is that? 

It may be dangerous, because `ShouldComponentUpdate` breaks the re-render of a Component if its props/state doesn't change. Knowing that, If a component in the tree changes a property of the context, and there is a pure component that uses another component within it that is affected by the property of the context, the pure component is not going to be re-rendered, therefore the component within it is not going to be re-rendered either.

### Describe 3 ways to pass information from a component to its PARENT. 

Passing a function that modifys any var as parameter from parent to child.
```
import React, {useState} from 'react';

const App = () => {
  const [value, setValue] = useState(false)

  const triggerValue = () => {
      setValue(!value);
  }

  console.log(value)
  return(
      <ChildComponent buttonAction={triggerValue} />
  )
}

const ChildComponent = ({buttonAction}) => {
  return(
      <button onClick={buttonAction}>
      Change value </button>
  )
}

export default App;
```

Using context.

```
import React, {createContext, useContext, useState} from 'react';

const App = () => {
  const ColorContext = createContext()
  const [color, setColor] = useState('blue')

  const ChildComponent = () => {
    const {color, setColor} = useContext(ColorContext)
    return(
      <>
        <button onClick={() => setColor(color === 'blue' ? 'red' : 'blue')}>
      changeColor </button>
      <br/>
      <span>Parent color is: {color}</span>
      </>
    )
  }

  return(
      <ColorContext.Provider value={{color, setColor}} >
        <div style={{backgroundColor: color}}>
        <ChildComponent />
        </div>
      </ColorContext.Provider>
  )
}

export default App;
```

###  Give 2 ways to prevent components from re-rendering.

Using `React.memo()`, it stores the recult of the function, and if its the same it returns a cached version of it.
```
import React, {useEffect, useState} from 'react';

const Hello = React.memo(props => {
  console.log('renders Hello')
  return(
    <span>{props.name}</span>
  )
})


function App () {
  const [example, setExample] = useState(0)

useEffect(() => {
  setInterval(() => {
    setExample(Math.random())
  }, 1000);
}, [])

return(
  <Hello name='Tomas'/>
)
}

export default App;
```

Using `ShouldComponentUpdate` the component will only re-render if the props/state changes.

```
import React, { Component } from "react";
  
class Example extends Component {
  shouldComponentUpdate(nextProps) {

    if (nextProps.value !== this.props.value) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
     ...
    );
  }
}
  
export default Example;
```


### What is a fragment and why do we need it? Give an example where it might break my app. 

As React components can only render one element, using reactt fragment you can wrap all elements without adding any parent elemtn to the dom.
For example if you have a component that returns more than one `<td>` to a table, you can't wrap them all inside a `<div> `cause it will break the table

```
import React from 'react'

const ColumnsComponent = () => {
    return(
        <>
            <td>Some Column</td>
            <td>Another column!</td>
        </>
    )
}

function App () {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <ColumnsComponent />
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default App;
```

### Give 3 examples of the HOC pattern.
Hoc Pattern is a function that recieve a Component as Parameter and returns a new Component.
Its used mostly to reutilize logic code in different components. So you dont have to repeat all the logic in every Component. 



### what's the difference in handling exceptions in promises, callbacks and async...await.
Promise exceptions are called with `.then().catch()` and async awiat  with `try() catch()`.

### How many arguments does setState take and why is it async.
SetState can recieve two arguments, the second one is a callback function to run after the state is changed. Is async because of perfomance. 

### List the steps needed to migrate a Class to Function Component.
1. Change the syntax `class App extends Component` for `function App () {}`
2. If the class has State replace them with  `useState` hook (`const [value, setValue] = useState(initialValue)`)
3. Change all calls to set, replace `this.state.???` for the new const name
4. If Class uses `componentDidMount` replace it with `useEffect` hook
5. If Class usess `componentDidUpdate` replace it using the logic of hooks.
6. If its a `PureComponent` convert it to `React.memo()`


### List a few ways styles can be used with components. 
1. Using `className` attribute and a css file.
2. creating and object with the styles in the `style` attribute. ()

### How to render an HTML string coming from the server. 
Using `dangerouslySetInnerHTML` with an object with a `__html` key.