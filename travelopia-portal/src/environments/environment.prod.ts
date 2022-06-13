const { version } = require('../../package.json');

export const environment = {
  ENV: 'PROD',
  production: true,
  baseUrl: '', 
  locale: 'en',
  dateFormat: 'dd/MM/yyyy',
  timeFormat: 'HH:mm',
  version: `V${version}`,
};
