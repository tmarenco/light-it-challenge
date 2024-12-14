import express from 'express'
import patientRouter from './routes/patient.route';


const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json())
app.use('/patients', patientRouter);
export default app