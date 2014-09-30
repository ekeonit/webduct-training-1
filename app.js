var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'WidgetsController'
        })
        .when('/:widgetId', {
            templateUrl: 'widget.html',
            controller: 'WidgetController'
        })
        .when('/about', {
            templateUrl: 'about.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('WidgetsController', ['$scope', '$http',
    function($scope, $http) {
        $scope.widgets = [];
        $http.get('data/widgets.json')
            .success(function(result) {
                $scope.widgets = result;
            })
            .error(function(result) {
                alert('Error');
            });

        $scope.orderByField = 'name';
    }
]);

app.controller('WidgetController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        var id = $routeParams.widgetId;
        var url = 'data/' + id + '.json';
        $http.get(url)
            .success(function(result) {
                $scope.widget = result;
            })
            .error(function(result) {
                alert('Error');
            });
    }
]);
