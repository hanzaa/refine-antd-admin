const express = require('express')
const router = express.Router()
const multer = require('multer')
const auth = require('../middleware/auth')
const accountsController = require('../accounts/accounts.controller')
const { upload } = require('../middleware/multer')

router.get('/', (req,res) => {res.status(200).send("Welcome Page")})

router.post('/login',accountsController.login)

// router.use(auth.verifyToken)

//Accounts Routes
router.get('/accounts',accountsController.listAccounts)
router.post('/accounts',accountsController.createAccount)
router.get('/accounts/:id',accountsController.showAccount)
router.patch('/accounts/:id',accountsController.updateAccount)
router.delete('/accounts/:id',accountsController.deleteAccount)

router.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).send(req.file)
})

module.exports = router