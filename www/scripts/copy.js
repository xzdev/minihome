const copy = require('copy');
const resourceFiles = [
    'favicon.ico',
    'robots.txt',
];

copy.each(resourceFiles, 'dist', function(err, files) {
    console.log(`Copy files ${[...resourceFiles]} success?`, !err);
});