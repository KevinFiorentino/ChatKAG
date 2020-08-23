const express = require('express')
const app = express()
const port = 8080

const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

app.get('/', (req, res) => {
    let result;

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);

        const db = client.db('chatkag');
        const collection = db.collection('chatkag');

        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs[0]["_id"], docs[0]["nombre"])

            result = docs[0]["_id"] + " " + docs[0]["nombre"];
        });

        client.close();
 
    });


    setTimeout(() => {

        res.send(result);

    }, 2000);
    
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

