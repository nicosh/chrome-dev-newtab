const archiver = require('archiver');
const fs = require('fs');
const output = fs.createWriteStream('extension.zip');
const archive = archiver('zip', {
  zlib: { level: 9 }, // Sets the compression level.
});

output.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});
archive.pipe(output);
archive.directory('dist/', false);
archive.finalize();
