var express = require('express');

// Для того чтобы использовать POST надо парсить BODY, для этого нужна эта библиотека
var bodyParser = require('body-parser');
// Импорт MongoDB
var MongoClient = require('mongodb').MongoClient;

// необходимо создать переменную app, которая и будет являтся нашим сервером.
var app = express();

var db;

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
    }, 
    {
        id: 4,
        name: 'Leningrad'
      },
      {
        id: 5,
        name: 'Lady Gaga'
      }
  ];

// Описывая роут, мы описываем, что будет происходить, когда мы зайдем на определенный урл.
app.get('/', function (req, res) {
    res.send('Hello API');
  });

  // Так подключают движок PUG
  app.engine('pug', require('pug').__express);

 // Теперь нам нужно настроить сервер, чтобы он был запущен на определенном порту. Для этого добавим



// Добавим Роут для артистов
app.get('/artists', function (req, res) {
    res.send(artists);
  });

  // Добавим Роут для артистов с каким-то параметром
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
      name: req.body.name
    };
  
    db.collection('artists').insert(artist, (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(artist);
    });
  });

  // POST метод
//   app.post('/artists', function (req, res) {
//     var artist = {
//       id: Date.now(),
//       name: req.body.name
//     }
//     artists.push(artist);
//     res.send(artist);
//   })
  
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
//   app.listen(3012, function () {
//     console.log('API app started');
//   });

// Подключение к MongoDB
MongoClient.connect('mongodb://localhost:27017/myapi', function (err, database) {
  if (err) {
    return console.log(err);
  }
  db = database;
  // Слушаем порт 3012 и пишем в консоль 'API app started'
  app.listen(3012, function () {
    console.log('API app started');
  })
})