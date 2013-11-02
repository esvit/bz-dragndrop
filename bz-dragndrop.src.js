(function(angular, factory) {
    if (typeof define === 'function' && define.amd) {
        define('bzDragndrop', ['angular', 'bzData'], function($, angular) {
            return factory(angular);
        });
    } else {
        return factory(angular);
    }
}(angular || null, function(angular) {
var app = angular.module('bzDragndrop', ['bzData']);
app.directive('bzDraggable', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'A',
        require: 'bzData',
        link: function (scope, element, attr, controller) {
            attr.$set('draggable', true);

            $rootScope.$$dragElements = $rootScope.$$dragElements || [];

            element.bind('dragstart', function (e) {
                e.dataTransfer.effectAllowed = 'move';

                $rootScope.$$dragElements[controller.$$hashKey] = controller;
                $rootScope.$$currentData = controller;
                e.dataTransfer.setData('text', controller.$$hashKey);
                element.addClass('drag');
                $rootScope.$emit('bzDragStart', element);
                return false;
            });

            element.bind('dragend', function(e) {
                element.removeClass('drag');
                $rootScope.$$dragElements.splice($rootScope.$$dragElements.indexOf(controller.$$hashKey), 1);
                $rootScope.$$currentData = undefined;
                $rootScope.$emit('bzDragEnd', element);
            });
        }
    }
}]);
app.directive('bzDraggable', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'A',
        require: 'bzData',
        link: function (scope, element, attr, controller) {
            attr.$set('draggable', true);

            $rootScope.$$dragElements = $rootScope.$$dragElements || [];

            element.bind('dragstart', function (e) {
                e.dataTransfer.effectAllowed = 'move';

                $rootScope.$$dragElements[controller.$$hashKey] = controller;
                $rootScope.$$currentData = controller;
                e.dataTransfer.setData('text', controller.$$hashKey);
                element.addClass('drag');
                $rootScope.$emit('bzDragStart', element);
                return false;
            });

            element.bind('dragend', function(e) {
                element.removeClass('drag');
                $rootScope.$$dragElements.splice($rootScope.$$dragElements.indexOf(controller.$$hashKey), 1);
                $rootScope.$$currentData = undefined;
                $rootScope.$emit('bzDragEnd', element);
            });
        }
    }
}]);
    return app;
}));