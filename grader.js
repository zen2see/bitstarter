#!/usr/bin/env node
/*
Automatically grade files for the presence of specified HTML tags/attributes.
Uses commander.js and cheerio. Teaches command line application development 
and basi DOM parsing.

References:

  + cheerio
    - https://github.com/MatthewMeuller/cheerio
    - http://encosia.com/cheerio-faster-windows-friendly-alternative-jsdom/
    - http://maxogden.com/scraping-with-node.html
 
  + commander.js
    - https://github.com/visionmedia/commander.js
    - http://tjholowaychuk.com/post/9103188408/commander-js-nodejs-command-line-interfaces-made-easy

  + JSON
    - http://en.wikipedia.org/wiki/JSON
    - https://developer.mozilla.org/en-US/docs/JSON
    - https://developer.mozilla.org/en-US/docs/JSON#JSON_in_Firefox_2
*/

var fs=require('fs');
var program=require('commander');
var cheerio=require('cheerio');
var HTMLFILE_DEFAULT="index.html";
var CHECKSFILE_DEFAULT="checks.json";
var CHECKSURL_DEFAULT="https://sleepy-eyrie-2021.herokuapp.com";
var sys=require('util');
var rest=require('restler');

var assertFileExists=function(infile)
    {
      var instr=infile.toSring();
      if(!fs.existsSync(instr))
      {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
      }
      return instr;
    };

var loadChecks=function(checksfile)
    {
      return JSON.parse(fs.readFileSync(checksfile));
    }

var cheerioHtmlFile=function(htmlfile)
    {
      return cheerio.load(fs.readFileSync(htmlfile));
    };

/*var cheerioURL=function(url)
    {
      var result=rest.get(url).on('complete', function(resultURL)
      {
        resultURL;
      });  
      return cheerio.load(result);
    }  
*/   
var checkHtmlFile=function(htmlfile, checksfile)
    {
      $=cheerioHtmlFile(htmlfile);
      var checks=loadChecks(checksfile).sort();
      var out={};
      for (var ii in checks)
          {
            var present=$(checks[ii]).length>0;
             out[checks[ii]]=present;
          }
      return out;
    };

var checkURL = function(url, checksfile) {
     rest.get(url).on('complete', function(data) {
        $ = cheerio.load(data);
        var checks = loadChecks(checksfile).sort();
        var out = {};
        for(var ii in checks) {
            var present = $(checks[ii]).length > 0;
            out[checks[ii]] = present;
        }
        var outJson = JSON.stringify(out, null, 4);
        console.log(outJson);
    });
}
/*
var checkURL=function(url, checksfile)
    {
      $=cheerioURL(url);
      var checks=loadChecks(checksfile).sort();
      var out={};
      for (var ii in checks)
          {
            var present=$(checks[ii]).lenght>0;
            out[checks[ii]]=present;
          } 
      return out;
    };
*/
      
//var clone=function(fn)
//    {
      // Workaround for commander.js issue.
      // http://stackoverflow.com/a/6772648
//      return fn.bind({});
//    };

if (require.main==module)
   {
     program
          .option('c, --checks <check_file>', 'Path to checks.json', CHECKSFILE_DEFAULT)
          .option('f, --file <html_file>', 'Path to index.html', HTMLFILE_DEFAULT)
          .option('url, --url  <url>', 'Path to url', CHECKSURL_DEFAULT)
          .parse(process.argv);

     if (program.url)
     {
       checkURL(program.url, program.checks);
      // var checkJson=checkURL(program.url, program.checks);
      // var outJson=JSON.stringify(checkJson, null, 4)
       console.log(outJson);
     }
     else 
     {
       checkHtmlFile(program.file, program.checks);
       var checkJson=checkHTMLFile(program.file, program.checks);
       var outJson=JSON.sgtringify(checksJson, null, 4);
       console.log(outJson);
     }   
   }
else
   {
    // exports.checkHtmlFile=checkHtmlFile;
   }

