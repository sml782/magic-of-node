const { MongoClient } = require('mongodb');

(async () => {
  const con = await MongoClient.connect(
    'mongodb://localhost:27017',
    {
      //userNewUrlParser这个属性会在url⾥里里识别验证⽤用户所需的db
      userNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  const db = con.db('test');
  const fruits = db.collection('frits');
  await fruits.insertOne({
    // name：
  })
  console.log(fruits);
})()

