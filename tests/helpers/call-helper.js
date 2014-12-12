import Ember from "ember";
var callHelper;

// Helpers receive different arguments in HTMLBars that it used to receive in
// Handlebars.
// This function calls the helper with the proper arguments depending on
// the configured template engine.
if (Ember.HTMLBars) {
  callHelper = function(helper, value, options) {
    return helper([value], options);
  };
} else {
  callHelper = function(helper, value, options) {
    return helper(value, { hash: options });
  };
}

export default callHelper;
