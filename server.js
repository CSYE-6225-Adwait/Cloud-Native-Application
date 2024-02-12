import {initialize} from './apps/app.js';

const startServer = async () => {
    const port = 3000;
    const app = await initialize();
    app.listen(port, () => console.log('Server is listening at port 3000'));
  };
  
  startServer();