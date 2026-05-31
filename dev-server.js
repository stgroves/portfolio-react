import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());

const DATA_DIR = path.resolve('./local-data');
fs.mkdirSync(DATA_DIR, {recursive: true});

app.post('/api/save', (req, res) => {
    const {key, data} = req.body;

    fs.writeFileSync(
        path.join(DATA_DIR, `${key}.json`),
        data
    );

    res.json({ok: true});
});

app.get('/api/load/:key', (req, res) => {
    const file = path.join(DATA_DIR, `${req.params.key}.json`);

    if (!fs.existsSync(file)) return res.json(null);

    res.json(JSON.parse(fs.readFileSync(file).toString()));
});

app.listen(3001);