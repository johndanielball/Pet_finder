myApp.controller('HomeController', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.petTypes = [
    { type : 'cat', name : 'Cat' },
    { type : 'dog', name : 'Dog' },
    { type : 'bird', name : 'Bird' }
  ];

  $scope.petChanged = function() {
    $location.path('pets/' + $scope.selectedPet);
  };

  $http.get('/count')
    .then(
      function(response){
        $scope.favoriteCnt = response.data;
      },
      function(err){
        console.log(err)
      }
  )

}]);