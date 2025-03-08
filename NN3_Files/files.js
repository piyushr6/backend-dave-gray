const fs = require('fs');

//reading files
fs.readFile('./docs/blog.txt', (err, data) => {
   if (err) {
      console.log(err);
   }
   console.log(data.toString());
});

//writing files
fs.writeFile('./docs/blog2.txt', 'hello world', () => {
   console.log("file was written");
});

// .mkdir and rmdir


//Buffer is a packet of data that is passed to endpoint in batches and not all at once, eg yotube
