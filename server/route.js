const path = require('path');

module.exports = app => {
    app.get("/api", (req, res) => {
        res.json({ message: '👋 from Express!' });
    });
  
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });
};