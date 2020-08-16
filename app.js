const fetch = require('node-fetch')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connUrl = process.env.CONN_URL;
const dbName = process.env.DB_NAME



// Create a new MongoClient
MongoClient.connect(connUrl, { useUnifiedTopology: true, useNewUrlParser: true }, (err, client) => {
  if(err){
    console.log("unable to connect, reason: ")
    console.log(err)
  }
  else
  console.log("Connected successfully to server");

  const db = client.db(dbName);

mong = {
  select: async function(collection, statement){
    return new Promise(function(resolve, reject) {
      try{
        db.collection(collection).find(statement).toArray()
        .then(result => {
          client.close();
          return resolve(result)
        })
        .catch(err => {
          throw err;
          client.close();
        })
      }
      catch(e){
        console.log("erro na função select: " + e)
        client.close();
      }
    })
  },

  insert: async function(collection, statement){
    return new Promise(function(resolve, reject) {
      try{
        db.collection(collection).insertOne(statement)
        .then(result => {
          client.close();
          console.log('insert: ')
          return resolve(result.ops)
        })
        .catch(err => {
          throw err;
          client.close();
        })
      }
      catch(e){
        console.log("erro na função insert: " + e)
        client.close();
      }
    })
  },

  delete: async function(collection, statement){
    return new Promise(function(resolve, reject) {
      try{
        db.collection(collection).findOneAndDelete(statement)
        .then(result => {
          client.close();
          console.log('delete: ')
          return resolve(result.value)
        })
        .catch(err => {
          throw err;
          client.close();
        })
      }
      catch(e){
        console.log("erro na função insert: " + e)
        client.close();
      }
    })
  },

  update: async function(collection, statement, newvalue){
    return new Promise(function(resolve, reject) {
      try{
        db.collection(collection).findOneAndUpdate(statement, {$set: newvalue })
        .then(result => {
          client.close();
          return resolve({result,newvalue})
        })
        .catch(err => {
          throw err;
          client.close();
        })
      }
      catch(e){
        console.log("erro na função insert: " + e)
        client.close();
      }
    })
  },
};

  (async () =>{
    let ass = await mong.select('channels',{})
    console.log(ass)
  })();

});
