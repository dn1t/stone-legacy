const intercept = require('intercept-stdout');

intercept(() => {
  if (text.includes('Duplicate atom key')) return '';
  else return text;
});

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
};
