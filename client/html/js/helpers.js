UI.registerHelper('date', function(ts) {
  if (!ts)
    return false;

  return moment(parseInt(ts) * 1000).format('DD MMM YYYY, hh:mm');
});
