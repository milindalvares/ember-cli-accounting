import formatNumberHelper from 'accounting/helpers/format-number';
import formatMoneyHelper from 'accounting/helpers/format-money';
import Ember from 'ember';

var registerHelper = Ember.HTMLBars._registerHelper || Ember.HTMLBars.registerHelper;
var makeBoundHelper = Ember.HTMLBars.makeBoundHelper;

export var initialize = function(/* container, app */) {
  registerHelper('format-number', makeBoundHelper(formatNumberHelper));
  registerHelper('format-money', makeBoundHelper(formatMoneyHelper));
};

export default {
  name: 'ember-cli-accounting',

  initialize: initialize
};
