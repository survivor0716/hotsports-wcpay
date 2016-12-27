'use strict';

/**
 * @ngdoc function
 * @name hotsportsWcpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hotsportsWcpayApp
 */
angular.module('hotsportsWcpayApp')
  .controller('MainCtrl', function ($window, $log, $scope, $http) {
    $scope.invokeWCPay = function () {
      if (typeof WeixinJSBridge === "undefined") {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      } else {
        onBridgeReady();
      }
    };

    //获取地址栏参数
    $scope.GetQueryString = function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return decodeURI(r[2]);
      }
      return null;
    };

    $scope.toFixed2 = function() {
      $scope.orderParams.total_fee = Math.floor($scope.orderParams.total_fee * 100) / 100;
    };

    $scope.setTitle('热动支付');
    $scope.name = '场馆名称: ' + $scope.GetQueryString('name');
    $scope.orderParams = {};
    $scope.orderParams.openid = $scope.GetQueryString('openid');
    $scope.orderParams.unionid = $scope.GetQueryString('unionid');
    $scope.orderParams.uid = $scope.GetQueryString('uid');
    $scope.orderParams.subject = $scope.GetQueryString('name');
    $scope.orderParams.sign = $scope.GetQueryString('sign');
    $scope.data = null;
    $scope.payNow = function () {
      $log.log($scope.orderParams);

      $http.post('http://appserver.hotsports.cn/wechat/pay/generateGymOrder', $scope.orderParams)
        .then(function (response) {
          var data = response.data;
          if (data.result) {
            $scope.data = data.data;
            $scope.invokeWCPay();
          } else {
            $log.log(data);
            $window.alert('数据异常: ' + data.errMsg);
          }
        }, function (response) {
          $window.alert('数据异常: ' + response.data);
        });
    };

    function onBridgeReady() {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId": $scope.data.appId,          //公众号名称，由商户传入
          "timeStamp": $scope.data.timeStamp,  //时间戳，自1970年以来的秒数
          "nonceStr": $scope.data.nonceStr,    //随机串
          "package": $scope.data.package,
          "signType": $scope.data.signType,    //微信签名方式：
          "paySign": $scope.data.paySign       //微信签名
        },
        function (res) {
          if (res.err_msg === "get_brand_wcpay_request:ok") {
            $window.location.href = 'http://service.hotsports.cn/web/payment_success';
          } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          else {
            //$window.alert(res.err_msg);
          }
        }
      );
    }
  });
