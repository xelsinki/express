var express = require("express");

// Для того чтобы использовать POST надо парсить BODY, для этого нужна эта библиотека
var bodyParser = require("body-parser");
// Импорт MongoDB
var MongoClient = require("mongodb").MongoClient;
// Для конвертации ID в mongo
var ObjectID = require("mongodb").ObjectID;

// необходимо создать переменную app, которая и будет являтся нашим сервером.
var app = express();

// Выносим DB в другой файл
var db = require("./db");

// Для парсинга BODY запроса
app.use(bodyParser.json()); // Для парсинга JSON
app.use(bodyParser.urlencoded({ extended: true })); // Для парсинга FORM

// Описывая роут, мы описываем, что будет происходить, когда мы зайдем на определенный урл.
app.get("/", function(req, res) {
  res.send("Hello API");
});

//GET - Роут возвращает весь список
app.get("/artists", function(req, res) {
  // Метод запрашивает все записи коллекции и передает их массивом
  db
    .get()
    .collection("artists")
    .find()
    .toArray(function(err, docs) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(docs);
    });
});

//GET -  Добавим Роут для артистов с  параметром ID
app.get("/artists/:id", function(req, res) {
  // Так как в mongo ID генерируется сам, запроснужно обернуть в ObjectID
  db
    .get()
    .collection("artists")
    .findOne({ _id: ObjectID(req.params.id) }, function(err, doc) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(doc);
    });
});

// POST метод
app.post("/artists", function(req, res) {
  // Создаем объект параметр name берем из BODY
  var artist = {
    name: req.body.name
  };
  // Добавляем в коллекцию объект
  db
    .get()
    .collection("artists")
    .insert(artist, (err, result) => {
      // обработка ошибки
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(artist);
    });
});

// PUT метод
app.put("/artists/:id", function(req, res) {
  // Метод изменяет запись в коллекции
  db
    .get()
    .collection("artists")
    .updateOne(
      // ID отсылается в params
      { _id: ObjectID(req.params.id) },
      // Имя отсылается в BODY
      { name: req.body.name },
      function(err, result) {
        // Обработка ошибок
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        //Отправляем назад статус ОК
        res.sendStatus(200);
      }
    );
});

// DELETE метод
app.delete("/artists/:id", function(req, res) {
  // Метод удаляет запись в коллекции
  db
    .get()
    .collection("artists")
    .deleteOne({ _id: ObjectID(req.params.id) }, function(err, result) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      //Отправляем назад статус ОК
      res.sendStatus(200);
    });
});

// Подключение к MongoDB
db.connect("mongodb://localhost:27017/test", function(err) {
  if (err) {
    return console.log(err);
  }
  //Запуск сервера, Слушаем порт 3012 и пишем в консоль 'API app started'
  app.listen(3012, function() {
    console.log("API app started");
  });
});
