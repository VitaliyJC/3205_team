import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';

interface IData {
  email: string;
  number: string;
}

const app = express();
const PORT = 4444;

app.use(cors());
app.use(bodyParser.json());

const data: IData[] = JSON.parse(
  fs.readFileSync('./data.json', { encoding: 'utf-8' }),
);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidNumber = (number: string): boolean => {
  const numberRegex = /^\d{6}$/;
  return numberRegex.test(number);
};

app.get('/search', async (req: Request, res: Response) => {
  const email = req.query.email as string;
  const number = req.query.number as string;

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (number && !isValidNumber(number)) {
    return res.status(400).json({ error: 'Invalid number format' });
  }

  await delay(0);

  const filteredData = data.filter(
    (item: IData) =>
      item.email.includes(email) && (!number || item.number.includes(number)),
  );

  res.json(filteredData);
});

app.listen(PORT, (err?: Error) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server OK! port:${PORT}`);
});
