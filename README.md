# URLockBox

### Testing with PhantomJS using poltergeist

The app has phantom.js, a headless webdriver installed for JS testing.

#### Setup

To set it up you will just need to run `npm install phantomjs` from within your project folder. Everything else will be installed with Bundle.

#### Use

You can then write capybara feature tests and add `js: true` tag to each test the has JavaScript.  Your tests will execute and recognize your JavaScript.

If you're having problems troubleshooting asynchronous actions (like DOM changes after an AJAX request), [peruse this section of Capybara's docs](https://github.com/teamcapybara/capybara#asynchronous-javascript-ajax-and-friends)

#### Your JavaScript

The major __GOTCHA__ here is that phantomjs doesn't recognize es6. So if you write es6 you will need to make your file extenstion `.js.es6`. You should see an example test in the `spec/features` directory.

## Getting Started

1. Clone the repository:
```shell
git clone git@github.com:turingschool-projects/briefcase.git
```
2. Bundle application
```shell
  bundle install
```

## Running the tests

The test suite is running on Poltergeist and RSpec in order test the rails backend with the client side JavaScript. Poltergeist is a driver for Capybara.

To run all tests, run in the terminal:
```shell
rspec
```

## Requirements

```
Ruby on Rails
	- Rails version 5.0.1
	- Ruby version 2.3.0 (2.3.1 should also work)
	- Bundled with 1.13.6
PostgreSQL
```
If you don't have rails (or ruby) installed, this [tutorial](http://docs.railsbridge.org/intro-to-rails/) is a good place to start.


## Author

[Nicholas Martinez](https://github.com/NZenitram/mod4-final)

## API EndPoint

```shell
/api/v1/links
```

Returns an object of the Hot Sauce.
