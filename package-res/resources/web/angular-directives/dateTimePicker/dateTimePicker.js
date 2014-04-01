define([
  'common-ui/angular'
],
    function (angular) {
      var templatePath = "";
      if (typeof(CONTEXT_PATH) != "undefined") {
        templatePath = CONTEXT_PATH + 'content/common-ui/resources/web/angular-directives/dateTimePicker/';
      } else {
        templatePath = 'angular-directives/dateTimePicker/';
      }

      angular.module('dateTimePicker', [])

          .controller('DateTimeController', ['$scope', '$attrs', function ($scope, $attrs) {


          }])

          .directive('datetime', function () {
            return {
              restrict: 'A',
              replace: true,
              transclude: true,
              controller: 'DateTimeController',
              templateUrl: templatePath + 'dateTimePicker.html',
              link: function (scope, elem, attrs) {
              }
            }
          }

      );
    });