define(['jquery', 'backbone', 'chrome', 'apps/events/js/EventCategoryCollection.js', 'text!apps/events/templates/events-tpl.html'], function ($, Backbone, Chrome, EventCategoryCollection, Templates) {
  'use strict';
  Templates = $('<div>').html(Templates);
  var pad = function(n){ return n<10 ? '0'+n : n; };

  var View = Backbone.View.extend({
    today: '',
    tomorrow: '',
    
    setDates: function() {
      var date = new Date();
      this.today = date.getFullYear() +'-'+ pad(date.getMonth()+1) +'-'+ pad(date.getDate());
      date.setDate(date.getDate()+1);
      this.tomorrow = date.getFullYear() +'-'+ pad(date.getMonth()+1) +'-'+ pad(date.getDate());
    },
    
    collection:EventCategoryCollection,
    initialize: function() {
      this.setDates();
      if(!this.collection.loaded) {
        var that = this;
        this.collection.fetch().success(function(){
          that.render();
        });
      } else {
        this.render();
      }
    },

    template: _.template(Templates.find('#eventCategoryListTemplate').html()),

    render: function() {
      var html = this.template({categories: this.collection.toJSON(), today:this.today, tomorrow:this.tomorrow, catAllId:2478});
      Chrome.showPage( Chrome.parseHTML(html) );
    }
    
  });
  
  return View;
});  