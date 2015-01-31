Package.describe({
  name: 'channikhabra:lazy',
  version: '0.0.1',
  summary: 'Lazy.js wrapper for meteor',
  git: '',
  documentation: 'README.md'
});

Npm.depends({
  'lazy.js' : '0.4.0',
  'babyparse': '0.4.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.addFiles('server.js', 'server');

  api.export(['Lazy', 'Baby'], 'server');
});
