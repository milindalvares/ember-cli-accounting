import formatMoney from '../format-money';

export default function formatMoneyHelper(value, options) {
  return formatMoney(value, options.hash);
}
