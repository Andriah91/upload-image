var myApp = angular.module('myApp', []);

myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
   };
}]);

// We can write our own fileUpload service to reuse it in the controller
myApp.service('fileUpload', function ($http) {
    return{
        uploadFileToUrl : function(file, uploadUrl){
            var fd = new FormData();
             fd.append('file', file);
             $http.post(uploadUrl, fd, {
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined,'Process-Data': false}
             })
             .success(function(data){
                console.log(data);
                return data;
             })
             .error(function(){
                console.log("Error");
             });
        }
    }
 });

 myApp.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){

   $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);

        var uploadUrl = "uploader.php";
        fileUpload.uploadFileToUrl(file, uploadUrl);
   };

}]);