_.mixin({
  getParams: function() {
    var href = window.location.href;

    return href.slice(href.indexOf("?") + 1).split("&").reduce(function(obj, pair) {
      var kv = pair.split("=");

      obj[kv[0]] = kv[1];

      return obj;
    }, {});
  },

  toDate: function(options) {
    return new Date(
      options.month   +
      options.day     + "," +
      options.year    + " " +
      options.hour    + ":" +
      options.minute  + ":" +
      options.second
    );
  }
});

(function(exports) {
  "use strict";

  var Countdown, App;

  Countdown = function(el, options) {
    self = this;

    this.options = _.defaults(options, {
      compact:        true,
      format:         "YOWDHMS",
      timeSeparator:  "<span class='blink'>:</span>",
      onExpiry:       function() { _.defer(self.reset.bind(self)); }
    });

    this.el = el;

    this.el.countdown(this.options);
  };

  Countdown.prototype.reset = function() {
    console.log("reset");

    this.options["since"]   = this.options.until;
    this.options            = _.omit(this.options, "until");

    this.el.countdown("destroy").countdown(this.options);
  };

  App = {
    displayOptions: function(options) {
      options = _.defaults(options, {
        bgcolor:  "#ffffff",
        color:    "#000000"
      });

      $("body").css({
        backgroundColor:  options.bgcolor,
        color:            options.color
      }).fitText(1.5);
    },

    initialize: function() {
      var params, date, options, countdown;

      params = _.defaults(_.getParams(), {
        year:   "1900",
        month:  "January",
        day:    "01",
        hour:   "00",
        minute: "00",
        second: "00"
      });

      date = _.toDate(params);

      options = _.pick(params, "format");
      options[new Date() > date ? "since" : "until"] = date;

      countdown = new Countdown($("#count"), options);

      this.displayOptions(_.pick(params, "color", "bgcolor"));
    }
  };

  $(function() { App.initialize(); });
}(this));
