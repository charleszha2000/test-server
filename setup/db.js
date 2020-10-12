const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27018';
const client = new MongoClient(url, { useNewUrlParser: true });

client.connect(err => {
  const db = client.db("CharlesZhang_M5")
  let myobj = [
    { name: 'Jon Jafari', quote: 'Fool me once, I\'m mad. Fool me twice, how could you? Fool me three times, you\'re officially that guy, okay?'},
    { name: 'Jeremy Elbertson', quote: 'If you can\'t love me at my worst, obey your thirst. Sprite.'},
    { name: 'Hikigaya Hachiman', quote: 'Hard work betrays none, but dreams betray many.'},
    { name: 'Yu Ishigami', quote: 'I want to die, so I\'m going home.'},
    { name: 'Kanye West', quote: 'Nothing in life is promised except death.'},
    { name: 'Kaguya Shinomiya', quote: 'I did it with my newborn nephew, it was videotaped. Good times.'}
  ];
  db.collection("quotes").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    client.close();
  });
});