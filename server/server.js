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

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
  app.use(allowCrossDomain);

app.param('lessons', (req, res, next, collectionName) => {
	req.collection = db.collection(collectionName)
	return next()
})

app.param('users', (req, res, next, collectionName) => {
	req.collection = db.collection(collectionName)
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

app.get('/activity/:users', (req, res) => {
	req.collection.find({}).toArray((e, results) => {
	if (e) return next(e)
	res.send(results)
	})
})

// add a users
app.post('/activity/:users', (req, res, next) => {
	// TODO: Validate req.bodyre
	req.collection.insert(req.body, (e, results) => {
	if (e) return next(e)
	res.send(results.ops)
	})
})

// retrieve lesson by ID
const ObjectID = require('mongodb').ObjectID;
app.get('/activity/:lessons/:id', (req, res, next) => {
console.log('searching json object with id:', req.params.id)
req.collection.findOne({ _id: new ObjectID(req.params.id) }, (e, result) => {
if (e) return next(e)
res.send(result)
})
})

// update a lesson by ID
app.put('/activity/:lessons/:id', (req, res, next) => {
req.collection.update({ _id: new ObjectID(req.params.id) },
{ $set: req.body },
{ safe: true, multi: false }, (e, result) => {
if (e) return next(e)
res.send((result.result.n === 1) ? { msg: 'success' } : { msg: 'error' })
})
})

// delete a lesson by ID
app.delete('/activity/:lessons/:id', (req, res, next) => {
req.collection.deleteOne({ _id: ObjectID(req.params.id) }, (e, result) => {
if (e) return next(e)
res.send((result.result.n === 1) ? { msg: 'success' } : { msg: 'error' })
})
})

app.listen(3000, () => {
	
})

