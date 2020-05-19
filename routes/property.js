const express = require('express')
const router = express.Router();
const prop = require('../models/property');
var moment = require('moment');

router.post('/regprop', (req, res) => {
    console.log(req.body)
    let newProp = new prop({
                type: req.body.ptype,
                place: req.body.pplace,
                value: req.body.pvalue,
                area: req.body.parea,
                owner: req.body.powner,
                posted_on:moment().format('YYYY-MM-DD HH:mm:ss Z')
            })

            newProp.save((saveError, saveData) => {
                console.log(saveError)
                if (saveError) {
                    res.json({
                        success: false,
                        message: 'DB Error'
                    })
                }else { 
                    res.json({
                        success: true,
                        message: 'Property Registered!'
                    })
                }
            })
})

router.get('/getProperties', (req, res) => {
    prop.find({}).exec((findError, findDocuments) => {
        if (findError) {
            res.json({
                success: false,
                message: 'DB Error'
            })
        } else {
            res.json({
                success: true,
                message: findDocuments
            })
        }
    })
})

module.exports = router