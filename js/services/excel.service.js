var XLSX = require('xlsx');

angular.module('app')
.factory('excelService', ['contactDB', function(contactDB) {
  
  var contactsError = [];
  function saveContact(contact) {
    var item = {
      name: contact['FULL NAME '],
      address: contact['COUNTRY '],
      phoneNum: contact['PHONE NUMBER '],
      email: contact['EMAIL ADDRESS ']
    };
    contactDB.save(item)
    .then(function(res) {

    }, function() {
      contactsError.push(item);
    });
  }

  function handleContactsFromXLSX(contacts) {
    contacts.forEach(function(contact) {
      saveContact(contact);
    });
  }

  function importToDB(path) {
    var reg = /.(xlsx)|(xls)$/;
    if(!reg.test(path)) return false;

    var workbook = XLSX.readFile(path);
    var sheet_name_list = workbook.SheetNames;
    sheet_name_list.forEach(function(y) { /* iterate through sheets */
      var worksheet = workbook.Sheets[y];
      var contacts = XLSX.utils.sheet_to_json(worksheet);
      handleContactsFromXLSX(contacts);
    });
  }

  return {
    importToDB: importToDB
  };
}]);