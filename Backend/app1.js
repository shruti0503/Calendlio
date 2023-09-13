require('dotenv').config();
require('axios')
require('dayjs')
const express = require('express');
const { google } = require('googleapis');
const app = express();
const cors = require('cors');
const dayjs = require('dayjs');
const { auth } = require('google-auth-library');
const key = require('./service-account-key.json');
const { v4: uuidv4 } = require('uuid');
// Generate a unique ID
const uniqueId = uuidv4();

// Create the booking page URL with the unique ID
const bookingPageUrl = `http://localhost:3000/booking-page/${uniqueId}`;

const auth2client = process.env.NODE_ENV || 8000;
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);


let emailConsultant="";
const calendar=google.calendar({
    version: "v3",
    auth: process.env.API
})
// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
    'https://www.googleapis.com/auth/blogger',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events'
  ];
  const token="";
  let emailconsult;
 // ye token generate krta h , aur for google permission deta h
 // google hme token deta h and we get back to redirect vala url
  app.get("/google",(req,res)=>{
    const url=oauth2Client.generateAuthUrl({
        access_type:'offline',
        scope:scopes
    })
    emailconsult=req.body
    res.redirect(url);
  })

  app.post('/send-email-consultant', (req, res) => {
      emailConsultant  = req.body;
  
    // Now you can use the emailConsultant value as needed
    console.log('Received emailConsultant:', emailConsultant);
  
    // Perform any other actions with the emailConsultant data here
  
    // Send a response back to the frontend
    res.status(200).send('Email consultant received successfully');
  });

app.get('/google/redirect', async (req, res) => {
  const authorizationCode = req.query.code;

  try {
    // Exchange authorization code for tokens
    const tokens = await oauth2Client.getToken(authorizationCode);
oauth2Client.setCredentials(tokens.tokens); // Set the credentials with the received tokens

    
    // Now you can use the access token for authorized API requests
    // Refresh token can be used to refresh the access token when it expires

    // Redirect or respond as needed
    res.redirect(`http://localhost:3000/booking-page/${uniqueId}`);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send('Error during authorization');
  }
});




  app.post('/schedule_event', async (req, res) => {
    console.log('Received POST request at /schedule_event'); // Add this line for debugging
    try {
      const {
        firstName,
        lastName,
        email,
        appointmentDate,
        appointmentTime,
        times,
      } = req.body;

      console.log('Received request body:', req.body);
        // Define the attendees with the user's email and a predefined email
        const emailObject = { emailConsultant: 'ss498882@gmail.com' };
        const userEmail = emailObject.emailConsultant;
        const attendees = [
          {
            email: userEmail, // Nested object with 'e' property
            organiser: true,
          },
          {
            email: email, // Use the email directly
            organiser: false,
          },
        ];
        
        console.log(attendees)
      

      const eventResponse = await calendar.events.insert({
        calendarId: 'primary',
        sendNotifications: true,
        auth: oauth2Client,
        conferenceDataVersion: 1,
        organiser: `${emailConsultant}`,
        requestBody: {
          summary: `Appointment for ${firstName} ${lastName}`,
          description: 'Appointment details',
          start: {
              dateTime: `${appointmentDate}T${appointmentTime}:00`,
              timeZone: 'Asia/Kolkata',
          },
          end: {
              dateTime: `${appointmentDate}T${appointmentTime}:00`,
              timeZone: 'Asia/Kolkata',
          },
          conferenceData: {
            createRequest: {
              requestId: uuidv4(),
            },
            conferenceSolution: {
              type: 'hangoutsMeet',
            },
          },
          attendees: attendees,
        },
      });
      // console.log(eventResponse.data)
      
  
      // Access the Google Meet link
      const meetLink = eventResponse.data.conferenceData.entryPoints[0].uri;
      console.log(`Google Meet Link: ${meetLink}`);
      console.log("event logged ")
      // console.log(eventResponse);
      // res.redirect('http://localhost:3000/get-started');
      res.status(200).send('Event scheduled successfully');


    } catch (error) {
      // Handle any errors here
      console.error(error);
      res.status(500).send('Error during event scheduling');
    }

    
  });
  

// Start the server
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

