// Configure requirejs
require.config({
    baseUrl: '/touch',
    paths: {
        paginator:  'js/lib/backbone.paginator', 
        jquery:     'js/lib/jquery-1.9.1.min',
        jqm:        'js/lib/jquery.mobile-1.3.0.min',
        jqvalidate: 'js/lib/jquery.validate.min',
        underscore: 'js/lib/underscore-min-1.4.4',
        backbone:   'js/lib/backbone-min-0.9.10',
        text:       'js/lib/require/text',
        noext:      'js/lib/require/noext',
        json:       'js/lib/require/json',
        async:       'js/lib/require/async',
        chrome:     'js/chrome',
        apploader:  'js/apploader',
        jqmconfig:  'js/jqm-config',
        router:     'js/router',
        locator:    'js/locator',        
        apps:       'apps',
        ga:         'js/ga',
        gmaps:      'js/gmaps',
        conf:       'js/config', 
        support:    'js/support'
    },
    shim: {
        underscore: {
          exports: '_'
        },
        backbone: {
          deps: ["underscore", "jquery"],
          exports: "Backbone"
        }
    }
});

// Bootstrap

define(['apploader','jqmconfig'], function(AppLoader) {
  $(document).on('ready', function() {
    AppLoader.initialize();
  });    
});

