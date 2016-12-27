'use strict';

/**
 * @ngdoc overview
 * @name hotsportsWcpayApp
 * @description
 * # hotsportsWcpayApp
 *
 * Main module of the application.
 */
angular
  .module('hotsportsWcpayApp', [
    //'ngAnimate',
    //'ngCookies',
    //'ngResource',
    //'ngRoute',
    //'ngSanitize',
    //'ngTouch'
  ], function ($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function (obj) {
      var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

      for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if (value instanceof Object) {
          for (subName in value) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if (value !== undefined && value !== null) {
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
      }

      return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
  })
  //.config(function ($routeProvider) {
  //  $routeProvider
  //    .when('/', {
  //      templateUrl: 'views/main.html',
  //      controller: 'MainCtrl',
  //      controllerAs: 'main',
  //      resolve: {
  //        //isMicroMessenger: ['$log', '$window', '$q', function ($log, $window, $q) {
  //        //  var ua = $window.navigator.userAgent.toLowerCase();
  //        //  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
  //        //    return $q.when(true);
  //        //  } else {
  //        //    return $q.reject({isMicroMessenger: false});
  //        //  }
  //        //}]
  //      }
  //    })
  //    .otherwise({
  //      redirectTo: '/'
  //    });
  //})
  .run(function ($window, $rootScope) {
    $rootScope.$on('$routeChangeStart', function (event, next) {

    });

    $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {

    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
      if (rejection.isMicroMessenger === false) {
        $window.alert('请在微信客户端打开');
      }
    });
  });
