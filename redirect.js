// ==UserScript==
// @name         Twitter to Nitter Redirect
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically redirects from Twitter to Nitter.
// @author       https://github.com/lucasvhol
// @match        *://twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to extract the username from a Twitter URL
    function getTwitterUsername(url) {
        var match = url.match(/twitter\.com\/([^\/]+)/);
        return match ? match[1] : null;
    }

    // Function to redirect to Nitter based on the Twitter URL
    function redirectTwitterToNitter() {
        var url = window.location.href;
        var username = getTwitterUsername(url);

        // If it's a profile URL
        if (username) {
            var newURL = 'https://nitter.net/' + username;
            window.location.href = newURL;
        }

        // If it's a tweet URL
        else if (url.includes('/status/')) {
            var newURL = 'https://nitter.net' + url.split('twitter.com')[1];
            window.location.href = newURL;
        }
    }

    // Execute the redirection function when the page is loaded
    redirectTwitterToNitter();
})();
