(function () {
  function ThemeService($rootScope, ProfileService) {
    var service = {
      themes:[ 'cerulean','cosmo','cyborg','darkly','flatly','journal','lumen','paper',
        'readable','sandstone','simplex','slate','spacelab','superhero',
      'united','yeti']
    };
    $rootScope.theme = 'cerulean';
    service.setTheme= function(theme){
      ProfileService.setTheme(theme);
      //to be removed
      $rootScope.theme = theme;
    };
    service.getThemes = function(){
      return service.themes;
    };
    service.getTheme = function(){
      ProfileService.getTheme();
    };
    return service
  }
  angular.module('ate.common')
    .service('ThemeService',['$rootScope','ProfileService',ThemeService]);
}());
