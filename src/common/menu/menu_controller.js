(function () {
  function MenuController(LanguageService, AuthService, ThemeService, ModalHelpService,PreferenceModalService) {
    var self = this;
    self.getLanguages = function () {
      return LanguageService.getLanguages();
    };
    self.setUiLanguage = function (lang_code) {
      return LanguageService.setUiLanguage(lang_code);
    };
    self.getThemes = function () {
      return ThemeService.getThemes();
    };
    self.setTheme = function (theme) {
      return ThemeService.setTheme(theme);
    };

    self.isLoggedIn = function () {
      return AuthService.isLoggedIn();
    };
    self.getUserId = function () {
      return AuthService.getUserId();
    };
    self.logout = function () {
      return AuthService.logout();
    };

    self.hasPermission = function (action) {
      return AuthService.hasPermission(action);
    };

    self.toggleDevMode = function () {

    };

    self.help = function (help_id) {
      ModalHelpService.modalHelp(help_id);
    };

    self.getUsername = function () {
      return AuthService.getUsername();
    };

    self.preference = function(){
     PreferenceModalService.preference();
    };


    return self;
  }

  angular.module('ate.common')
    .controller('MenuController', ['LanguageService', 'AuthService', 'ThemeService',
      'ModalHelpService','PreferenceModalService', MenuController]);
}());

//menu could become a directive.