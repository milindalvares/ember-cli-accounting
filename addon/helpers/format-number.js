import formatNumber from '../format-number';

export default function formatNumberHelper(params, options) {
  var value = params[0];
  return formatNumber(value, options);
}
