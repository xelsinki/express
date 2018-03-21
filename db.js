/* 
Модуль - обертка вокруг MongoDB
Проверяет наличие подключения
Экспортирует доступ к базе в методе get()  
*/
var MongoClient = require('mongodb').MongoClient;

// Делаем STATE, в котором храним данные о соединении с базой
var state = {
  db: null
};

// Делаем CONNECT singlton, если он есть, то не открываем другой а пользуемся этим 
exports.connect = function (url, done) {
  if (state.db) {
    return done();
  }
// Если CONNECT NULL, то устанавлеваем соединение с базой
  MongoClient.connect(url, function (err, db) {
    if (err) {
      return done(err);
    }
    state.db = db;
    done()
  });
}
// Метод возвращает базу
exports.get = function () {
    return state.db;
  }