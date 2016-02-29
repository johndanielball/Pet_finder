myApp.controller('BirdsController', ['$scope', '$http', function($scope, $http) {
  var position = 0;
  var srcUrl;

  $scope.movePrevious = function () {
    if (position == 0) {
      srcUrl = $scope.animal.media.photos.photo[$scope.animal.media.photos.photo.length - 1].$t;
      position = $scope.animal.media.photos.photo.length - 1;
    } else {
      srcUrl = $scope.animal.media.photos.photo[position - 1].$t;
      position--;
    }
    $scope.srcUrl = srcUrl;
  }

  $scope.moveNext = function () {
    if (position == $scope.animal.media.photos.photo.length - 1) {
      srcUrl = $scope.animal.media.photos.photo[0].$t;
      position = 0;
    } else {
      srcUrl = $scope.animal.media.photos.photo[position + 1].$t;
      position++;
    }
    $scope.srcUrl = srcUrl;
  }

  function petFinder() {
    // API key
    var key = 'fb9f69a9cf610ba81cc48ec2f5ca53f6';

    var baseURL = 'http://api.petfinder.com/';
    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=bird';
    query += '&output=basic';
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        $scope.animal = response.data.petfinder.pet;
        $scope.animal.media.photos.photo = $scope.animal.media.photos.photo.filter(function (item) {
          return item['@size'] == "pn";
        });
        $scope.srcUrl = $scope.animal.media.photos.photo[0].$t;
      },
      function(err) {
        console.log(err);
      }
    );
  }

  petFinder();
}]);