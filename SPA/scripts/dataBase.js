const MongoClient = require('mongodb').MongoClient;
const dbURI = 'mongodb+srv://FoOkySNick:12345qwerty@fookysnick-gj64j.gcp.mongodb.net/test?retryWrites=true';
const db = 'final-app';

function catchError(err, client, cb) {
  if (err) {
    console.error(err);
    client.close();
    cb({code: 400, error: err});
    return true;
  } else return false;
}

function okActions(logMessage, client, cb, results) {
  console.log(logMessage);
  client.close();
  if (results) {
    cb({code: 200, status: 'OK', results: results});
  } else {
    cb({code: 200, status: 'OK'});
  }
}

function catchNotFoundError(results, client, cb) {
  if (results.length === 0) {
    console.log('Data was not found in database, creating 404 \'NOT FOUND\' status..');
    client.close();
    cb({code: 404, status: 'NOT FOUND'});
    return true;
  } else return false;
}

class DataBase {
  static insertOne(data, collection,  cb) {
    const client = new MongoClient(dbURI, { useNewUrlParser: true });

    return client.connect(err => {
      if (!catchError(err, client, cb)) {
        client.db(db).collection(collection).insertOne(data, function(err, results){
          if (!catchError(err, client, cb)) {
            okActions('Data was just inserted in database, creating 200 OK status..', client, cb);
          }
        });
      }
    });
  }

  static insertMany(data, collection, cb) {
    const client = new MongoClient(dbURI, { useNewUrlParser: true });

    return client.connect(err => {
      if (!catchError(err, client, cb)) {
        client.db(db).collection(collection).insertMany(data, function(err, results){
          if (!catchError(err, client, cb)) {
            okActions('Data was just inserted in database, creating 200 OK status..', client, cb);
          }
        });
      }
    });
  }

  static selectAll(collection, cb) {
    const client = new MongoClient(dbURI, { useNewUrlParser: true });

    return client.connect(err => {
      if (!catchError(err, client, cb)) {
        client.db(db).collection(collection).find().toArray(function(err, results){
          if (!catchError(err, client, cb)) {
            if (!catchNotFoundError(results, client, cb)) {
              okActions('Data was found in database, creating 200 OK status, adjusting results..', client, cb, results);
            }
          }
        });
      }
    });
  }

  static selectSome(collection, skip, delta, cb) {
    const client = new MongoClient(dbURI, { useNewUrlParser: true });

    return client.connect(err => {
      if (!catchError(err, client, cb)) {
        client.db(db).collection(collection).find().skip(skip).limit(delta).toArray(function (err, results) {
          if (!catchError(err, client, cb)) {
            if (!catchNotFoundError(results, client, cb)) {
              okActions('Data was found in database, creating 200 OK status, adjusting results..', client, cb, results);
            }
          }
        })
      }
    });
  }

  static sortSomeFromDB(collection, skip, delta, sorter, cb) {
    const client = new MongoClient(dbURI, { useNewUrlParser: true });

    return client.connect(err => {
      if (!catchError(err, client, cb)) {
        client.db(db).collection(collection)
          .find().skip(skip).limit(delta).sort(sorter).toArray(function (err, results) {
          if (!catchError(err, client, cb)) {
            if (!catchNotFoundError(results, client, cb)) {
              okActions('Data was found in database, creating 200 OK status, adjusting results..', client, cb, results);
            }
          }
        })
      }
    });
  }

  static selectSomeFiltered(filter, collection, skip, delta, cb) {
    const client = new MongoClient(dbURI, { useNewUrlParser: true });

    return client.connect(err => {
      if (!catchError(err, client, cb)) {
        client.db(db).collection(collection)
          .find(filter).skip(skip).limit(delta).toArray(function (err, results) {
          if (!catchError(err, client, cb)) {
            if (!catchNotFoundError(results, client, cb)) {
              okActions('Data was found in database, creating 200 OK status, adjusting results..', client, cb, results);
            }
          }
        })
      }
    });
  }

  static selectFiltered(filter, collection, cb){
    const client = new MongoClient(dbURI, { useNewUrlParser: true });

    return client.connect(err => {
      if (!catchError(err, client, cb)) {
        client.db(db).collection(collection).find(filter).toArray(function(err, results){
          if (!catchError(err, client, cb)) {
            if (!catchNotFoundError(results, client, cb)) {
              okActions('Data was found in database, creating 200 OK status, adjusting results..', client, cb, results);
            }
          }
        });
      }
    });
  }

  static updateDB(updated, field, collection, cb) {
    const client = new MongoClient(dbURI, { useNewUrlParser: true });

    return client.connect(err => {
      if (!catchError(err, client, cb)) {
        client.db(db).collection(collection).updateOne(updated, {$set: field});
        okActions('Data was just updated in database, creating 200 OK status..', client, cb)
      }
    });
  }

  static getId(id){
    try {
      const ObjectId = require('mongodb').ObjectId;
      return {
        _id: new ObjectId(id)
      }
    } catch (e) {
      return {
        invalid: true
      }
    }

  }
}

module.exports = {
  DataBase
};
