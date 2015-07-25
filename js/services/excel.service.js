var XLSX = require('xlsx');

angular.module('app')
.factory('excelService', ['contactDB', '$q', function(contactDB, $q) {
  
  var contactsError = [];
  function saveContact(contact) {
    var item = {
      name: contact['FULL NAME'],
      address: contact['COUNTRY'],
      phoneNum: contact['PHONE NUMBER'],
      email: contact['EMAIL ADDRESS']
    };
    return contactDB.save(item)
    .catch(function(err) {
      console.log(err);
    });
  }

  function handleContactsFromXLSX(contacts) {
    var promises = [];
    contacts.forEach(function(contact) {
      promises.push(saveContact(contact));
    });
    return $q.all(promises)
    .catch(function() {});
  }

  function importToDB(path) {
    var promises = [];
    var reg = /.(xlsx)|(xls)$/;
    if(!reg.test(path)) return false;

    var workbook = XLSX.readFile(path);
    var sheet_name_list = workbook.SheetNames;
    sheet_name_list.forEach(function(y) { /* iterate through sheets */
      var worksheet = workbook.Sheets[y];
      var contacts = XLSX.utils.sheet_to_json(worksheet);
      promises.push(handleContactsFromXLSX(contacts));
    });
    return $q.all(promises)
    .catch(function(err) {
      console.log(err);
    });
  }

  return {
    importToDB: importToDB
  };
}]);