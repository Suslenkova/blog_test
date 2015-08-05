'use strict';

var blogServices = angular.module('blogServices', ['ngResource']);

blogServices.factory('Posts', ['$resource', function($resource) {
        return $resource('/blog/test/all', {}, {
        });
    }]);

blogServices.factory('Post', ['$resource', function($resource) {
        return $resource('/blog/test/:action/id/:id',
                {id: '@id'}
        );
    }]);

blogServices.factory('Login', ['$resource', function($resource) {
        return $resource('/blog/test/login', {}, {
            login: {method: 'POST', cache: false, isArray: false}
        }
        );
    }]);
blogServices.factory('Registry', ['$resource', function($resource) {
        return $resource('/blog/test/registry', {}, {
            registry: {method: 'POST', cache: false, isArray: false}
        }
        );
    }]);