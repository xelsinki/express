/* 
Новые методы принимают PATH и вызывают подходящий метод контроллера

*/

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

// Подсоединяем controller
var artistsController = require('./controllers/artists');

// Для парсинга BODY запроса
app.use(bodyParser.json()); // Для парсинга JSON
app.use(bodyParser.urlencoded({ extended: true })); // Для парсинга FORM




// Описывая роут, мы описываем, что будет происходить, когда мы зайдем на определенный урл.
app.get("/", function(req, res) {
  res.send("Hello API");
});



// GET - Роут возвращает весь список
app.get('/artists', artistsController.all);

// GET - с  параметром ID
app.get('/artists/:id', artistsController.findById);

// POST метод
app.post('/artists', artistsController.create);

// PUT метод
app.put('/artists/:id', artistsController.update);

// DELETE метод
app.delete('/artists/:id', artistsController.delete);



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
