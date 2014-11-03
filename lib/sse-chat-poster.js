#!/usr/bin/env node
/*
 * sse-chat-poster
 * https://github.com/mykola/sse-chat-poster
 *
 * Copyright (c) 2014 Nickolay (mykola) Kharchevin
 * Licensed under the MIT license.
 */

'use strict';

var quotes = require('../quotes/all.quotes.json');

var querystring = require('querystring');
var http = require('http');
var fs = require('fs');



console.log(quotes);


function postQuote(quote, author) {

    var post_data = querystring.stringify({
        "body" : "Quote by " + author + " : \n" + quote
    });

    var req = http.request({
      host: "akbashev.www.filmon.dev",
      method: "POST",
      path: "/chat/messages",
      headers: {       
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': post_data.length
        }
      }
    );   
    req.write(post_data);
    console.log("Posting: " + post_data);
    req.end();
}

function postQuoteDefered(quote,author) {
    (function(quote,author) {
        setTimeout(function() {
            postQuote(quote,author);
        }, 1);
    })(quote,author);
}


function main() {

    for (var j=0; j<quotes.length; j++ ) { 
        var q = quotes[j].quotes;

        for( var i=0; i<q.length; i++) { 
            postQuoteDefered(q[i].quote, q[i].author);
        }
    }

}


main();
