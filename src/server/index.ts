import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { getRecommendations } from '../api/get-recommendations';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/get-recommendations', async (req, res) => {
  try {
    const recommendations = await getRecommendations(req.body);
    res.json(recommendations);
  } catch (error) {
    console.error('Error in /api/get-recommendations:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 