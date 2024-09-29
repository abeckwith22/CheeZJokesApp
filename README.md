# CheeZJokes App

We've built an app that lets people view and vote on cheesy jokes. To generate jokes, it uses the [ICanHazDadJoke API](https://icanhazdadjoke.com/api)

- When the page loads, it displays a spinner until joke data has loaded from the API.

- The applications fetches 5 jokes, making sure that no joke appears more than once on the page. When 5 jokes have been loaded, the spinner disappears.

- The application lists the jokes, along with a "vote-up" button, a "vote-down" button, and the net score (up - down) for each joke. Users can vote, and the net score updates.

#### Todo

- [x] Right now, the application is written using class components. Refactor the app to use functional components with hooks.