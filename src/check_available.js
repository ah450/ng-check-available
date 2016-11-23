angular.module('ngCheckAvailable', []);
angular.module('ngCheckAvailable').directive('ngCheckAvailable', function($http, $q) {
    var directive = {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, ele, attrs) {
            ctrl.$asyncValidators.ngCheckAvailable = function(modelValue, viewValue) {
                return $http.get(attrs.checkAvailableEndpoint,
                  {
                    cache: false,
                    params: {
                      value: viewValue.trim()
                    }
                  }).then(function(response) {
                  if (response.data.count !== 0) {
                    return $q.reject(response.data.count);
                  } else {
                    return true;
                  }
                });
              };
        }
    };
    return directive;
});