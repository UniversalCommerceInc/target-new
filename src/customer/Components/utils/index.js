function formatNumber(number) {
  return Number(number / 100).toLocaleString();
}

function cx(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

module.exports = {
  formatNumber,
  cx,
};
