import formatNumberHelper from 'accounting/helpers/format-number';
import formatMoneyHelper from 'accounting/helpers/format-money';
import Ember from 'ember';

var helper = (Ember.HTMLBars || Ember.Handlebars).helper;

export var initialize = function(/* container, app */) {
  helper('format-number', formatNumberHelper);
  helper('format-money', formatMoneyHelper);
};

export default {
  name: 'ember-cli-accounting',

  initialize: initialize
};
