const https = require('follow-redirects').https;
const fs = require('fs');
const smartZip = require("smart-zip");
const base_url = 'https://redirector.gvt1.com/edgedl/widevine-cdm/'
const widevine_current = base_url.concat('current.txt');
const arch = 'x64';
const output_directory = "output";
 
https.get(widevine_current, function (response) {
  response.on('data', function (chunk) {
    const version = chunk.toString();
    const output_filename = version.concat('-linux-').concat(arch).concat('.zip');

    const request = https.get(base_url.concat(output_filename), function(response) {
      smartZip.unzipFromStream(response, output_directory, function (error) {
        if (error) {
          throw error;
        }
        console.log('Stream unziped.');
      });
    });

  });
}).on('error', function (err) {
  console.error(err);
});
