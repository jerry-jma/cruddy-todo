const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // var id = counter.getNextUniqueId();
  // items[id] = text;

  counter.getNextUniqueId((err, id) => {
    if (err) {
      callback(err);
    } else {
      fs.writeFile(`./test/testData/${id}.txt`, text, () => {
        callback(null, { id, text });
      });
      // console.log(id , 'HERES THE UNIQUE ID $$$$$$$');
    }
  });

  // callback(null, { id, text });
  // create
  // 1) should create a new file for each todo
  // 2) should use the generated unique id as the filename
  // 3) "before each" hook: cleanTestDatastore
  // 4) should only save todo text contents in file

};

exports.readAll = (callback) => {
  fs.readdir('./test/testData/', (err, files) => {
    if (err) {
      callback(err);
    } else {
      var data = _.map(files, (text, id) => {
        return {
          id: text.split('.')[0],
          text: text.split('.')[0]
        };
      });
      callback(null, data);
    }
  });
  // lagggg

  //[ '00001.txt', '00002.txt' ]
  //      "id": "00001"
  //   "text": "00001"


  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
};
//https://nodejs.org/docs/latest-v15.x/api/fs.html#fs_fs_readdir_path_options_callback




exports.readOne = (id, callback) => {

  fs.readFile(`./test/testData/${id}.txt`, 'utf8', (err, text) => {
    if (!text) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, { id, text });
    }
  });




  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
};

// fs.readfile
// https://nodejs.org/docs/latest-v15.x/api/fs.html#fs_fspromises_readfile_path_options

exports.update = (id, text, callback) => {

  fs. access(`./test/testData/${id}.txt`, fs.F_OK, (err) => {
    if (err) {
      callback(err);
    } else {
      fs.writeFile(`./test/testData/${id}.txt`, text, (err) => {
        console.log('id', id, 'text', text, 'updatessssss');
        if (err) {
          callback(new Error(`No item with id: ${id}`));
        } else {
          callback(null, { id, text });
        }
      });
    }
  });
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
};

//fs.writefile

exports.delete = (id, callback) => {
  // var item = items[id];
  // delete items[id];

  fs.unlink(`./test/testData/${id}.txt`, (err) => {
    if (err) {
      // report an error if item not found
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback();
    }

  });
};

//fs.unlink?
//https://nodejs.org/docs/latest-v15.x/api/fs.html#fs_fspromises_unlink_path

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
