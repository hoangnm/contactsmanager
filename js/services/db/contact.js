(function() {
  var Datastore = require('nedb');

  angular.module('app')
  .factory('contactDB', ['$q', function($q) {
    var db = new Datastore('./db/contacts.db');
    db.loadDatabase();
    
    function find(name, key) {
      var defer = $q.defer();
      var regex = new RegExp(name, 'i');
      var query = {};
      query[key] = regex;
      db.find(query).sort({name: 1})
      .exec(function (err, docs) {
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
      var query = {
        name: data.name,
        phoneNum: data.phoneNum,
        address: data.address,
        email: data.email
      };
      db.findOne(query, function (err, doc) {
        if(!doc) {
          db.insert(data, function (err, newDoc) {
            if(!err) {
              defer.resolve(newDoc);
            }
            defer.resolve({error: err});
          });
        } else {
          defer.resolve({error: err});
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
    
    function update(data) {
      var defer = $q.defer();
      db.update({_id: data._id}, data, function(err, numReplaced) {
        if(!err) {
          defer.resolve(numReplaced);
        }
        defer.reject(err);
      });
      return defer.promise;
    }

    function saveMultiple(contacts) {
      var promises = [];
      for (var i in contacts) {
        promises.push(save(contacts[i]));
      }
      return $q.all(promises).catch(function(err) {
        console.log(err);
      });
    }
    return {
      find: find,
      findById: findById,
      save: save,
      remove: remove,
      update: update,
      saveMultiple: saveMultiple
    };
  }]);
})();