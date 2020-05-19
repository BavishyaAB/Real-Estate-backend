const express = require('express')
const router = express.Router();
const user = require('../models/user');
const bcrypt = require('bcryptjs')
var nodemailer = require('nodemailer');

router.post('/signin', (req, res) => {
    console.log(req.body)
    user.find({ contact: req.body.contact}, (findErr, findDocs) => {
        if (findErr) {
            res.json({
                success: false,
                message: 'DB error'
            })
        } else {
            if(findDocs.length == 0){
                res.json({
                    success:false,
                    message: 'No Username found'
                })
            } else {
                bcrypt.compare(req.body.password, findDocs[0].password,(compareErr, compareStatus)=>{
                    if(compareErr){
                        res.json({
                            success: false,
                            message: 'DB Error'
                        })
                    } else {
                        if(compareStatus){
                            res.json({
                                success: true,
                                message: 'Logged In Successfull',
                                user: findDocs[0]
                            })
                        } else {
                            res.json({
                                success: false,
                                message: 'Invalid Password'
                            })
                        }
                    }
                })
            }
        }
    })
})
router.post('/register', (req, res) => {
    console.log(req.body)
    bcrypt.genSalt(10, (saltError, salt) => {
        bcrypt.hash(req.body.password, salt, (hashError, hash) => {

            let newUser = new user({
                name: req.body.name,
                password: hash,
                email_id: req.body.email_id,
                contact: req.body.contno,
                addr: req.body.addr
            })

            newUser.save((saveError, saveData) => {
                console.log(saveError)
                if (saveError) {
                    res.json({
                        success: false,
                        message: 'DB Error'
                    })
                } else {
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'bavishya13@gmail.com',
                            pass: 'babbi1331'
                        }
                    });
                    var mailOptions = {
                        from: 'bavishya13@gmail.com',
                        to: req.body.email_id,
                        subject: 'Thanks for Registering!!',
                        text: 'You have successfullly been registered with us. Your username is : ' + req.body.email_id + " || Password : " + req.body.password
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    res.json({
                        success: true,
                        message: 'User Registered!'
                    })
                }
            })
        })
    })
})
module.exports = router