const express = require('express');
import { GoogleApis } from 'googleapis';
import {google} from GoogleApis
const app = express();
const cors = require('cors'); // Import the cors package
const calendarController = require('./integration.js');

const auth2client=process.env.NODE_ENV || 8000;

const auth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIIENT_SECRECT,
    process.env,REDIRECT_URL
)
// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
    'https://www.googleapis.com/auth/blogger',
    'https://www.googleapis.com/auth/calendar'
  ];

  app.get("/google",(req,res)=>{
    const url=oauth2Client.generateAuthUrl({
        access_type:'offline',
        scope:scopes
    })
    res.redirect(url);
  })

// Start the server
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

