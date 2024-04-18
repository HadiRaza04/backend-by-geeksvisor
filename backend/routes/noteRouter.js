const express = require('express')
const noteRouter = express.Router();

noteRouter.get('/', (req, res) => {
    res.status(200).send("Note Get req")
})
noteRouter.post('/', (req, res) => {
    res.status(200).send("Note Post req")
})
module.exports = noteRouter;