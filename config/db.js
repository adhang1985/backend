const mongoose = require('mongoose');

const Connection = async(un,pw) => {
    await mongoose.connect(`mongodb+srv://${un}:${pw}@cluster0.shpergc.mongodb.net/todoDB`)
    .then(() => {
        console.log('Connected to db');
    })
    .catch(() => {
        console.log('Not connected to db');
    })
}


module.exports = { Connection };