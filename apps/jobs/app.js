define(['jquery', 'chrome', 'backbone', 'text!apps/jobs/templates/jobs-tpl.html', 'jqm'], function ($, Chrome, Backbone, Templates) {
  'use strict';
  Templates = $('<div>').html(Templates);        
  var modulepath = null;
  var itemView = null;
  var listView = null;
  
  function init(p) {
    modulepath = p;
    Chrome.loadCss([modulepath+'/css/jobs.css']);
  }
  
  
  function showJobList() {
    $.mobile.loading('show');
    require(['apps/jobs/js/JobListView'], function (JobListView) {
      listView = listView ? listView : new JobListView()
      listView.render();
    });
  }
  
  function showJob(aid){
    $.mobile.loading('show');
    require(['apps/jobs/js/JobView'], function (JobView) {
      itemView = itemView ? itemView : new JobView()
      itemView.setItemId(aid);
      itemView.render();
    });
  }
  
  var router = {
    routes: {
      'jobs/details/:aid'   : 'showJob',
      'jobs'                : 'showJobList'      
    },
    showJobList: showJobList,    
    showJob: showJob
  }
  
  return {
    router:router,
    init:init
  };
});