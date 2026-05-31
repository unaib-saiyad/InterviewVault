import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

import authRoutes from './routes.js/authRoutes.js';
import companyRoutes from './routes.js/company.routes.js';
import roleRoutes from './routes.js/role.routes.js';
import sourceRoutes from './routes.js/source.routes.js';
import interviewRoutes from './routes.js/interview.routes.js';
import interviewRoundRoutes from './routes.js/interviewRound..routes.js';
import interviewQuestionRoutes from './routes.js/interviewQuestion.routes.js';

dotenv.config();

const app = express();
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to InterviewVault API');
});

app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/sources', sourceRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/interviews/rounds', interviewRoundRoutes);
app.use('/api/interviews/questions', interviewQuestionRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});