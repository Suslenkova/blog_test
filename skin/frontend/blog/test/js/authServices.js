'use strict';

var authServices = angular.module('authServices', ['ngCookies']);

authServices.factory('checkCreds',['$cookies', function($cookies) {
	return function() {
		var returnVal = false;
		var blogCreds = $cookies.blogCreds;
			if (blogCreds !== undefined && blogCreds !== "") {
				returnVal = true;
			}
		return returnVal;
	};
}]);

authServices.factory('getUsername', ['$cookies', function($cookies) {
	return function() {
		var returnVal = "";
		var blogUsername = $cookies.blogUsername;
			if (blogUsername !== undefined && blogUsername !== "") {
				returnVal = blogUsername;
			}
		return returnVal;
	};
}]);

authServices.factory('setCreds', ['$cookies', function($cookies) {
	return function(un, pw) {
		var token = un.concat(":", pw);
		$cookies.blogCreds = token;
		$cookies.blogUsername = un;
	};
}]);

authServices.factory('deleteCreds', ['$cookies', function($cookies) {
	return function() {
		$cookies.blogCreds = "";
		$cookies.blogUsername = "";
	};
}]);


