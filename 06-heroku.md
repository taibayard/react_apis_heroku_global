# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Heroku


### Learning Objectives
*After this lesson, you will be able to:*
- Describe Heroku
- Deploy an app on Heroku
- Set up a CORS proxy on Heroku

# Deploying a React App

You've been running everything on localhost, which is great for testing - but what if you want to show off what you've done?

Let's learn an easy way to deploy a React app. We can use something called **Heroku** to deploy a React application to the internet in less than five minutes. Heroku is incredibly popular among web developers and provides five free applications to every user.

> Before moving forward, it is _strongly_ suggested that you have a working knowledge of Git. Read the [Git basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics) guide or [try Git](https://try.github.io/levels/1/challenges/1) if you have **no experience** with Git before moving forward.


## What is Heroku?

Heroku is a cloud platform that allows developers to quickly deploy applications to the internet.
- Note for your future use; they don't need to be React applications. Heroku supports Node.js, Ruby, Java, php, and many other things. You can read about it [here](https://devcenter.heroku.com/).

Before we dive in, register a free account at [heroku.com](https://heroku.com). Once you register, confirm your account, and sign back in, you will be re-directed to the Heroku dashboard at [https://dashboard.heroku.com/apps](https://dashboard.heroku.com/apps). You can view all of your applications on the dashboard once they are deployed.


## Heroku Command Line Interface

Before we go further, make sure you stop any currently running React apps.

Now let's download and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). You can download the installer from the link provided or run `brew install heroku` in your terminal application.
- This tool is designed to make your life easier as a developer by integrating Heroku application development and deployment directly into the command line.

> _Note_: Just in case, you may need to restart your terminal session before moving forward. Why? Because you've just installed software to modify your terminal's environment, and your environment variables may not be updated yet.


Now, you should login to **Heroku** using the command line. Do so by typing in `heroku login`. You'll be prompted with the following questions followed by an authentication message:

```bash
Enter your Heroku credentials.
Email: adam@example.com
Password (typing will be hidden):
Authentication successful.
```

### Heroku App

You can deploy an existing app with Heroku, but for the sake of completion, we're going to go start to finish. Like you have been, use the `create-react-app` command in your terminal to create an app - name it whatever you want! Then, as usual, change directory into the app's directory.

```bash
create-react-app your_app_name_here
cd $your_app_name_here
```

Now, we need to initialize a Git repository inside of our React application. The Heroku CLI requires Git to handle versioning for deployment.

```
git init
```

Next, we'll create a Heroku application using something called the *create-react-app-buildpack*.
- This step isn't skippable! A buildpack is a set of scripts that Heroku will use to read your React.js code and rebuild it to be hosted on the web.

```sh
heroku create your_app_name_here --buildpack https://github.com/mars/create-react-app-buildpack.git
```

You'll see Heroku output something similar to the following:

```sh
Creating app... done, ⬢ your_app_name_here
Setting buildpack to https://github.com/mars/create-react-app-buildpack.git... done
https://your_app_name_here.herokuapp.com/ | https://git.heroku.com/your_app_name_here.git
```

Now, we need to add all of the files and changes that we may have added.
- In theory, we'll have actually built an application. For our purposes, we are going to use what has been provided with `create-react-app`. We'll use git to add _all_ of the files and commit our changes.

```sh
git add -A
git commit -m "My first React app on Heroku! wow!"
```

Finally, we can push our app to the Heroku. By doing this, Heroku will put your app together on the internet.

```
git push heroku master
```

After seeing lots of command line wizardry happen before your eyes, you should see Heroku print out a URL to the console. Copy and paste that URL into your browser, or type `heroku open`. Either way, you will be taken to your React application.

Congrats - you've now deployed your React app! Good job.

## Deploying your Project Live

Now that you have seen how to deploy your application live, it is time for you to push your project live. Since you have created an application already using `create-react-app`, you can skip that step. Before pushing live, you'll need to make a few minor adjustments to make everything look great.

#### Routing clean URLs with React Router

By default, [React Router](https://github.com/reactjs/react-router) (not included) uses hash-based URLs like `https://example.com/index.html#/users/me/edit`. This is nice & easy when getting started with local development, but for a public app you probably want real URLs like `https://example.com/users/me/edit`.

Create a `static.json` file to configure the web server for clean [`browserHistory` URLs with React Router](https://github.com/mars/create-react-app-buildpack#routing-clean-urls):

```json
{
  "root": "build/",
  "clean_urls": false,
  "routes": {
    "/**": "index.html"
  }
}
```

#### Getting around CORS with Heroku Proxy

**What's a CORS Proxy?**

A CORS proxy is a service that allows developers (probably you) to access resources from other websites without having to own that website.

Maybe you want to embed an image of a cat that you found on `https://acatwebsite.com/` (note: this URL is just an example). However, maybe the owners of that website want to make sure that their cat images can **only** be gotten to by a browser, not (for example) a JavaScript POST call.
- Limiting who can access your web server is important in web security - otherwise, someone could (for example) write code that runs on `https://acatwebsite.com/` and changes all the content to be able dogs.

[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) stands for "Cross-Origin Resource Sharing". CORS is a web standard that websites use to make sure that things accessing them (like you trying to get a cat picture) are safe.

When you try to go to a website where only one side is using CORS on the backend, you'll get an error saying that you aren't allowed to access the resource.
- But if `https://acatwebsite.com/` is using CORS and you aren't, how are you supposed to get that cat image?

With a CORS proxy, you don't have to know anything about setting up CORS (unless you're interested in researching yourself!); it takes care of this for you. You just need the proxy, and then you can embed all the cat pictures you want.

You can do this by setting up a proxy using Heroku. We'll do that now.

Configure using [Proxy Backends from the static site buildpack](https://github.com/heroku/heroku-buildpack-static/blob/master/README.md#proxy-backends).

* Add `"proxies"` to `static.json`:

```json
{
  "proxies": {
    "/api/": {
      "origin": "${API_URL}"
    }
  }
}
```

Then, point the React UI app to a specific backend API using the CLI:

```bash
heroku config:set API_URL="https://api.example.com"
```

## Exercise

Deploy your blog project live to Heroku. Do so by:

1. Initializing a Heroku app in your project's directory.
2. Use Git to add and commit your changes.
3. Push your changes to Heroku using `git push heroku master`.
4. View your project live online using `heroku open`.


## Further Considerations

* Companies like General Assembly using PaaS solutions to deploy quickly. In fact, GA uses Heroku for their web front end.
* Why might this be awesome? What advantages do you see to using PaaS vs building your own virtual servers?
* Who might you trust with all of your secret data, keys, and environment variables? Co-workers? Friends? Your grandma?

#### Documentation

- https://blog.heroku.com/deploying-react-with-zero-configuration#new-zero-configuration-experience
- https://github.com/facebookincubator/create-react-app
- https://github.com/mars/create-react-app-buildpack#quick-start
