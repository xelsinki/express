/* 
    Контроллер принимает аргументы req, res и вызывает метод модели
    и попутно проверяет на ошибку.
    Контроллер отвечает за работу с реквестом и респонзом,
    но он ничего не знает о базе данных и откуда берутся данные.
*/

var Artists = require('../models/artists');
var ObjectID = require('mongodb').ObjectID;

// Экспортируем GET all
exports.all = function (req, res) {
  Artists.all(function (err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};

// Экспортируем GET by ID - - получает id
exports.findById = function (req, res) {
    Artists.findById(req.params.id, function (err, doc) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(doc);
    });
  };

  //POST method - получает name
  exports.create = function (req, res) {
    var artist = {
      name: req.body.name
    };
    Artists.create(artist, function (err) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);  // Отсылает статус ОК
      //res.send(artist);   // или Отсылает артиста назад  
    });
  };

  //PUT method - получает id & name
  exports.update = function (req, res) {
    var newData = {
      name: req.body.name
    }
    Artists.update(req.params.id, newData, function (err) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
      
    });
  };

  //DELETE method - получает id
  exports.delete = function (req, res) {
    Artists.delete(req.params.id, function (err) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    })
  }