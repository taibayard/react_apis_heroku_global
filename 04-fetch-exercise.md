
## Codealong!

It is time for you to build a very simple component that shows a randomly generated Shakespeare poem. We'll do this using the [Shake it Speare API](http://ShakeItSpeare.com/api/poem). Before doing so, challenge yourself to a mini quiz.

<details>
  <summary><strong>Q: Which React.Component method should API calls be made from?</strong></summary>
  <br />
  <p>
    <code>componentDidMount()</code>. Per the <a href="https://facebook.github.io/react/docs/react-component.html#componentdidmount">React documentation</a>, <em>If you need to load data from a remote endpoint, this is a good place to instantiate the network request.</em>
  </p>
</details>

<details>
  <summary><strong>Q: What does it mean to make <code>GET</code> request?</strong></summary>
  <br />
  <p>We are asking the server to send us data to read. To <code>GET</code> means to "read."</p>
</details>

## Fetching Shakespeare in a React Component

Let's go back to your blog project (so make sure it's running!).

Let's use the `fetch()` API directly inside of a React Component to render a poem. We'll be using the `Home` component, so open `Home.js` to edit.

The official [React documentation](https://facebook.github.io/react/docs/react-component.html#componentdidmount) tells developers that any network requests should be placed inside of the _componentDidMount_ method.
* Start by changing the `Home` component to have an empty `componentDidMount()` method.
* Set the stage for returning a poem in the `div` by changing the text to be an `<h1>` with the text "My favorite Shakespeare poem:"

```js
import React, {Component} from 'react';

class Home extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  	/* nothing here... yet! */
  }

  render() {
    return (
      <div>
        <h1>My favorite Shakespeare poem:</h1>
      </div>
    )
  }
}


export default Home
```

We can now tell our component to fetch a Shakespeare poem and then set it to our state. We do this by adding the `fetch()` call inside of _componentDidMount()_.

Calling _setState_ then triggers a re-_render_ inside of our component.

**Important:**
The value of the `this` keyword in JavaScript changes depending on what function is being executed. Its relative value depends on the function that contains it.
- The `fetch()` call involves many callbacks with several different functions. In order to preserve the initial context of our React component, we need to create a new variable, `base`, to keep track of the original value of the `this` keyword. Saving the original value of `this` to `base` allows us to access methods like `this.setState()` through `base.setState()` throughout all of the different functions.
- Also important: This variable can be called anything at all; we're just calling it base here. The important bit is just to save `this` to `base`.

So we will:

* Fill in the `componentDidMount` method with calling the API
* Save the poem in a state called `poem`
* Render the poem!

You should have this:

```js
import React, {Component} from 'react';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shakeSpeare: ""
    }
  }

  componentDidMount() {
    // save a reference to `this` because the value of `this` will change
    // inside the different callback functions.
    var base = this

    // fetch a poem
    let poemApi = 'http://ShakeItSpeare.com/api/poem';
    fetch(poemApi)
      .then((response) => {
        return response.json()
      }).then((json) => {
          base.setState({ shakeSpeare: json.poem });
      }).catch((ex) => {
        console.log('An error occured while parsing!', ex)
      })
  }

  render() {
    let poetry = this.state.shakeSpeare;
    return (
      <div>
        <h1>My favorite Shakespeare poem:</h1>
        {poetry}
      </div>
     )
  }
}
```

You can test it out at this point - it works!

But just in case, let's add a quick check.
* Add an `if` statement under `render`.
  * This simply checks to be sure that `fetch()` has completed before `render()` tries to return the movie - otherwise it returns "Loading...".
  * For this especially, it's important that the state is declared in the constructor. This way, the `if` statement does not fail if the `fetch()` hasn't created the state yet.

```js

render() {
  	 let poetry = this.state.shakeSpeare;
     if (this.state.shakeSpeare){
       return (
         <div>
           <h1>My favorite Shakespeare poem:</h1>
           {poetry}
         </div>
       )
     }
     return (
       <div>
         <h1>My favorite Shakespeare poem:</h1>
         Loading...
       </div>
     )
  }
```

You're done! Your `home` page should load a random Shakespeare poem!
