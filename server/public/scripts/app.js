var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/pets/:type', {
      templateUrl: '/views/templates/pet.html',
      controller: 'PetController'
    })
    .when('/favorite', {
      templateUrl: '/views/templates/favorite.html',
      controller: 'FavoriteController'
    });
}]);

myApp.factory('favoriteFactory', function() {
  return {
    createFavorite: function (animal) {
      return {
        id: animal.id.$t,
        type: animal.animal.$t,
        name: animal.name.$t,
        description: animal.description.$t,
        photoUrl: animal.photo.$t
      }
    }
  }
});