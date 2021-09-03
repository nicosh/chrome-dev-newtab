const archiver = require('archiver');
const fs = require('fs');
const output = fs.createWriteStream('extension.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});
archive.pipe(output);
archive.directory('dist/', false);
archive.finalize();
