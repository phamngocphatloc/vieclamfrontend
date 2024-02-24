var productApp = angular.module ('productapp',[]); 
productApp.controller ('product' , function($scope, $http){
    $scope.jobs = [];  
    $http.get('http://localhost:8080/api/job/jobs?pricebefore=1&priceafter=2147483647').then(function (respone){
        $scope.jobs = respone.data.content;
        $scope.page = respone.data.pageNum + 1;
        $scope.totalPage = respone.data.totalPage;
        console.log(respone);
    });
});