const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('mongodb')
const util = require('util')

const port = process.env.PORT | 3000
const url = "mongodb://mongodb:27017/mydb"

const app = express()
app.use(bodyParser.json())

const connect = util.promisify(mongo.connect)

app.get('/', (req, res) => {
  res.send('Server running: try getList and addItem methods')
})

app.get('/getList', async (req, res) => {
  res.write('List Items:')
  res.write('<ul>')

  await connect(url)
    .then((db) => {
      const dbo = db.db("mydb")
      return new Promise((resolve, reject) => {
        dbo.collection("items").find({}).toArray(function(err, result) {
          if (err) reject(err)
          console.log(result)
          result.forEach(({ _id: id, a, b }) => res.write(`<li>${id}: ${a}, ${b}</li>`))
          db.close()
          resolve()
        })
      })
    })
  res.write('</ul>')
  res.end()
})

app.post('/addItem', async (req, res) => {

  console.log('req.body', req.body)
  await connect(url)
    .then((db) => {
      const dbo = db.db("mydb")
      const newItem = req.body
      return new Promise((resolve, reject) => {
        dbo.collection("items").insertOne(newItem, function(err, res) {
          if (err) reject(err)
          console.log("1 document inserted")
          db.close()
          resolve()
        })
      })
    })
  res.sendStatus(200)
})

app.listen(port, () => {
  connect(url)
  .then((db) => {
    console.log("Collection created!")
    const dbo = db.db("mydb")

    dbo.createCollection("items", function(err, res) {
      if (err) {
        if(err.code === 48){
          console.log("Collection already exists!")
        } else {
          throw er
        }
      } else {
        console.log("Collection created!")
      }
      db.close()
    })
  })
  console.log(`docker-test-server app listening at http://localhost:${port}`)
})