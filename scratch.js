const { db } = require('./controllers/models/firebase');
async function test() {
  const s = await db.collection('users').limit(1).get();
  s.forEach(doc => console.log(doc.data()));
  process.exit(0);
}
test();
