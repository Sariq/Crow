(function () {
  function LanguageService(gettextCatalog,ProfileService) {
    var service = {
      uiLanguage: 'en',
      languages: [
        {_id: 'en', name: 'English', native: 'English'},
        {_id: 'he', name: 'Hebrew', native: 'Hebrew'},
        {_id: 'ru', name: 'Russian', native: 'Russian'}
      ]
    };
    service.setUiLanguage = function (lang_code) {
      service.uiLanguage = lang_code;
      gettextCatalog.setCurrentLanguage(lang_code);
      ProfileService.setUiLanguage(lang_code)
    };
    service.getLanguages = function () {
      return service.languages;
    };
    service.getuiLanguage = function () {
      console.log('service.uiLanguage = '+service.uiLanguage);

      return service.uiLanguage;
    };
    return service
  }


  angular.module('ate.common')
    .service('LanguageService', ['gettextCatalog','ProfileService', LanguageService]);
}());
