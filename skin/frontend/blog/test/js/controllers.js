'use strict';

var blogControllers = angular.module("blogControllers", []);


blogControllers.controller('BlogMainCtrl', ['$scope', '$document', '$compile', '$location', '$routeParams',   function($scope, $document, $compile, $location, $routeParams) {

        var div = $document.find('body');
        var menu = $compile('<div menu></div>')($scope);
        div.append(menu);
        $scope.hideReg = function() {
            return (REGISTRY === $location.path() || LIST === $location.path() || EDIT + $routeParams.id === $location.path() || NEW === $location.path()) ? true : false;
        };
        $scope.hideLogin = function() {
            return (LOGIN === $location.path() || LIST === $location.path() || EDIT + $routeParams.id === $location.path() || NEW === $location.path()) ? true : false;
        }
        $scope.hideLogout = function() {
            return (LOGIN === $location.path() || REGISTRY === $location.path()) ? true : false;
        }
    }
]);

blogControllers.controller('BlogListCtrl', ['$scope', '$window', '$location', 'Posts', 'Post', 'checkCreds', 'getUsername', function($scope, $window, $location, Posts, Post, checkCreds, getUsername) {
        if (!checkCreds()) {
            $location.path('/login');
        }
        $scope.username = getUsername();
        $scope.pageHeader = 'Posts List';
        $scope.tHeaders = [
            {title: " "},
            {title: "Title"},
            {title: "Created At"},
            {title: "Actions"}
        ];
        $scope.checkedPosts = [];

        Posts.query(
                {},
                function success(response) {
                    console.log("Success:" + JSON.stringify(response));
                    $scope.posts = response;
                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                }
        );

        $scope.check = function(e) {
            if ((e.target || e.srcElement).getAttribute("type") === "checkbox") {
                var id = this.post.id;
                var state = this.post.checked = !this.post.checked;
                if (state) {
                    $scope.checkedPosts.push(id);
                } else {
                    angular.forEach($scope.checkedPosts, function(v, k) {
                        if (v === id) {
                            $scope.checkedPosts.splice(k, 1);
                        }
                    });
                }
            }
        };

        $scope.deletePosts = function() {
            var ids = new Array();
            angular.copy($scope.checkedPosts, ids);
            //alert(ids);
            //alert(ids.length);
            Post.delete({action: 'massdel', id: ids},
            {},
                    function success(response) {
                        console.log("Success:" + JSON.stringify(response));
                        $scope.checkedPosts = [];
                        $location.path('/list');
                        //$window.location.reload();
                    },
                    function error(errorResponse) {
                        console.log("Error:" + JSON.stringify(errorResponse));
                    }
            );
        };
    }
]);


blogControllers.controller('BlogEditCtrl', ['$scope', '$routeParams', '$location', 'Post', 'checkCreds', function($scope, $routeParams, $location, Post, checkCreds) {
        if (!checkCreds()) {
            $location.path('/login');
        }
        $scope.currentPost = {id: 0, title: "", description: "", created: ""};
        Post.get({action: 'get', id: $routeParams.id},
        {},
                function success(response) {
                    console.log("Success:" + JSON.stringify(response));
                    $scope.getPost = response;
                    $scope.currentPost = {
                        id: $scope.getPost.id,
                        title: $scope.getPost.title,
                        description: $scope.getPost.description,
                        created: $scope.getPost.created
                    };
                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                }
        );

        $scope.editPost = function() {
            Post.save({action: 'update', id: $scope.currentPost.id},
            $scope.currentPost,
                    function success(response) {
                        console.log("Success:" + JSON.stringify(response));
                        $location.path('/');
                    },
                    function error(errorResponse) {
                        console.log("Error:" + JSON.stringify(errorResponse));
                    }
            );
        };
        $scope.deletePost = function() {
            var id = $scope.currentPost.id;
            //alert(id);
            Post.delete({action: 'massdel', id: id},
            {},
                    function success(response) {
                        console.log("Success:" + JSON.stringify(response));
                        $location.path('/list');
                        //$window.location.reload();
                    },
                    function error(errorResponse) {
                        console.log("Error:" + JSON.stringify(errorResponse));
                    }
            );
        };
        $scope.resetData = function() {
            var id = $scope.currentPost.id;
            var created = $scope.currentPost.created;
            $scope.currentPost = {
                id: id,
                title: "",
                description: "",
                created: created
            };
        }

    }]);

blogControllers.controller('BlogNewCtrl', ['$scope', '$location', 'Post', 'checkCreds', function($scope, $location, Post, checkCreds) {
        if (!checkCreds()) {
            $location.path('/login');
        }

        $scope.currentPost = {};
        $scope.addPost = function() {
            Post.save({action: 'add'},
            $scope.currentPost,
                    function success(response) {
                        console.log("Success:" + JSON.stringify(response));
                        $location.path('/');
                    },
                    function error(errorResponse) {
                        console.log("Error:" + JSON.stringify(errorResponse));
                    }
            );
        };
        $scope.resetData = function() {
            $scope.currentPost = {
                title: "",
                description: ""
            };
        }

    }]);

blogControllers.controller('BlogLoginCtrl', ['$scope', '$location', 'Login', 'setCreds', function($scope, $location, Login, setCreds) {
        $scope.userData = {};
        $scope.submit = function() {
            Login.login(
                    {},
                    $scope.userData,
                    function success(response) {
                        console.log("Success:" + JSON.stringify(response));
                        if (response.authenticated) {
                            setCreds($scope.userData.name, $scope.userData.password)
                            $location.path('/');
                        } else {
                            $scope.error = "Authentication Failed"
                        }
                    },
                    function error(errorResponse) {
                        console.log("Error:" + JSON.stringify(errorResponse));
                    }
            );
        };
    }]);
blogControllers.controller('BlogRegistrationCtrl', ['$scope', '$location', 'Registry', function($scope, $location, Registry) {
        $scope.userData = {};
        $scope.submit = function() {
            Registry.registry(
                    {},
                    $scope.userData,
                    function success(response) {
                        console.log("Success:" + JSON.stringify(response));
                        if (response.name === $scope.userData.name) {
                            $location.path('/login');
                        } else {
                            $scope.error = "Registration Failed"
                        }
                    },
                    function error(errorResponse) {
                        console.log("Error:" + JSON.stringify(errorResponse));
                    }
            );
        };
    }]);

blogControllers.controller('BlogLogoutCtrl', ['$location', 'deleteCreds', function($location, deleteCreds) {
        deleteCreds();
        $location.path('/login');
    }]);