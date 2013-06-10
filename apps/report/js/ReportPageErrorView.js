define(['jquery', 'backbone', 'chrome', 'text!apps/report/templates/report-tpl.html'], function ($, Backbone, Chrome, Templates) {
  'use strict';
  Templates = $('<div>').html(Templates);
    
  var View = Backbone.View.extend({
    el: $('body'),
    

    initialize: function() {   
    },

    template: _.template(Templates.find('#ReportPageErrorTemplate').html()),

    
    render: function() {
      var html = this.template();
      Chrome.showPage( Chrome.parseHTML(html) );
    },
  });
  
  return View;
});