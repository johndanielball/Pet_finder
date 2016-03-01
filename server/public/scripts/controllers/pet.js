myApp.controller('PetController', ['$scope', '$http', '$routeParams', 'favoriteFactory', function($scope, $http, $routeParams, favoriteFactory) {

  petFinder();

  $scope.isFavorite = false;
  $scope.petType = $routeParams.type;

  $scope.addToFavorites = function() {

    var favorite = favoriteFactory.createFavorite($scope.animal);

    $http.post('/favorite', favorite).then(
      function (response) {
        $scope.isFavorite = true;
        console.log(response);
      },
      function (response) {
        console.log(response);
      }
    )
  };

  function petFinder() {
    // API key
    var key = 'fb9f69a9cf610ba81cc48ec2f5ca53f6';

    var baseURL = 'http://api.petfinder.com/';
    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + $routeParams.type;
    query += '&output=basic';
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        $scope.animal = response.data.petfinder.pet;
        var filteredPhotos = $scope.animal.media.photos.photo.filter(function (item) {
          return item['@size'] == "pn";
        });
        $scope.animal.photo = filteredPhotos[0];
      },
      function(err) {
        console.log(err);
      }
    );
  }
}]);