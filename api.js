import express from 'express';
import cors from 'cors';
import torrentioHandler from './api/torrentio.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/torrentio', torrentioHandler);

app.get('/', (req, res) => {
  res.json({ status: 'ok', endpoints: ['/api/torrentio'] });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});