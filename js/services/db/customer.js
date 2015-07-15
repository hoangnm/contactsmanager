(function() {
  var Datastore = require('nedb');

  angular.module('app')
  .factory('customerDB', ['$q', function($q) {
    var db = new Datastore('./db/customers.db');
    db.loadDatabase();
    
    function find(name, key) {
      var defer = $q.defer();
      var regex = new RegExp(name, 'i');
      var query = {};
      query[key] = regex;
      db.find(query, function (err, docs) {
        if(!err) {
          defer.resolve(docs);
        }
        defer.reject(err);
      });
      return defer.promise;
    }

    function findById(id) {
      var defer = $q.defer();
      var regex = new RegExp(name, 'i');
      db.findOne({_id: id}, function (err, doc) {
        if(!err) {
          defer.resolve(doc);
        }
        defer.reject(err);
      });
      return defer.promise;
    }
    
    function save(data) {
      var defer = $q.defer();
      db.findOne({phoneNum: data.phoneNum}, function (err, doc) {
        if(!doc) {
          db.insert(data, function (err, newDoc) {
            if(!err) {
              defer.resolve(newDoc);
            }
            defer.reject(err);
          });
        } else {
          defer.reject('Số điện thoại đã tồn tại!');
        }
      });
      return defer.promise;
    }

    function remove(id) {
      var defer = $q.defer();
      db.remove({_id: id}, {}, function(err, numRemoved) {
        if(!err) {
          defer.resolve(numRemoved);
        }
        defer.reject(err);
      });
      return defer.promise;
    }
    
    return {
      find: find,
      findById: findById,
      save: save,
      remove: remove
    };
  }]);
})();