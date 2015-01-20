angular.module(PKG.name + '.commons')
  .directive('myMetricPicker', function (MyDataSource, $stateParams, $log) {

    var dSrc = new MyDataSource();

    function MetricPickerCtrl ($scope) {

      $scope.available = {
        contexts: [],
        names: []
      };

      $scope.metric = {
        context: '',
        name: ''
      };

    }

    return {
      restrict: 'E',

      require: 'ngModel',

      scope: {},

      templateUrl: 'metric-picker/metric-picker.html',

      controller: MetricPickerCtrl,

      link: function (scope, elem, attr, ngModel) {

        function fetchAhead () {
          var val = scope.metric.context || $stateParams.namespace;

          if(!val) { // should never happen, except on directive playground
            val = 'default';
            $log.warn('metric-picker using default namespace!');
          }

          scope.available.contexts = dSrc.request(
            {
              method: 'POST',
              _cdapPath: '/metrics/search?target=childContext' +
                '&context=' + encodeURIComponent(val)
            }
          );

          if(val) {
            scope.available.names = dSrc.request(
              {
                method: 'POST',
                _cdapPath: '/metrics/search?target=metric' +
                  '&context=' + encodeURIComponent(val)
              }
            );
          }
          else {
            scope.available.names = [];
          }

        }

        var onBlurHandler = ngModel.$setTouched.bind(ngModel);
        elem.find('button').on('blur', onBlurHandler);
        elem.find('input').on('blur', onBlurHandler);

        scope.$watchCollection('metric', function (newVal, oldVal) {

          ngModel.$validate();

          if(newVal.type !== oldVal.type) {
            scope.metric.context = '';
            scope.metric.name = '';
            fetchAhead();
            return;
          }

          if(newVal.context !== oldVal.context) {
            scope.metric.name = '';
            fetchAhead();
          }

          if(newVal.context && newVal.name) {
            var parts = [
              '/metrics',
              newVal.type,
            ];
            if(newVal.context) {
              parts.push(newVal.context);
            }
            parts.push(newVal.name);

            ngModel.$setViewValue(parts.join('/'));
          }
          else {
            if(ngModel.$dirty) {
              ngModel.$setViewValue(null);
            }

          }

        });

        fetchAhead();
      }
    };
  });
