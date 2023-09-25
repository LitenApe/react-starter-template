# React Starter Template

A sane starting-point for react projects, with some minor opinions sprinkled in to help you get started with the things you care about as quickly as possible. Some nice to have features are provided to you out of the box, such as i18n, navigation and http recording, to allow for offline work.

## Features

### i18n

Internationalization is a challenging topic to tackle. Start with
too late in a project, and you are going to have a bad day refactoring
out all the hard-coded text.

To help you start working with texts, we've decided to use [i18next](https://www.i18next.com/) to handle and process texts. i18n gives us a feature rich service to manage texts and comes with the ability to manage pluralization and interpolation.

We decided to write a thin react layer around the service instead of pulling in something like `i18next-react` to give you full control over how you want to render you text. If that's not to your liking, then thats ok. Just throw the abstraction out the window and use your preferred `i18next` wrapping library. Or delete the entire `i18n` if it's a complete misfit with your preference, but if thats the case, the starting on a clean project instead of forking this one might be better.

### Navigation

For react SPA's, there are quite a few options, but none as popular as [react router dom](https://reactrouter.com/en/main). The routing library provides a great foundation, for route handling, but suffers from getting re-written as many times as it has. Namely in the feature area. That's not really a problem, though, in most cases, unless you wan't to use regular expression in your url declaration, or navigate without referring to `uri's`.

Which is why our thin addition to `react router dom` is a simple recursive search, which assists in navigating around our application through the use of `route id's`. This, in my opinion, results in a lot cleaner and better approach to navigation.

### Offline Mode

Quite commonly, we work on projects which interacts with some kind of backend, either our own or some second/third party service. The problem, however, is that our work stops whenever the backend struggles. And if you don't have any internet? Well, forget about work then...

Which is why this project comes with support for offline mode! Just start the dev server in `record` mode, and go about your day. Hit the `save` button when you are done for the day, and save the file to `fixtures/http-records.json`. The super simple server will feed you responses from those records whenever you start you application in `offline mode`!

## Styling

A classless theme has been imported, as a measure to help you get started with the things you care about quickly, however, it can be quite intrusive, depending on the work you do.

If you want to remove it, then simply removing this snippet, found in `index.html` will give you a blank canvas, which you can paint however you like.

```
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/holiday.css@0.11.2"
/>
```

## Tests

Tests are written with the help of
[vitest](https://vitest.dev/), just to keep it inside of the `vite` space. However, if you have something else you prefer, then delete all the tests and configuration found in the project. Don't let existing tests stop you from using your preferred tools.

## Scripts

### Build

```
npm run build
```

### Development

#### Normal mode

```
npm run dev
```

#### Recording mode

```
npm run dev:record
```

#### Offline mode

```
npm run dev:offline
```

### Test

```
npm run test
```
