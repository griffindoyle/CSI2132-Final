'use strict';

app.module(function(E, ajax) {
    return {

        navbarVisible: true,
        
        css: [
            'resources/css/modules/portal.css'
        ],

        preconditions: function() {
            return app.user !== undefined;
        },

        display: function(container, params) {

            ajax.get('auth/whoami').then(function(response) {
                E('h1', {
                    textContent: "Welcome, " + response.auth,
                    parent: container
                });
            }, function() {
                E('h1', {
                    textContent: "Couldn't determine who you are :(",
                    parent: container
                });
            });

        }
    };
});