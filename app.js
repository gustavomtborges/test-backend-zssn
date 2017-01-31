import express from 'express';

const app = express();

app.route('/survivors')
  .get((req, res) => {
    res.json([{
      name: 'Tiao Galinha',
      age: 32,
      gender: 'M',
      location: 'POINT (0 0)',
    }]);
  });

export default app;
