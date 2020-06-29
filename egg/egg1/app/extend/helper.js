'use strict';

const moment = require('moment');

exports.formatTime = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(time || undefined).format(format);
};
