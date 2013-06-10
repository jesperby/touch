define(['jquery', 'backbone'], function ($, Backbone) {
  
  var EventModel = Backbone.Model.extend({
    catlabel: '',
    eid: '',
    loaded: false,
    initialize: function(catid, catlabel, eid) {
      this.catlabel = catlabel;
      this.eid = eid;
    },    
    url: function() {
      return 'http://webapps2.malmo.se/evenemang/EventGuide/View/'+this.catlabel+'/'+this.eid;
    },
    sync: function(method, model, options){  
      options.dataType = "text";
      return Backbone.sync(method, model, options);  
    },
    parse: function(response) {
      this.loaded = true;
      return {content:response};
    }
  });
  
  return EventModel;
});
