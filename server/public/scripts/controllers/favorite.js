myApp.controller('FavoriteController', ['$scope', '$http', function($scope, $http) {
  console.log();

  $http.get('/favorite')
    .then(
      function (response) {
        var data = response.data;

        $scope.pets = data;
      },
      function (err) {
        console.log();
      }
    );
}]);
