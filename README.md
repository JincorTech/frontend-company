# Jincor Frontend Company

[![Build Status](https://travis-ci.com/JincorTech/frontend-company.svg?token=zhVTspsPSE9j1Tuwzqe2&branch=develop)](https://travis-ci.com/JincorTech/frontend-company)

----------------------------

## Description

This frontend application can help user to solve these tasks:
  * Register new user profile
  * Watch employee profile details
  * Edit self profile details
  * Register new company
  * Watch company details
  * Edit company card if user is admin
  * Search employees by them name and email addresses
  * Invite new employees to his company
  * Accept invitations from other companies

## Build & Run

  1. Install [Git](http://git-scm.com/) and [Node](http://nodejs.org/).

  2. Open your terminal and clone `JincorTech/frontend-company` by running:
    ```
    $ git clone git@github.com:JincorTech/frontend-company.git
    ```

  3. Now go to the project's folder:
    ```
    $ cd frontend-company
    ```

  4. Install dependencies:
    ```
    $ npm install
    ```
  
  5. Start in development mode:
    ```
    $ npm start
    ```

  To build the project in production mode:
    ```
    $ npm run build
    ```

## Configuration

  To connect to the host you need to pass further NodeJS environment variables:

  API_HOST - path to the companies api host.

  API_PREFIX - api prefix for companies api (for example '/api/v1')

## Tools & libraries

  The project have these libraries as the base:

  1. [React](https://github.com/facebook/react/)
  2. [Redux](https://github.com/reactjs/redux)
  3. [React-redux](https://github.com/reactjs/react-redux)
  4. [Redux-saga](https://github.com/redux-saga/redux-saga)
  5. [react-css-modules](https://github.com/gajus/react-css-modules)
  6. [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)
  7. [i18next](https://github.com/i18next/i18next)
  8. [TypeScript](https://github.com/Microsoft/TypeScript)

## Structure

  The project's /src/ directory contains these parts:

  * /assets/ - stores static content
  * /components/ - react presentational components without logic
  * /containers/ - react container components that have a connection to the store and can dispatch actions
  * /helpers/ - helpers that can help to solve different kinds of tasks grouped by they purpose
  * /i18n/ - set up i18n configuration
  * /locales/ - static files with translations grouped by locales and sections of the application
  * /redux/ - reducers and store configuration
  * /sagas/ - redux sagas grouped by section of the store and root saga
  * /utils/ - utilities for different tasks such as creating actions, validators etc.

---------------------------

[Jincor Tech](https://github.com/JincorTech)
