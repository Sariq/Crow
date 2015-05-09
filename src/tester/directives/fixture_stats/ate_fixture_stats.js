(function () {

  function ateFixture() {
    return {
      restrict: 'E',
      templateUrl: '/static/src/tester/directives/fixture/ate_fixture.html',
      link: function (scope, element, attr) {
        scope.title = 'My gauge';
        scope.titleFontColor = 'blue';
        scope.value = 1234.358;
        scope.valueFontColor = 'red';
        scope.min = 0;
        scope.max = 1337;
        scope.valueMinFontSize = undefined;
        scope.titleMinFontSize = undefined;
        scope.labelMinFontSize = undefined;
        scope.minLabelMinFontSize = undefined;
        scope.maxLabelMinFontSize = undefined;
        scope.hideValue = false;
        scope.hideMinMax = false;
        scope.hideInnerShadow = false;
        scope.width = undefined;
        scope.height = undefined;
        scope.relativeGaugeSize = undefined;
        scope.gaugeWidthScale = 0.5;
        scope.gaugeColor = 'grey';
        scope.showInnerShadow = true;
        scope.shadowOpacity = 0.5;
        scope.shadowSize = 3;
        scope.shadowVerticalOffset = 10;
        scope.levelColors = ['#00FFF2', '#668C54', '#FFAF2E', '#FF2EF1'];
        scope.customSectors = [
          {
            color: "#ff0000",
            lo: 0,
            hi: 750
          },
          {
            color: "#00ff00",
            lo: 750,
            hi: 1000
          },
          {
            color: "#0000ff",
            lo: 1000,
            hi: 1337
          }
        ];
        scope.noGradient = false;
        scope.label = 'Green label';
        scope.labelFontColor = 'green';
        scope.startAnimationTime = 0;
        scope.startAnimationType = undefined;
        scope.refreshAnimationTime = undefined;
        scope.refreshAnimationType = undefined;
        scope.donut = undefined;
        scope.donutAngle = 90;
        scope.counter = true;
        scope.decimals = 2;
        scope.symbol = 'X';
        scope.formatNumber = true;
        scope.humanFriendly = true;
        scope.humanFriendlyDecimal = true;
        scope.textRenderer = function (value) {
          return value;
        };
      }
    }
  }

  angular.module('ate.tester')
    .directive('ateFixture', [ateFixture]);
}());