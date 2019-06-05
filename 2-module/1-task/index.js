const LimitSizeStream = require('./LimitSizeStream');
const fs = require('fs');

const limitedStream = new LimitSizeStream({limit: 8}); // 8 байт
const outStream = fs.createWriteStream('out.txt');

outStream.on('end', (chunk) => {
  // console.log(chunk);
});


limitedStream.pipe(outStream);

limitedStream.write('hello'); // 'hello' - это 5 байт, поэтому эта строчка целиком записана в файл

setTimeout(() => {
  limitedStream.write('world'); // ошибка LimitExceeded! в файле осталось только hello
}, 10);