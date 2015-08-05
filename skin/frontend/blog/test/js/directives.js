'use strict';

var blogDirectives = angular.module('blogDirectives', []);

blogDirectives.directive('pw', [function() {
        return {
            require: '?ngModel', //Запрос другого контроллера. Передается в функцию link директивы. 
                                 //'?ctrl' - не возвращать ошибку, если ngModel не найден
            link: function(scope, elm, attr, ctrl) {
                ctrl.$parsers.unshift(function(pw) {
                    if (/^[\D\d]{5,20}$/.test(pw)) {
                        ctrl.$setValidity('pw', true)
                        return pw;
                    } else{
                        ctrl.$setValidity('pw', false)
                        return undefined;
                    }
                });
            }
        };
    }]);

blogDirectives.directive('uname', [function() {
        return {
            require: '?ngModel',
            link: function(scope, elm, attr, ctrl) {
                ctrl.$parsers.unshift(function(name) {
                    if (/^[а-яА-ЯёЁa-zA-Z0-9-_]{4,10}$/.test(name)) {
                        ctrl.$setValidity('uname', true)
                        return name;
                    } else{
                        ctrl.$setValidity('uname', false)
                        return undefined;
                    }
                });
            }
        };
    }]);

blogDirectives.directive('ckEditor', [function() {
        return {
            require: '?ngModel',
            restrict: 'C', // по умолчанию (если не указывать) restrict: 'A'
            link: function(scope, elm, attr, model) {
                var isReady = false;
                var data = [];
                var ck = CKEDITOR.replace(elm[0]);

                function setData() {
                    if (!data.length) {
                        return;
                    }
                    var d = data.splice(0, 1);
                    ck.setData(d[0] || '<span></span>', function() {
                        setData();
                        isReady = true;
                    });
                }
                ck.on('instanceReady', function(e) {
                    if (model) {
                        setData();
                    }
                });
                if (model) {
                    ck.on('change', function() {
                        scope.$apply(function() {
                            var data = ck.getData();
                            if (data == '<span></span>') {
                                data = null;
                            }
                            model.$setViewValue(data);
                        });
                    });

                    model.$render = function(value) {
                        if (model.$viewValue === undefined) {
                            model.$setViewValue(null);
                            model.$viewValue = null;
                        }

                        data.push(model.$viewValue);

                        if (isReady) {
                            isReady = false;
                            setData();
                        }
                    };
                }

            }
        };
    }]);

blogDirectives.directive('menu',   [function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: VIEW_DIR + 'menu.phtml'
        };
    }]);