var express = require('express');   //Express Web Server 
var bodyParser = require('body-parser'); //connects bodyParsing middleware
var formidable = require('formidable');
var path = require('path');     //used for file path
var fs =require('fs-extra');    //File System-needed for renaming file etc

var app = express();

app

    .use(express.static('./public'))
    .use(express.static(path.join(__dirname, 'public')))

    .use(bodyParser({defer: true}))
    .post('/upload',function (req, res, next) {

      var form = new formidable.IncomingForm();
        //Formidable uploads to operating systems tmp dir by default
        form.uploadDir = "public/img";       //set upload directory
        form.keepExtensions = true;     //keep file extension

        var upload_dir = form.uploadDir+'/';
        form.parse(req, function(err, fields, files) {

            var path_dir = files.file.path;

            //Formidable changes the name of the uploaded file
            //Rename the file to its original name
            fs.rename(files.file.path, upload_dir+files.file.name, function(err) {
            if (err)
                throw err;
                console.log( 'orig name::' + files.file.path );
                console.log( upload_dir+files.file.name );
                res.send({'hi' : 123});
              //res.send(files.fileUploaded.path, './img/'+files.fileUploaded.name);  
            });
              //res.end();
        });
    })
    .get('*', function (req, res) {

         res.sendfile('public/main.html');

    })
    .listen(5000);

