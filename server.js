import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const RETELL_API_KEY = 'key_547888f29aaed443db2e1512ae5e';

app.post('/create-web-call', async (req, res) => {
    try {
        const { agentId } = req.body;

        if (!agentId) {
            return res.status(400).json({ error: 'agentId is required' });
        }

        const response = await fetch('https://api.retellai.com/v2/create-web-call', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RETELL_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                agent_id: agentId,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json(error);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error creating web call:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Retell backend running on port ${PORT}`);
});
