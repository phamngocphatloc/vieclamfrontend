var productApp = angular.module ('productapp',[]); 
productApp.controller ('productController' , function($scope, $http){
    $scope.job;
    $http.get('localhost:8080/api/job/2').then(function (respone){
        $scope.jobs = respone.data;
        $scope.page = respone.data.pageNum + 1;
        $scope.totalPage = respone.data.totalPage;
        console.log(respone);
    });
    
});