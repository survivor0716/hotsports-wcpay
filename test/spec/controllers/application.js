'use strict';

describe('Controller: ApplicationctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('hotsportsWcpayApp'));

  var ApplicationctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ApplicationctrlCtrl = $controller('ApplicationctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(ApplicationctrlCtrl.awesomeThings.length).toBe(3);
  });
});
