
        var app = angular.module("productapp", ["ngRoute"]);
        app.config(function($routeProvider) {
          $routeProvider
          .when("/", {
            templateUrl : "main.html",
            controller: "product"
          })
          .when("/job/:id", {
            templateUrl : "job1.html",
            controller : 'productDetails'
          })
          .when("/findjob", {
            templateUrl : "job_listing.html",
            controller : 'findJobController'
            
          })
          .when("/findjob", {
            templateUrl : "job_listing.html",
            controller: 'findJobController'
          })
          .when("/findjob/:search", {
            templateUrl : "job_listing.html",
            controller: 'findJobController'
          })
          .when("/login", {
            templateUrl : "login.html",
            controller: 'login'
          })
          .when("/resume", {
            templateUrl : "resume.html",
            controller : 'resummeController'
          })
          .when("/editprofile", {
            templateUrl : "editprofile.html",
            controller : 'editprofileController'
          })
          .when("/applyed", {
            templateUrl : "listjob.html",
            controller : 'applyController'
          })
          .when ('/mycompanys', {
            templateUrl : "listcompany.html",
            controller : 'companyController'
          })
          .when ('/mycompany/:id', {
            templateUrl : "company.html",
            controller : 'companydetailsController'
          })
          .when ('/signup',{
            templateUrl : "signup.html",
            controller : "signup"
          });
        });

        app.controller ('product' , function($scope, $http){
            $scope.jobs = [];  
            $http.get('http://localhost:8080/api/job/jobs?pricebefore=1&priceafter=2147483647').then(function (respone){
                $scope.jobs = respone.data.content;
                $scope.page = respone.data.pageNum;
                $scope.totalPage = respone.data.totalPage;
                console.log(respone);
            });

        });

    app.controller ('productDetails' , function($scope, $http, $routeParams){
    $scope.job;  
    $http.get('http://localhost:8080/api/job/'+$routeParams.id).then(function (respone){
        $scope.job = respone.data;
        console.log(respone);
        });

        $scope.apply = function (){
          var req = {
            method: 'POST',
            url: 'http://localhost:8080/api/apply?id='+$routeParams.id,
            headers: {
              'Authorization': 'Bearer '+localStorage.getItem('token'),
              'Content-Type': 'application/json'
          }
           }
           $http(req).then(function(respone){
            $scope.success ="Apply Thành Công"
            console.log(respone)
            
           }, function(respone){
            $scope.error ="Bạn Đã Apply Công Việc Này Rồi"
            console.log(respone)
           });
        }
    });

    app.controller ('findJobController' , function($scope, $http, $routeParams){
      $scope.jobs = [];  
      var search = $routeParams.search;
      $scope.page = 0;
      page = $scope.page;
      apiget = 'http://localhost:8080/api/job/jobs?pagenum='+page;
      if (search != undefined){
        apiget = 'http://localhost:8080/api/job/jobs?pagenum='+page+'&&search='+search;
      }
      $http.get(apiget).then(function (respone){
          $scope.jobs = []; 
          $scope.jobs = respone.data.content;
          $scope.page = respone.data.pageNum;
          $scope.totalPage = respone.data.totalPage;
          $scope.totalElements = respone.data.totalElements;

          $scope.range = range;
          console.log(respone);
          });
          $http.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json').then(function (respone){
          $scope.citys = respone.data;
      })
          $scope.fillter = function(){
            $scope.page = 0;
            apigetfillter = apiget;
        if ($scope.location != undefined){
          locations = $scope.location
          apigetfillter = apiget+'&&location='+locations
        }
        if ($scope.nature != undefined){
          nature = $scope.nature
          apigetfillter = apigetfillter+'&&nature='+nature
        }
        if ($scope.sort != undefined){
          if ($scope.sort == 'priceasc'){
            apigetfillter = apigetfillter+'&&fields=price_before&&orderby=ASC';
          }else{
            apigetfillter = apigetfillter+'&&fields=price_before&&orderby=DESC';
          }
        }
        $http.get(apigetfillter).then(function(respone){
          $scope.jobs = respone.data.content
          $scope.page = respone.data.pageNum;
          $scope.totalPage = respone.data.totalPage;
        })
        }
        $scope.pages = function(pagenum){
          if (pagenum == 1){
            $scope.page= $scope.page + 1;
            if ($scope.page >= $scope.totalPage){
              $scope.page = $scope.totalPage-1;
            }
          }else{
            $scope.page -= 1;
            if ($scope.page <= 0 ){
            $scope.page = 0;
            }
        }
        page = $scope.page;
        apiget = 'http://localhost:8080/api/job/jobs?pagenum='+page;
        if (search != undefined){
        apiget = 'http://localhost:8080/api/job/jobs?pagenum='+page+'&&search='+search;
        }
        apigetfillter = apiget;
        if ($scope.location != undefined){
          locations = $scope.location
          apigetfillter = apiget+'&&location='+locations
        }
        if ($scope.nature != undefined){
          nature = $scope.nature
          apigetfillter = apigetfillter+'&&nature='+nature
        }
        if ($scope.sort != undefined){
          if ($scope.sort == 'priceasc'){
            apigetfillter = apigetfillter+'&&fields=price_before&&orderby=ASC';
          }else{
            apigetfillter = apigetfillter+'&&fields=price_before&&orderby=DESC';
          }
        }
        $http.get(apigetfillter).then(function(respone){
          $scope.jobs = respone.data.content
          $scope.page = respone.data.pageNum;
          $scope.totalPage = respone.data.totalPage;
        })
        }
      });

      

        app.controller('login', function($scope, $http){
        $scope.login = function (){
        var data = {
          email: $scope.email,
          password: $scope.password
        }
        console.log (data)
        $http({
          url: 'http://localhost:8080/api/auth/login',
          method: "POST",
          data:  JSON.stringify(data) 
      })
      .then(function(response) {
              localStorage.setItem('token', response.data.accessToken)
              window.location = '/'
      }, 
      function(response) { // optional
              // failed
              $scope.error = 'Sai Tài Khoản Hoặc Mật Khẩu';
      });
        
        }
      })

      app.controller('signup', function($scope, $http){
        $scope.signup = function (){
        var data = {
          fullName: $scope.fullName,
          email: $scope.email,
          phone: $scope.phone,
          password: $scope.password,
          address: $scope.address,
          city: $scope.city,
          district: $scope.district,
          ward: $scope.ward
        }
        console.log (data)
        $http({
          url: 'http://localhost:8080/api/auth/register',
          method: "POST",
          data:  JSON.stringify(data) 
      })
      .then(function(response) {
        $scope.success = 'Đăng Ký Thành Công';
        window.location.href = "#!/login"
      }, 
      function(response) { // optional
              // failed
              console.log(response)
              $scope.error = 'Email Hoặc Số Điện Thoại Đã Tồn Tại Trên Hệ Thống';
      });
      
        }
        
      })

      app.controller ('companydetailsController', function($http, $scope, $routeParams){
        var url = 'http://localhost:8080/api/mycompanys/'+$routeParams.id
        var req = {
          method: 'GET',
          url: url,
          headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
         }
         $http(req).then(function(respone){
          $scope.company = respone.data.data;
          console.log ($scope.company)
          
         }, function(respone){
          window.location.href = '#!/';
         });
            
      })




      app.controller('header', function($scope,$http){
        $scope.loged
        if (localStorage.getItem('token')!=null){
        $http.get('http://localhost:8080/api/auth/authorization', {
          headers: {
              'Authorization': 'Bearer '+localStorage.getItem('token'),
              'Content-Type': 'application/json'
          }
        })
        .then(response => {
         $scope.user = response.data
      }).catch(error => {
        window.location.reload= '#!/login'
        });
        }
        if (localStorage.getItem('token') == null){
          $scope.loged = 'login'
        }else {
          $scope.loged = 'loged'
        }

        $scope.logout = function (){
          localStorage.removeItem('token')
          location.reload()
        }
        
      })

      app.controller ('resummeController', function ($http,$scope){
        if (localStorage.getItem ('token')==undefined){
            window.location.href = '#!/'
        }else{
          $http.get('http://localhost:8080/api/auth/authorization', {
          headers: {
              'Authorization': 'Bearer '+localStorage.getItem('token'),
              'Content-Type': 'application/json'
          }
        })
        .then(response => {
         $scope.user = response.data
      }).catch(error => {
        window.location.reload= '#!/login'
        });
          $http.get('http://localhost:8080/api/auth/resume', {
          headers: {
              'Authorization': 'Bearer '+localStorage.getItem('token'),
              'Content-Type': 'application/json'
          }
        })
        .then(response => {
         $scope.resume = response.data
         console.log($scope.resume)
      }).catch(error => {
        window.location.reload= '#!/login'
        });
      }
      })
      app.controller ('editprofileController', function ($http,$scope){
        if (localStorage.getItem ('token')==undefined){
            window.location.href = '#!/'
        }else{
          $http.get('http://localhost:8080/api/auth/authorization', {
          headers: {
              'Authorization': 'Bearer '+localStorage.getItem('token'),
              'Content-Type': 'application/json'
          }
        })
        .then(response => {
         $scope.user = response.data
      }).catch(error => {
        window.location.reload= '#!/login'
        });
          $http.get('http://localhost:8080/api/auth/resume', {
          headers: {
              'Authorization': 'Bearer '+localStorage.getItem('token'),
              'Content-Type': 'application/json'
          }
        })
        .then(response => {
         $scope.resume = response.data
         $scope.jobPosition = response.data.jobPosition
         $scope.avatar= response.data.avatar
         $scope.carrer = response.data.carrer
         $scope.github = response.data.github
         $scope.website = response.data.website
         if($scope.resume.avatar == ''){
          $scope.avatar = 'chua cap nhat';
         }
      }).catch(error => {
        window.location.reload= '#!/login'
        });
      }
      $scope.editProfile = function (){
        data = {
            jobPosition: $scope.jobPosition,
            avatar: $scope.avatar,
            carrer: $scope.carrer,
            github: $scope.github,
            website: $scope.website
        }
        var req = {
          method: 'POST',
          url: 'http://localhost:8080/api/resume/edit',
          headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
          data: data
         }
         $http(req).then(function(respone){
              $scope.success = 'sửa thành công'
         }, function(respone){
          $scope.error = 'sửa thất bại'
         });
      }

      $scope.addskill = function (){
        data = {
          skill: $scope.skill
        }
        var req = {
          method: 'POST',
          url: 'http://localhost:8080/api/resume/addSkill',
          headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
          data: data
         }
         $http(req).then(function(respone){
              $scope.skill = '';
         }, function(respone){
              $scope.skill = '';
         });
      }
      
      $scope.addexp = function (){
        data = {
          "jobLocation" : $scope.joblocation,
          "dateStart": $scope.dateStart,
          "dateEnd": $scope.dateEnd,
          "describe": $scope.describe,
          "achivement": $scope.achivement,
          "company": $scope.company
      }
      console.log(data);
        var req = {
          method: 'POST',
          url: 'http://localhost:8080/api/resume/addWork',
          headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
          data: data
         }
         $http(req).then(function(respone){
              $scope.skill = '';
         }, function(respone){
          $scope.joblocation =""
           $scope.dateStart =""
           $scope.dateEnd =""
           $scope.describe=""
           $scope.achivement=""
          $scope.company=""
         });
      }
      $scope.addedu = function (){
        data = {
          "major" : $scope.major,
          "dateStart": $scope.dateStart,
          "dateEnd": $scope.dateEnd,
          "school": $scope.school
      }
      console.log(data);
        var req = {
          method: 'POST',
          url: 'http://localhost:8080/api/resume/addEdu',
          headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
          data: data
         }
         $http(req).then(function(respone){
              $scope.skill = '';
         }, function(respone){
          $scope.major =""
           $scope.dateStart =""
           $scope.dateEnd =""
           $scope.school=""
         });
      }
      $scope.addaward = function (){
        data = {
          "awardName" : $scope.awardName,
          "awardContent": $scope.awardContent
      }
      console.log(data);
        var req = {
          method: 'POST',
          url: 'http://localhost:8080/api/resume/addAward',
          headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
          data: data
         }
         $http(req).then(function(respone){
              $scope.skill = '';
         }, function(respone){
          $scope.awardName =""
          $scope.awardContent =""
         });
      }
      })

      app.controller('applyController',function($scope, $http){
        if (localStorage.getItem ('token')==undefined){
          window.location.href = '#!/'
        }else{
          var req = {
            method: 'GET',
            url: 'http://localhost:8080/api/auth/getapplys',
            headers: {
              'Authorization': 'Bearer '+localStorage.getItem('token'),
              'Content-Type': 'application/json'
            }
           }
           $http(req).then(function(respone){
                console.log(respone)
                $scope.applys = respone.data;
           }, function(respone){
            $scope.awardName =""
            $scope.awardContent =""
           });

           $scope.delete = function (id){
            var req = {
              method: 'DELETE',
              url: 'http://localhost:8080/api/apply?id='+id,
              headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
              }
             }
             $http(req).then(function(respone){
                  console.log(respone)
                  location.reload()
             }, function(respone){
              $scope.awardName =""
              $scope.awardContent =""
             });
           }
        }
      })

      app.controller ('companyController', function($scope,$http){
        if (localStorage.getItem ('token')==undefined){
          window.location.href = '#!/'
        }else{
          var req = {
            method: 'GET',
            url: 'http://localhost:8080/api/myconpanys',
            headers: {
              'Authorization': 'Bearer '+localStorage.getItem('token'),
              'Content-Type': 'application/json'
            }
           }
           $http(req).then(function(respone){
                $scope.companys = respone.data.data
                console.log($scope.companys)
           }, function(respone){
            $scope.awardName =""
            $scope.awardContent =""
           });

           $scope.addCompany = function(){
            var req = {
              method: 'POST',
              url: 'http://localhost:8080/api/company/add',
              headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
              data: $scope.company
             }
             $http(req).then(function(respone){
                  location.reload()
             }, function(respone){
              location.reload()
             });
           }
        }
      })

     