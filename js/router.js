define(['jquery', 'underscore', 'backbone', 'jqm'], 
  function($, _, Backbone) {
    'use strict';
    
    function show404() {
      alert('Kunde inte hitta sidan');
      document.location.hash = '';
    }
    
    var globalRoutes = {
      routes: {
        '*invalidRoute': 'show404'
      },
      show404   : show404
    };
    
    
    var Router = function() {
      var extend = function(apps, cb) {
        apps = apps || {};

        cb = cb || function(){};
        var br = Backbone.Router,
            router,
            app,
            appname;
        
        // Apply global routes
        router = br.extend(globalRoutes);
        new router();

        for (appname in apps) {
          router = br.extend(apps[appname].router);
          new router();
        }
        cb();
      };
      
      return {
        extend:extend
      };
    };


    return Router;
});




