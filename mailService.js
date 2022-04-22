
var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept"
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use(express.json())

app.get('/test', (req, res) => {
    return new Promise((resolve, reject) => {




        let transporter = nodemailer.createTransport({
            pool: true,
            host: "smtp.ethereal.email",

            port: 465,
            secure: true,
            service: 'Gmail',

            auth: {
                user: 'asacademy5401@gmail.com', // generated ethereal user
                pass: 'asad5401', // generated ethereal password
            },
        });


        var readHTMLFile = function (path, callback) {
            fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
                if (err) {
                    callback(err);
                    throw err;

                }
                else {
                    callback(null, html);
                }
            });
        };

var data=
    [
        {
            productName:'Head Phone',
            productQuantity:"1",
            productPrice:1900,
            productImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpe8K4W5fZflWxjmWdzbF74HaHgS6reC6Jw&usqp=CAU'
        },
        {
            productName:'Control',
            productQuantity:"1",
            productPrice:4500,
            productImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSHk0IZ4ie8-SpLaWXTV9hsZ_OHHZc9oLpZw&usqp=CAU'
        },
        {
            productName:'Jumanji',
            productQuantity:"2",
            productPrice:2750,
            productImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPxfiv5HasckWxPkemhgHnd0RQsFKXDW6OeQ&usqp=CAU'
        },
        {
            productName:'Battle Field',
            productQuantity:"5",
            productPrice:3000,
            productImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUKAV2EimRumHWhTduZK8o2PO1cZstNObQkw&usqp=CAU'
        }
      
    ]
        readHTMLFile(__dirname + "/message.html", function (err, html) {
            if (html) {
                var template = handlebars.compile(html);
                var replacements = {
                    username: "asad",
                    resetLink: `http://www.youtube.com`
                };
                handlebars.registerHelper("each", function(context, options) {
                    var ret = "";
                  
                    for (var i = 0, j = data.length; i < j; i++) {
                        console.log(data[i])
                      ret = ret + options.fn(data[i]);
                    }
                  
                    return ret;
                  });
                var htmlToSend = template(replacements);
                let options = {
                    from: "asacademy5401@gmail.com", // sender address
                    to: 'asadali5401@gmail.com', // list of receivers
                    subject: `Venture Games Order Details`, // Subject line
                    html: htmlToSend

                };
                transporter.sendMail(options)
                    .then((res) => {
                        return resolve (res)
                    })
                    .catch((err) => {
                        return reject (err)
                    })
  
            }
            else {
                console.log(err)
            }
        });

    })
})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server is running on ${PORT}`))