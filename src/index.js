'use strict';


var api = require('./api');

var accounts = require('./resources/accounts');
var streams = require('./resources/streams');
var messages = require('./resources/messages');
var queues = require('./resources/queues');
var events = require('./resources/events');
var users = require('./resources/users');
var emojis = require('./resources/emojis');
var typing = require('./resources/typing');
var reactions = require('./resources/reactions');
var server = require('./resources/server');
var filters = require('./resources/filters');
var upload = require('./resources/upload');

function getCallEndpoint(config) {
  return function callEndpoint(endpoint) {
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
    var params = arguments[2];

    var myConfig = Object.assign({}, config);
    var finalendpoint = endpoint;
    if (!endpoint.startsWith('/')) {
      finalendpoint = '/' + endpoint; // eslint-disable-line
    }
    var url = myConfig.apiURL + finalendpoint;
    return api(url, myConfig, method, params);
  };
}

function resources(config) {
  return {
    config: config,
    callEndpoint: getCallEndpoint(config),
    accounts: accounts(config),
    streams: streams(config),
    messages: messages(config),
    queues: queues(config),
    events: events(config),
    users: users(config),
    emojis: emojis(config),
    typing: typing(config),
    reactions: reactions(config),
    server: server(config),
    filters: filters(config),
    upload: upload(config),
  };
}

function zulip(initialConfig) {
  
  var config = initialConfig;
  if (config.realm.endsWith('/api')) {
    config.apiURL = config.realm + '/v1';
  } else {
    config.apiURL = config.realm + '/api/v1';
  }

  if (!config.apiKey) {
    return accounts(config).retrieve().then(function (res) {
      config.apiKey = res.api_key;
      return resources(config);
    });
  }
  return Promise.resolve(resources(config));
}

module.exports = zulip;