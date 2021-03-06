// actor.js
var database = require('../database');
var validator = require('../helpers/validator');
var Promise = require('promise');

module.exports = {
    fetchDirector: function(params) {

        return new Promise(function (resolve, reject) {

            var errors = validator.validate(params, {
                movie_id: validator.isInteger
            });

            if (errors) {
                reject({
                    error: true,
                    type: 'validation',
                    rejected_parameters: errors
                });
                return;
            }

            database.query({
                text:
                "SELECT D.* " +
                "FROM Director D " +
                    "INNER JOIN MovieDirector MD ON MD.Director_ID = D.Director_ID " +
                "WHERE MD.Movie_ID = $1",
                values: [params.movie_id]
            }).then(function(results) {
                resolve(results.rows);
            }, function(error) {
                reject({
                    error: "Error looking up actors",
                    dev_error: error
                })
            });
        });


    }
};