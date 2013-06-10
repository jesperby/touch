define(['jquery', 'module', 'chrome', 'ga', 'jqm'], function ($, $self, Chrome, GA) {
  'use strict';

  function init(modulepath) {
    Chrome.loadCss([modulepath+'/css/report.css']);
  }
  
  var router = {
    routes: {
      'report': 'reportPage',
      'report/:typeid/:poiid': 'reportPage',
      'report/success' : 'reportPageSuccess',
      'report/error' : 'reportPageError'
    },
    
    reportPage: function(lat, lng){
      GA.pageView('');
      $.mobile.loading('show');
      require(['apps/report/js/ReportPageView'], function (ReportPageView) {
        var view = new ReportPageView({"lat":lat, "lng":lng});
        view.render();
      });
    },

    reportPageSuccess: function(){
      GA.pageView('reportSuccess');
      $.mobile.loading('show');
      require(['apps/report/js/ReportPageSuccessView'], function (ReportPageSuccessView) {
        var view = new ReportPageSuccessView();  
        view.render();
      });
    },

    reportPageError: function(){
      GA.pageView('reportError');      
      $.mobile.loading('show');
      require(['apps/report/js/ReportPageErrorView'], function (ReportPageErrorView) {
        var view = new ReportPageErrorView();         
        view.render();
      });
    }
  }
  
  return { 
    router:router,
    init:init
  };
});
