const express = require('express')
var router = express.Router()
var multer = require('multer')
var uniqid = require('uniqid')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/temp')
  },
  filename: function (req, file, cb) {
    cb(null, uniqid() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

router.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

})

module.exports = router