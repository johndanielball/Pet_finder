var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/cats', {
      templateUrl: '/views/templates/cats.html',
      controller: 'CatsController'
    })
    .when('/dogs', {
      templateUrl: '/views/templates/dogs.html',
      controller: 'DogsController'
    })
    .when('/birds', {
      templateUrl: '/views/templates/birds.html',
      controller: 'BirdsController'
    })
}]);

