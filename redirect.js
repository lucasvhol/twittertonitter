// ==UserScript==
// @name         Twitter to Nitter Redirect
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Automatically redirects from Twitter to Nitter.
// @author       http://github.com/lucasvhol
// @match        *://twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to extract username and tweet ID from a Twitter URL
    function getTwitterInfo(url) {
        var match = url.match(/twitter\.com\/([^\/]+)\/status\/(\d+)/);
        return match ? { username: match[1], tweetID: match[2] } : null;
    }

    // Function to redirect to Nitter based on the Twitter URL
    function redirectTwitterToNitter() {
        var url = window.location.href;
        var tweetInfo = getTwitterInfo(url);

        // If it's a tweet URL
        if (tweetInfo) {
            var newURL = 'https://nitter.net/' + tweetInfo.username + '/status/' + tweetInfo.tweetID;
            window.location.replace(newURL);
            return;
        }

        // If it's the base URL "https://twitter.com/"
        if (url === 'https://twitter.com/') {
            window.location.href = 'https://nitter.net/';
            return;
        }

        // If it's a profile URL
        var username = url.match(/twitter\.com\/([^\/?]+)/);
        if (username) {
            var newURL = 'https://nitter.net/' + username[1];
            window.location.replace(newURL);
            return;
        }
    }

    // Execute the redirection function when the DOM is loaded
    redirectTwitterToNitter();
})();
