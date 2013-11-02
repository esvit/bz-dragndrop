(function(angular, factory) {
    if (typeof define === 'function' && define.amd) {
        define('bzDragndrop', ['angular', 'bzData'], function($, angular) {
            return factory(angular);
        });
    } else {
        return factory(angular);
    }
}(angular || null, function(angular) {