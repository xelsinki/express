
/* 
API use array as database

*/

var express = require('express');

// Для того чтобы использовать POST надо парсить BODY, для этого нужна эта библиотека
var bodyParser = require('body-parser');

// необходимо создать переменную app, которая и будет являтся нашим сервером.
var app = express();

// Для парсинга BODY
app.use(bodyParser.json()); // Для парсинга JSON
app.use(bodyParser.urlencoded({ extended: true })); // Для парсинга FORM


var artists = [
    {
      id: 1,
      name: 'Metallica'
    },
    {
      id: 2,
      name: 'Iron Maiden'
    },
    {
      id: 3,
      name: 'Deep Purple'
    }
  ];

// Описывая роут, мы описываем, что будет происходить, когда мы зайдем на определенный урл.
app.get('/', function (req, res) {
    res.send('Hello API');
  });


// GET - Добавим Роут для артистов
app.get('/artists', function (req, res) {
    res.send(artists);
  });

  // GET - Добавим Роут для артистов с каким-то параметром
  app.get('/artists/:id', function (req, res) {
      // ищем артиста по id
    var artist = artists.find(function (artist) {
        // так как параметр String приводим его к типу Number
      return artist.id === Number(req.params.id);
    })
    //пишем в консоль  данные артиста
    console.log(artist);
    //Отправляем данные артиста назад
    res.send(artist);
  });

  // POST метод
  app.post('/artists', function (req, res) {
    var artist = {
      id: Date.now(),
      name: req.body.name
    }
    artists.push(artist);
    res.send(artist);
  })
  
// PUT метод
  app.put('/artists/:id', function (req, res) {
      // Находим артиста по ID как v GET-методе
    var artist = artists.find(function (artist) {
      return artist.id === Number(req.params.id)
    });
    // Изменяем имя артиста на имя пришедшее в PUT-запросе
    artist.name = req.body.name;
    //Отправляем назад статус ОК
    res.sendStatus(200);
    // В консоль можно выводить Status Code & Message или какаю-либо часть ответа Response
    console.log(  "Response status:", res.statusCode, res.statusMessage);
  });

  // DELETE метод
  app.delete('/artists/:id', function (req, res) {
      // В переменную artists передаем тех артистов чей ID не совпадает с пришедшим в запросе
    artists = artists.filter(function (artist) {
      return artist.id !== Number(req.params.id);
    });
    //Отправляем назад статус ОК
    res.sendStatus(200);
  });

// Слушаем порт 3012 и пишем в консоль 'API app started'
  app.listen(3012, function () {
    console.log('API app started');
  });