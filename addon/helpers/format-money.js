import formatMoney from '../format-money';

export default function formatMoneyHelper(params, options) {
  var value = params[0];
  return formatMoney(value, options);
}
