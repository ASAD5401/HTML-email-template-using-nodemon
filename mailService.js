// var nodemailer = require('nodemailer');
// var handlebars = require('handlebars');
// const UserModel = require("../models/user.model")
// const mongoose = require("mongoose")
// const { userSchema } = require("../schema/user")
// var fs = require('fs');

// findOne = (body) => {
//     return new Promise(async (resolve, reject) => {
//         const user = mongoose.model("Users", userSchema)
//         user.findOne(body).lean().then(async (res) => {

//             resolve(res)

//         }).catch(err => {
//             console.log(err)
//             reject(err)
//         })

//     })
// }

// var readHTMLFile = function(path, callback) {
//     fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
//         if (err) {
//            callback(err); 
//            throw err;

//         }
//         else {
//             callback(null, html);
//         }
//     });
// };

// function SendMail(email,token){
//     return new Promise(async(resolve,reject)=>{

//     const userData = await findOne({Email:email})
//     var transporter = nodemailer.createTransport({
//         pool: true,
//         host: "axewcloud.com",
//         port: 465,
//         secure: true, // use TLS
//         auth: {
//           user: "asadali5401@gmail.com",
//           pass: "Affan1996",
//         },
//       });



// readHTMLFile(__dirname+"/mail.html", function(err, html) {
//     if(html){
//     var template = handlebars.compile(html);
//     var replacements = {
//          username: "asad",
//          resetLink:`http://www.axewcloud.com/reset-password/${token}`
//     };
//     var htmlToSend = template(replacements);

//     var mailOptions = {
//         from:"asadali5401@gmail.com",
//         to: "hannankhan7987@gmail.com",
//         subject: "AxewCloud - Reset Password",
//         html : htmlToSend
//     }
//     transporter.sendMail(mailOptions, function (error, info) {
//         console.log(info)
//         if (error) {
//           console.log(error);
//           reject(500)
//         } else {
//             resolve(200)
//         }
//       });
//     }
//     else{
//         console.log(err)
//     }
// });

// })
// }

// module.exports = SendMail






// const { application } = require('express')
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
// let a = 'saad'
// let asad=document.getElementById('asad')
// asad.innerHTML = ""
// asad.innerHTML+=`<h2>${a}</h2>`
// document.getElementById("asad").innerHTML = "I have changed!"
app.use(express.json())
mongoose.connect('mongodb+srv://saadkhan:saadkhan@cluster0.fquu7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(() => console.log("connection succesfull")).catch((error) => console.log(error))
const student = mongoose.model('Students', {
    name: {
        type: String,
        required: true
    },
    rollno: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
})


app.post('/student', async (req, res) => {
    const { name, email, phone, rollno, address } = req.body
    console.log(name, email, phone, rollno, address)
    if (!name || !email || !phone || !rollno || !address) {
        return (res.status(500).send("plz fill all fields")
        ) //422 is for unprocessible entity
    } else {
        const userExist = await student.findOne({ rollno: rollno })
        if (userExist) {
            console.log("exsists")

            return (res.status(400).send("student already exsists"))

        } else {

            const table = new student({ name, email, phone, rollno, address })
            table.save().then(() => {
                console.log("student registered successfully"); res.status(200).send('OK')
            }).catch((error) => { console.log(error) })
        }
    }
})


app.get('/students', async (req, res) => {
    const documents = await student.find()
    console.log(documents)
    res.send(documents)
})

app.get('/student/:id', async (req, res) => {
    const student_rollno = req.params.id
    const document = await student.findOne({ _id: student_rollno })
    if (document) {
        res.send(document)
    } else {
        res.send("No student with this id exists")
    }
    console.log(document)
})



app.delete('/student/:id', async (req, res) => {
    const student_rollno = req.params.id
    student.findByIdAndRemove(student_rollno, (err, data) => {
        if (!err) {
            res.send("Student successfully deleted")
        } else {
            res.status(500).send("No student with this id exists")
        }
    })
})

app.put('/student/:id', (req, res) => {
    const student_rollno = req.params.id
    let updateObj = {}
    if (req.body.name) {
        updateObj.name = req.body.name
    }
    if (req.body.email) {
        updateObj.email = req.body.email
    }
    if (req.body.phone) {
        updateObj.phone = req.body.phone
    }
    if (req.body.address) {
        updateObj.address = req.body.address
    }
    if (req.body.rollno) {
        updateObj.rollno = req.body.rollno
    }
    console.log(updateObj)
    student.findByIdAndUpdate(student_rollno, updateObj, { new: true }, (err, data) => {
        if (!err) {
            res.status(200).send("Student successfully updated")
        } else {
            res.status(500).send("No student with this id exists")
        }
    })

})
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
                // transporter.sendMail(options, function (err, res) {
                //     if (err) {
                //         reject(err);
                //         return
                //     }
                //     resolve('email sent')
                //     // res.end()

                // })
            }
            else {
                console.log(err)
            }
        });

    })
})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server is running on ${PORT}`))