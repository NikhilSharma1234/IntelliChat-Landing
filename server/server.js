require('dotenv').config({path: './../.env'});
const stripe = require('stripe')(process.env.VITE_STRIPE_KEY);
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, DynamoDBDocumentClient, UpdateCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({region: 'us-east-1'});
const docClient = DynamoDBDocumentClient.from(client);

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));

const DOMAIN = 'http://localhost:5173/payments'; // frontend here

async function updateUserSubscription(username, subscriptionId) {
  const command = new UpdateCommand({
    TableName: 'Customers',
    Key: {
      "username": username
    },
    UpdateExpression: 'SET subscriptionId = :subscriptionId',
    ExpressionAttributeValues: {
      ':subscriptionId': { S: subscriptionId },
    },
  });

  await docClient.send(command);
}

async function getUserByUsername(username) {
  const command = new GetCommand({
    TableName: 'Customers',
    Key: {
      "username": username
    }
  });

  const resp = await docClient.send(command);

  if (!resp.Item) {
    return null
  } else {
    return username
  }
}

app.post('/create', async (req, res) => {
  const { username } = req.body;

  if (username === "") {
    return res.sendStatus(500);
  }
  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    console.log('err');
    return res.status(400).json({ message: 'User already exists.' });
  }

  const newUser = {
    username: username,
    subscriptionId: null,
  };

  const command = new PutCommand({
    TableName: 'Customers',
    Item: newUser,
  });

  try {
    await docClient.send(command);
    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'An error occurred while creating the user.' });
  }
});

app.post('/checkout', async (req, res) => {
  // const { username } = req.body;
  // console.log(username);

  // const user = await getUserByUsername(username);

  // if (!user) {
  //   return res.status(404).json({ message: 'User not found.' });
  // }
  
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.VITE_PREMIUM_PLAN_ID,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${DOMAIN}?success=true`,
    cancel_url: `${DOMAIN}?canceled=true`,
  });

  // await updateUserSubscription(username, session.subscription);
  res.redirect(303, session.url);
});

app.post('/cancel', async (req, res) => {
  const { username } = req.body;

  try {
    const user = await getUserByUsername(username);

    if (!user || !user.subscriptionId) {
      return res.status(404).json({ message: 'User not found or subscription not found.' });
    }

    await stripe.subscriptions.update(user.subscriptionId, {
      cancel_at_period_end: true,
    });

    await updateUserSubscription(username, null);

    res.json({ message: 'Subscription canceled successfully.' });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({ message: 'An error occurred while canceling the subscription.' });
  }
});

app.post('/plan', async (req, res) => {
  const { username } = req.body;

  try {
    const user = await getUserByUsername(username);

    if (!user || !user.subscriptionId) {
      return res.status(404).json({ plan: 'free' });
    }

    const command = new GetCommand({
      TableName: 'Customers',
      Key: {
        "username": username
      }
    });
  
    const resp = await docClient.send(command);
  
    if (!resp.Item) {
      return null
    } else if (resp.Item.subscriptionId != null) {
      res.status(200).json({ plan: 'premium' });
    } else {
      res.status(200).json({ plan: 'free' });
    }
  } catch {
    res.status(500).json({ plan: 'free' });
  }
});
app.listen(4242, () => console.log('Running on port 4242'));