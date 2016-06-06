/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module("groceryListApp", ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
            .when("/", {
                templateUrl: "views/groceryList.html",
                controller: "GroceryListItemsController"
            })
            .when("/addItem", {
                templateUrl: "views/addItem.html",
                controller: "GroceryListItemsController"
            })
            .when("/addItem/:id", {
                templateUrl: "views/addItem.html",
                controller: "GroceryListItemsController"
            })
            .otherwise({
                redirectTo: "/"
            })
})


app.service("GroceryService", function(){
    var groceryService = {};
    
    groceryService.groceryItems = [
            {id: 1, completed: true, itemName: 'milk', date: '2014-10-05'},
            {id: 2, completed: true, itemName: 'cookies', date: '2014-15-01'},
            {id: 3, completed: true, itemName: 'meat', date: '2014-5-01'}
        ];
       
    
    groceryService.getNewId = function(){
        if(groceryService.newId){
            groceryService.newId++;
            return groceryService.newId;
        }else{
           var maxId = _.max(groceryService.groceryItems, function(entry){ return entry.id;});
           groceryService.newId = maxId.id + 1;
           
           return groceryService.newId;
        }
    }
    
        
    groceryService.save = function(entry){
        entry.id = groceryService.getNewId();
        groceryService.groceryItems.push(entry);
    }
    
   
    return groceryService;
})

app.controller("HomeController", ["$scope", function($scope){
    $scope.appTitle = "Grocery List";
}]);

app.controller("GroceryListItemsController", ["$scope", "$routeParams", "GroceryService", "$location",function($scope, $routeParams, GroceryService, $location){
        $scope.groceryItems = GroceryService.groceryItems;
        
        $scope.rp = "Route Parameter value: " + $routeParams.id;
        
        $scope.groceryItem = { id: 5, completed: true, itemName: 'cheese', date: new Date() };
        
        $scope.save = function(){
            GroceryService.save ($scope.groceryItem);
            $location.path('/');
        }
        
        console.log($scope.groceryItems);
}]);


