const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { isBlacklisted, BlacklistExist, Blacklist, updateIsBlacklisted } = require('./blacklist/blacklist')

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://swethaHirge:eNbiwvH7LUDppBrx@cluster0.0xins.mongodb.net/Blacklist?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    console.log('Successfully connected to the database.');
  })
  .catch((error) => {
    console.error('Error connecting to the database: ', error);
  });
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('index');
});

// Route to add a number to the blacklist
app.post('/blacklist', async (req, res) => {
  const number = req.body.number
  if (!number) {
    return res.status(400).json({ error: 'Number is required' }).end();
  }
  if (!(/^\+\d{1,3}\d{10}$/.test(number)) && !(/^\d{10}$/.test(number))) {
    return res.status(400).json({ error: 'Number is invalid' }).end();
  }
  try {
    const existing = await BlacklistExist(number);
    if (existing) {
      const updated = await updateIsBlacklisted(number);
      if (updated) {
        return res.json({ message: 'Number status updated in the blacklist' }).end();
      } else {
        return res.status(400).json({ error: 'Failed to update number status in the blacklist' }).end();
      }
    }
    const blacklist = await Blacklist({ number });
    if (blacklist) {
      return res.json({ message: 'Number added to blacklist' }).end();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to add number to blacklist' }).end();
  }
});


// Route to check if a number is blacklisted
app.post('/check-blacklist', async (req, res) => {
  const number = req.body.number;
  if (!number) {
    return res.status(400).json({ error: 'Number is required' });
  }
  if (!(/^\+\d{1,3}\d{10}$/.test(number)) && !(/^\d{10}$/.test(number))) {
    return res.status(400).json({ error: 'Number is invalid' });
  }
  try {
    const isBlocked = await isBlacklisted(number);
    if (isBlocked) {
      res.json({ message: 'Number is blacklisted' });
    } else {
      res.json({ message: 'Number is not blacklisted' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to check blacklist' });
  }
});

app.listen(8086, () => {
  console.log('Server running on port 8086');
});