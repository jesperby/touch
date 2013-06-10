define(['jquery', 'backbone', 'chrome', 'apps/events/js/EventModel.js', 'text!apps/events/templates/events-tpl.html'], function ($, Backbone, Chrome, EventModel, Templates) {
  'use strict';
  Templates = $('<div>').html(Templates);

  var View = Backbone.View.extend({
    model: null,
    catid: null, 
    initialize: function(info) {
      this.model = new EventModel(info.catid, info.catlabel, info.eid);
      this.catid = info.catid;
      if(!this.model.loaded) {
        var that = this;
        this.model.fetch().success(function(){
          that.render();
        });
      } else {
        this.render();
      }

    },

    template: _.template(Templates.find('#eventTemplate').html()),

    render: function() {
      var html = this.template({event:this.model.get('content'), catid:this.catid});      
      Chrome.showPage( Chrome.parseHTML(html) );
    }
  });
  
  return View;
});
