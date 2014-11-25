import formatNumberHelper from 'accounting/helpers/format-number';
import formatMoneyHelper from 'accounting/helpers/format-money';
import Ember from 'ember';

export var initialize = function(/* container, app */) {
  Ember.Handlebars.registerBoundHelper('format-number', formatNumberHelper);
  Ember.Handlebars.registerBoundHelper('format-money', formatMoneyHelper);
};

export default {
  name: 'ember-cli-accounting',

  initialize: initialize
};
