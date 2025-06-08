import express from 'express';
import apiRouter from './routes/api';
import { initializeCompanies } from './services/companyService';


const app = express();
const port = 3000;

app.use(express.json());
app.use('/', apiRouter);


console.log('Initializing company sec data..');
initializeCompanies()
    .then(() => console.log('Companies initialized'))
    .catch(error => console.log('Failed to initialize companies.', error));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
