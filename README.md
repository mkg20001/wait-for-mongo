wait-for-mongo
==============

Simple utility which waits until mongodb comes online

## Installation

~~~
npm install -g wait-for-mongo
~~~

## Usage

### As a Command Line tool

~~~
wait-for-mongo <mongodb url> <timeout in ms>
~~~

Or

~~~
export MONGO_URL=<mongodb url>
export TIMEOUT=<timeout in ms>
wait-for-mongo
~~~

### As a NodeJS module

~~~js
var waitForMongo = require('wait-for-mongodb');

waitForMongo("mongodb://localhost/comet", {timeout: 1000 * 60* 2}, function(err) {
  if(err) {
    console.log('timeout');
  } else {
    console.log('mongodb is online');
  }
});
~~~
