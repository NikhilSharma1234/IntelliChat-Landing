require('dotenv').config({path: './../.env'});
const stripe = require('stripe')(process.env.VITE_STRIPE_KEY);
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, DynamoDBDocumentClient, UpdateCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({region: 'us-east-1'});
const docClient = DynamoDBDocumentClient.from(client);

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from frontend
  methods: 'GET,POST',
}));

const YOUR_DOMAIN = 'http://localhost:5173/payments'; // frontend here

async function updateUserSubscription(username, subscriptionId) {
  const command = new UpdateCommand({
    TableName: 'Customers',
    Key: {
      "username": {
        S: username
      } 
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
  try {
    console.log(req.body);
  } catch (err) {
    console.log(err);
  }

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
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  //await updateUserSubscription(username, session.subscription);

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

app.listen(4242, () => console.log('Running on port 4242'));