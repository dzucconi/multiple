_.mixin({
  getParams: function() {
    var href = window.location.href;

    return href.slice(href.indexOf("?") + 1).split("&").reduce(function(obj, pair) {
      var kv = pair.split("=");

      obj[kv[0]] = kv[1];

      return obj;
    }, {});
  }
});

(function(exports) {
  "use strict";

  var Occurrence, Countdown, App;

  Occurrence = function(params) {
    this.year    = params.year    || "1900";
    this.month   = params.month   || "January";
    this.day     = params.day     || "01";
    this.hour    = params.hour    || "00";
    this.minute  = params.minute  || "00";
    this.second  = params.second  || "00";
    this.format  = params.format  || "YOWDHMS";
    this.bgcolor = params.bgcolor || "#FFFFFF";
    this.color   = params.color   || "#000000";
  };

  Occurrence.prototype.toDate = function() {
    return new Date(
      this.month   +
      this.day     + "," +
      this.year    + " " +
      this.hour    + ":" +
      this.minute  + ":" +
      this.second
    );
  };

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
        bgcolor:  "#000000",
        color:    "#ffffff"
      });

      $("body").css({
        backgroundColor: options.bgcolor,
        color: options.color
      }).fitText(1.5);
    },

    initialize: function() {
      var occurrence, options;

      occurrence = new Occurrence(_.getParams());

      options = _.pick(occurrence, "format");
      options[new Date() > occurrence.toDate() ? "since" : "until"] = occurrence.toDate();

      exports.countdown = new Countdown($("#count"), options);

      this.displayOptions(_.pick(occurrence, "color", "bgcolor"));
    }
  };

  $(function() { App.initialize(); });
}(this));
