# Star Wars Quiz

A React project integrating the [Star Wars API](https://swapi.co/).

## Features
- Randomly generated quiz
  * questions from querying the SWAPI API

- Responsive interface

- Accessible interface, incl. keyboard navigation

- Dark Side Mode / Light Side Mode

### Libraries
- Client Bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

- Server borrowed some elements from Microsoft's [Typescript Node Starter](https://github.com/microsoft/TypeScript-Node-Starter)

- [TypeScript](https://www.typescriptlang.org/docs/home.html) typings throughout

- [React Hooks](https://reactjs.org/docs/hooks-reference.html) store / state management

- Modular [Styled-Components](https://www.styled-components.com/)

- [Jest](https://jestjs.io/) tests (client side only)

### Later
- Simple DB to store people for faster querying and no issue swith swapi limits

- Leaderboard of best quiz takers set up on remote server and database

- Different route for quiz, settings, leaderboard

- Server tests

- Nodemon on server

## Quick Start
You'll need two terminal windows to run this.

### From this project root dir:

Server:

`npm run buildAndStart:server`

The server must be built / compiled before serving.

Client:

`npm run buildAndStart:client`

Building the client is not absolutely necessary before starting.

### OR
Enter each directory to interact with the scripts listed in both the server and client's READMEs.

Tests can be run inside the client directory.
