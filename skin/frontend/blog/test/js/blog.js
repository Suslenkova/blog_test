'use strict';

var blogApp = angular.module("blog", ['ngRoute', 'blogControllers', 'blogServices', 'authServices', 'blogDirectives'], function($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    $httpProvider.defaults.transformRequest = [function(data) {
            var param = function(obj) {
                var query = '';
                var name, value, fullSubName, subValue, subName, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';//
                        }
                    }
                    else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                    }
                }
                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
});

var VIEW_DIR = '/skin/frontend/blog/test/views/';
var LOGIN = '/login';
var LOGOUT = '/logout';
var REGISTRY = '/registry';
var EDIT = '/edit/';
var NEW = '/new';
var LIST = '/list';
blogApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider
                .when('/list', {templateUrl: VIEW_DIR + 'list.phtml', controller: 'BlogListCtrl'})
                .when('/new', {templateUrl: VIEW_DIR + 'add_post.phtml', controller: 'BlogNewCtrl'})
                .when('/edit/:id', {templateUrl: VIEW_DIR + 'edit_post.phtml', controller: 'BlogEditCtrl'})
                .when('/login', {templateUrl: VIEW_DIR + 'login.phtml', controller: 'BlogLoginCtrl'})
                .when('/logout', {templateUrl: VIEW_DIR + 'login.phtml', controller: 'BlogLogoutCtrl'})
                .when('/registry', {templateUrl: VIEW_DIR + 'registration.phtml', controller: 'BlogRegistrationCtrl'})
                .otherwise({redirectTo: '/list'});
        //$locationProvider.html5Mode(false).hashPrefix('!');
    }
]);






