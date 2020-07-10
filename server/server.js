const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.set('port', 3000)

const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
	db = client.db('activity')
})

app.param('lessons', (req, res, next, lessons) => {
	req.collection = db.collection(lessons)
	return next()
})

app.get('/', (req, res, next) => {
	res.send("API noises")
})

app.get("/activity/:lessons", (req, res, next) => {
	req.collection.find({}).toArray((e, results) => {
	if (e) return next(e)
	res.send(results)
	})
})

app.listen(3000, () => {
	
})

