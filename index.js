const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = 8080;
const joi = require('joi');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

const { schema } = require('./schema');
const { apiCall } = require("./model")

app.get("/pincode", async(req, res) => {

    const data = req.body;
    const joi_error = joi.validate(data,schema);
    if (joi_error.error===null){
        apiCall(data,(err, result) =>{
            if(err){
                res.send(err);
            }else{
                res.send(result)
            }
        })
    }else{
        res.send(joi_error.error.details);
    }

})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})