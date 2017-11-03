# Continuing the Film Project

You should already have the application from previously. If not, fork and clone the [react-film repo](../../../react-film/).

If you didn't follow along from the previous assignment, you can jump ahead to today's starter code by switching to the `3-unidirectional-flow` branch.

You can run your app with `npm install && npm run start`.

## Your Mission

Finally, we need to show the details of each movie by getting this information from TMDB. We also want to refactor our React app to make it as clean as possible.

![](assets/bladerunner.png)

### Task 1: Adding the API call

API calls are no different in React than in regular JavaScript. In this case, however, rather than using jQuery to make an AJAX call, we will be using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) provided by modern browsers.

We already have a function for handling the API call (`handleDetailsClick`), so this task will work inside that function. We've set up the rest of our app correctly.

#### Step 1: Set up the API key

This step seems complicated, but it isn't! Just take it one step at a time. Because TMDB isn't a public API, you'll need to get an API key to add to your `fetch()` call; then, you'll want to make sure to keep the key in a safe spot.

- To gain access to the TMDB API, you'll need to get an API key from [](https://www.themoviedb.org).
  - To get that you'll have to sign up first (it's free). However, it will ask for your phone and address.
  - Then, request one on your profile page ([further instructions](https://developers.themoviedb.org/3/getting-started)).
  - Once you've got your API key, we need to include it in our app. Since we **never want to store app secrets in our repository**, we'll use the [`dotenv`](https://github.com/motdotla/dotenv) package to keep the API key in a local file.

You'll need to install `dotenv`.

1. Run `npm install --save dotenv` on the command line to add the dependency to your `package.json` file
2. Create a new file at the root of your project called `.env.local` (accept the system warning).
3. In your `.env.local` file, add the line `REACT_APP_TMDB_API_KEY=<Your TMDB API v3 KEY>`

The `.env.local` file is in your `.gitignore` by default when you create an app with `create-react-app`, so now your secret will never leak into your repository. It's important to note that since this is a front-end application, the built JS will contain the key, which means end-users will be able to see it, but that's fine for this practice app you'll only be running locally.

- Finally, add the following to the top of your `TMDB.js` file:

```
import dotenv from 'dotenv';

dotenv.config();
```

And replace `'<REPLACE_THIS_WITH_TMDB_API_KEY>'` with `process.env.REACT_APP_TMDB_API_KEY`. Your secrets are now set up!

#### Step 2: Make a `const` called `url` with the API's URL

Let's go back to using the API.

In your `App.js` `handleDetailsClick` method, add the following `const` right above your `setState`:

```JavaScript
const url = `https://api.themoviedb.org/3/movie/${film.id}?api_key=${TMDB.api_key}&append_to_response=videos,images&language=en`
```

This is the URL to which we'll send our request to get detailed information about each film. We pass the `film.id` and the `TMDB.api_key` as query string parameters.

**Note**: Using `${film.id}` is the same as stopping the string, using ` + film.id + ` and then starting the string again - it's a slightly faster shorthand for embedding variables in strings.

#### Step 3: Make the API call


Now that you have the API key and URL set up, underneath the new URL variable, fetch the API.

```JavaScript
const url = `https://api.themoviedb.org/3/movie/${film.id}?api_key=${TMDB.api_key}&append_to_response=videos,images&language=en`

fetch(url).then(response => {
  response.json().then(data => {
    console.log(data) // take a look at what we get back!
  })
})
```

Try clicking a movie row in your browser - the data for it should appear in the console.

#### Step 4: Set the state when the API call completes

Let's now set our `current` state to be the object we get back from TMDB. Move the `setState` call into the API call.

```JavaScript
response.json().then(data => {
  console.log(data)
  this.setState({current: data})
})
```

Now, we have the API call to get information about our chosen movie.

### Task 2: Refactoring our app

Before we continue to display the movie details to the user, let's clean up our application.

Let's refactor any components that only have a `render()` method into functional components. Functional components are simpler and will gain performance benefits in future versions of React. It is considered good practice to use them wherever possible.

#### Step 1: Refactor `FilmPoster.js`

1. Replace the `class`/`extends` definition with a `function`. Remember that your function should accept a `props` argument.
2. Remove the `render()` method, keeping only the `return` function.
3. Replace all instances of `this.props` with simply `props`
4. Remove `{Component}` from the React `import` at the top since we no longer use it (but still import `React`).

Check in the browser to be sure the functionality hasn't changed.

#### Step 2: Refactor `FilmRow`

Follow the same steps to refactor the FilmRow component.

Check in the browser to be sure the functionality hasn't changed.

#### Step 3: Refactor `FilmDetails`

We haven't written out this component yet, but it currently only renders UI. Therefore, we can also make it a functional component.

Follow the same steps as above, and once again check in the browser for functionality.


### Task 3: Adding Film Details

We're almost finished. Now, we'll render the film details we're receiving from the API (and currently logging to the console) in the browser window for the user.

#### Step 1: Add image URLs for `FilmDetails`

Above the `return`, add the following `const` definitions for fetching backdrop and posters:

```js
const backdropUrl = `https://image.tmdb.org/t/p/w1280/${props.film.backdrop_path}`
const posterUrl = `https://image.tmdb.org/t/p/w780/${props.film.poster_path}`
```

#### Step 2: Render the empty case for `FilmDetails`

When the app loads, there is no film selected to display in `FilmDetails`. When a user clicks on a film in the `FilmListing`, we want to fetch and show the details. Thus, there are two scenarios for `FilmDetails`: the empty scenario and the populated scenario.

Let's start with the empty case. Add the following markup below the `.section-title`.

```html
<div className="film-detail">
  <p>
    <i className="material-icons">subscriptions</i>
    <span>No film selected</span>
  </p>
</div>
```

#### Step 3: Conditionally render the current film

To start, let's create a new variable to hold on to our DOM tree. We'll conditionally assign the value to this variable depending on whether or not there's a film object passed in through the props.

Add this below the two declared `const` variables

```js
let details
```

Now, we need to determine if there is a film to render or not.

To do this, we just need to check if there's an `id` property on the `film` prop passed in to `FilmDetail`.
- If not, we want to render the empty case we added in the last step.
- Otherwise, we have a film to show, so we want to present the following markup (don't copy this over yet):

```
<div className="film-detail is-hydrated">
  <figure className="film-backdrop">
    <img src={backdropUrl} alt="" />
    <h1 className="film-title">{props.film.title}</h1>
  </figure>

  <div className="film-meta">
    <h2 className="film-tagline">{props.film.tagline}</h2>
    <p className="film-detail-overview">
      <img src={posterUrl} className="film-detail-poster" alt={props.film.title} />
      {props.film.overview}
    </p>
  </div>
</div>
```

- Your task here is to conditionally assign this block of markup to the `details` variable if there is a current `id`. If there is not, render the JSX we just added above. We still want to keep our `section-title`, which isn't part of this conditional. Therefore, the `return` statement of your `FilmDetails` function should finally look like this:

```
return (
  <div className="film-details">
    <h1 className="section-title">Details</h1>
    {detail}
  </div>
)
```


## Taking it further

Here are some things you can do to deepen your knowledge and take this app further:

- Refactor `Fave` into a functional component
- Move the filters into a `FilmListingFilter` component
- Go through the React Router section on myGA and implement client-side routing
- Deploy the app to Heroku following the Heroku section on myGA
- Go through the CSS and see how the app is styled (Uses both flexbox and CSS Grid!)
- Add a textarea for a review to each film detail and save that on the film object
- Show an icon in the FilmListing for all films with reviews
- Show the fave state of a film on the FilmDetails
- Add any other features you can think of!
