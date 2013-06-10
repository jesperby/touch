({
    baseUrl: ".",
    name: "js/main",
    paths: {
        jquery:     'js/lib/jquery-1.9.1.min',
        jqm:        'js/lib/jquery.mobile-1.3.0.min', 
        jqvalidate: 'js/lib/jquery.validate.min',
        underscore: 'js/lib/underscore-min-1.4.4',
        backbone:   'js/lib/backbone-min-0.9.10',
        text:       'js/lib/require/text',
        noext:      'js/lib/require/noext',
        json:       'js/lib/require/json',
        chrome:     'js/chrome',
        apploader:  'js/apploader',
        router:     'js/router',
        locator:    'js/locator',        
        apps:       'apps',
        jqmconfig:  'js/jqm-config',
        ga:         'js/ga',
        gmaps:      'js/gmaps',
        support:    'js/support'      
    },
    
    out: "application.js"
})
