(function () {
  function ProfileService($http, gettextCatalog) {
    var service = {
      profile: {
        language: 'en',
        theme: 'cerulean'
      }
    };

    service.setDefaults = function () {
      if (!service.profile.language) {
        service.profile.language = 'en';
      }
      if (!service.profile.theme) {
        service.profile.theme = 'cerulean';
      }


    };
    service.applyProfile = function (){
      gettextCatalog.setCurrentLanguage(service.profile.language);
    };


    service.loadProfile = function (userId) {
      $http.get('/tester/api/profile?userid=' + userId)
        .success(function (data) {
          if (data.status == 0) {
            service.profile = data.data;
            service.setDefaults();
            service.applyProfile();
          } else {
            console.log(data);
          }
        })
    };
    service.saveProfile = function () {
      $http.put('/tester/api/profile', service.profile)
        .success(function (data) {
          if (data.status == 0) {
            console.log('update profile success');
          } else {
            console.log(data);
          }
        })
    };
    service.setUiLanguage = function (lang) {
      service.profile.language = lang;
      service.saveProfile();
    };
    service.getUiLanguage = function (lang) {
      return service.profile.language;
    };
    service.setTheme = function (theme) {
      service.profile.theme = theme;
      service.saveProfile();
    };
    service.getTheme = function (theme) {
      return service.profile.theme;
    };


    return service
  }


  angular.module('ate.common')
    .service('ProfileService', ['$http','gettextCatalog', ProfileService]);
}());
