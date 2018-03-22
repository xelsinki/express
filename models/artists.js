/* 
Добавим метод, который будет принимать callback,
находить в базе записи и возвращать в callback в виде err и docs.
Этот метод не знает ничего про сервер, роутинг и API. 
Он работает только с базой и в коллбек отдает данные. 
Что это за callback ему без разницы.
*/

var db = require('../db');

var ObjectID = require('mongodb').ObjectID
// Методы принимают CallBack и передает назад содержимое базы

// GET - all
exports.all = function (cb) {
  db.get().collection('artists').find().toArray(function (err, docs) {
    cb(err, docs);
  });
};

// GET:id - findById
exports.findById = function (id, cb) {
    db.get().collection('artists').findOne({ _id: ObjectID(id) }, function (err, doc) {
      cb(err, doc);
    });
  };

// POST & body - create
  exports.create = function (artist, cb) {
    db.get().collection('artists').insert(artist, function (err, result) {
      cb(err, result);
    })
  }


  // PUT:id & body - update 
  exports.update = function (id, newData, cb) {
    db.get().collection('artists').updateOne(
      { _id: ObjectID(id) },
      newData,
      function (err, result) {
        cb(err, result);
      }
    )
  }

    // DELETE:id - delete 
    exports.delete = function (id, cb) {
        db.get().collection('artists').deleteOne(
          { _id: ObjectID(id) },
          function (err, result) {
            cb(err, result);
          }
        )
      }