require('dotenv').config()
import {createServer} from 'http';
import {app} from './app';
import {sequelize} from './database/sequelize';

const port = process.env.PORT || 5000;

(async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    //await sequelize.sync({force: true}); DROP DATABASE when server start

    createServer(app)
        .listen(port, startServer);

})();

function startServer() {
    console.log(`Server listen on port ${port}`)
}