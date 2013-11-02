app.directive('bzDroppable', ['$rootScope', '$parse', function ($rootScope, $parse) {
    return {
        scope: true,
        link: function (scope, element, attr) {
            attr.$set('droppable', true);

            if (attr.bzDroppable) {
                scope.validate = $parse(attr.bzDroppable);
            }
            if (attr.drop) {
                scope.drop = $parse(attr.drop);
            }

            $rootScope.$$dragElements = $rootScope.$$dragElements || [];

            var isValid = function(data) {
                if (!angular.isFunction(scope.validate)) {
                    return true;
                }
                return scope.validate(scope, { '$data': data });
            };
            var getData = function(e) {
                var id = e.dataTransfer.getData('text'),
                    controller = $rootScope.$$dragElements[id] || $rootScope.$$currentData;
                if (angular.isUndefined(controller)) {
                    return undefined; // temp fix https://bugs.webkit.org/show_bug.cgi?id=23695
                }
                return controller.data();
            };
            element.bind('dragover', function(e) {
                e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }
                if (!isValid(getData(e))) {
                    return true;
                }
                element.addClass('over');
                return false;
            });
            element.bind('dragenter', function(e) {
                if (isValid(getData(e))) {
                    element.addClass('over');
                }
            });

            element.bind('dragleave', function(e) {
                if (isValid(getData(e))) {
                    element.removeClass('over');
                }
            });

            element.bind('drop', function(e) {
                if (!isValid(getData(e))) {
                    return true;
                }
                element.removeClass('over');
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }

                if (e.stopPropogation) {
                    e.stopPropogation(); // Necessary. Allows us to drop.
                }
                // call the passed drop function
                scope.$apply(function (scope) {
                    scope.drop(scope, { '$data': getData(e) });
                });
                return false;
            });
        }
    }
}]);