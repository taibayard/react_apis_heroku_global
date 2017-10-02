
## Introducing `fetch()`

So... we know what an API is. Now what?

How can we use an API to dynamically manipulate the DOM with the given data? We can use `fetch()`.

In the past, these have been called **AJAX** requests. As you'll come to learn, `fetch()` allows us to build single page applications that do not require refreshes.

**AJAX**, which stands for "Asynchronous Javascript and XML," is the method through which we are able to make HTTP **requests**. The standard requests we will be making are `GET` `POST` `PUT` `PATCH` and `DELETE`.

| Type of Request | What's It Do? |
|-----------------|---------------|
| `GET`  | Read (*'give me movie names from your database'*)|
| `POST` | Create (*'here's a new movie for your database'*)|
| `PATCH` | Update (*'hey, this movie has a new title'*)) |
| `PUT` | Update (*'hey, this movie totally changed'*) |
| `DELETE` | Delete (*'that movie is so bad you should just take it out of the database'*) |

The browser packages this together using `fetch()` and sends it off to a server. The server then listens to your request and provides a **response**. It looks something like this:

![Request/Response](assets/request-response.png)

When you browse to your favorite websites, your browser is making a request and the server is providing a response. `fetch()` allows us to perform the same type of requests over a network. Imagine fetching weather information and rendering it on your website. Perhaps you want to create a real-life Pokedex? You can use `fetch()` to build these applications.

#### Taking a look at fetch in action

That was a lot! Let's take a look at `fetch()` in action.

Imagine we want to `fetch()` the number of astronauts currently aboard the International Space Station (ISS). Good thing there is an API for that, right? This API allows us get the information using the following URL:

```
http://api.open-notify.org/astros.json
```

The API provides a response that looks like the following:

```json
{
	"number": 5,
	"people": [
		{"craft": "ISS", "name": "Oleg Novitskiy"},
		{"craft": "ISS", "name": "Thomas Pesquet"},
		{"craft": "ISS", "name": "Peggy Whitson"},
		{"craft": "ISS", "name": "Fyodor Yurchikhin"},
		{"craft": "ISS", "name": "Jack Fischer"}
		],
		"message": "success"
}
```


> If you'd like, you can copy and paste the API URL into a browser to see this happen.

This particular API tells us the number of people currently in space on the ISS and their names. It also happily gives us "message: success" so we know it worked!

We can fetch this JSON easily using Javascript.

How? The skeleton code looks like this:

```js
fetch(url)
  .then(function(response) {
    // Here you get the data to modify or display as you please
    })
  })
  .catch(function(ex) {
    // If there is any error, you will catch it here
  })  
```

Or, in ES6 syntax:

```js
fetch(url)
  .then((response) => {
    // Here you get the data to modify or display as you please
    })
  })
  .catch((ex) => {
    // If there is any error, you will catch it here
  })  
```

Let's look at what we would apply this for our astronauts:


```js
let issApi = 'http://api.open-notify.org/astros.json';
fetch(issApi)
  .then((response) => {
    return response.json()
  }).then((json) => {
    console.log('JSON from the ISS', json)
  }).catch((ex) => {
    console.log('An error occured while parsing!', ex)
  })
```

Let's break this API call down into a few steps.

* `let issApi = 'http://api.open-notify.org/astros.json'`:
First, we define our API URL to fetch from

* `fetch(issApi)`: We call fetch on that API URL.

* `.then((response) => {
	return response.json()`: We take the response when the server provides it. We return the `response.json()`

* `.then((json) => {
	console.log('JSON from the ISS', json)`: We take that `json` and `console.log` it.

* `catch((ex)`: If an error occurs, we catch it and log it.

That's as simple as fetch is. While there are other ways to handle the response (such as `html` or `blob`), this approach makes writing requests to APIs and other network calls in Javascript easy.

> *Production Warning!* It is important to note that while this is an ES6 standard, [some browsers such as Internet Explorer](http://caniuse.com/#search=fetch) do not support it; yet Edge does. You may need a polyfill for live projects. If you need a polyfill for a production project, [Github's polyfill is very popular](https://github.com/github/fetch).
