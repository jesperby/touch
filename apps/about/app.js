define(['jquery', 'module', 'chrome', 'ga', 'jqm'], function ($, $self, Chrome, GA) {
  'use strict';

  function init(modulepath) {
  }
  
  var router = {
    routes: {
      'about': 'startPage'
    },
    
    startPage: function(aid){
      GA.pageView('');
      $.mobile.loading('show');
      require(['apps/about/js/InfoPageView'], function (InfoPageView) {
        var view = new InfoPageView;
        view.render();
      });
      
    }
  }
  
  return { 
    router:router,
    init:init
  };
});
