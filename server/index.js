const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpush = require('web-push');

const app = express()

const keys = {
	"publicKey":"BLfO5YRiabfAFvqzmwpKos58YGqvxfPaX3LI6xHQLurEDOZZJJema4MJ0Z7xKtNDmi7uI1xNVsRp-h7__akbEyE",
	"privateKey":"3KLnRSjdZxVmcadACx8I_d9B5yJkLlaQiLSFHo09s38"
};

const fakeDatabase = []

app.use(cors())
app.use(bodyParser.json())

webpush.setVapidDetails('mailto:radaxter@gmail.com', keys.publicKey, keys.privateKey)

app.post('/subscription', (req, res) => {
	const subscription = req.body
	fakeDatabase.push(subscription)
})

app.post('/sendNotification', (req, res) => {
	const notificationPayload = {
    notification: {
      title: 'New Notification',
      body: 'This is the body of the notification',
      icon: 'assets/icons/icon-512x512.png',
    },
  }

  const promises = []
  fakeDatabase.forEach(subscription => {
    promises.push(
      webpush.sendNotification(
        subscription,
        JSON.stringify(notificationPayload)
      )
    )
  })
  console.log(fakeDatabase)
  Promise.all(promises).then(() => res.sendStatus(200))
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})