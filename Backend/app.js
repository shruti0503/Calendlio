require('dotenv').config();
require('axios')
require('dayjs')
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const { google } = require('googleapis');
const app = express();
const cors = require('cors');
const dayjs = require('dayjs');
const { auth } = require('google-auth-library');

const auth2client = process.env.NODE_ENV || 8000;
const port = process.env.PORT || 4000;

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
)

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
 // ye token generate krta h , aur for google permission deta h
 // google hme token deta h and we get back to redirect vala url
  app.get("/google",(req,res)=>{
    const url=oauth2Client.generateAuthUrl({
        access_type:'offline',
        scope:scopes
    })
    // res.redirect(url);
  })
//here

app.get("/google/redirect", async (req, res) => {
    try {
      const code = req.query.code;
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
  
      // Send a success response
      res.redirect(`http://localhost:3000/booking-page/${booking.link}`);
    } catch (error) {
      // Handle any errors here
      console.error(error);
      // Send an error response
      res.status(500).send("Error during authorization");
    }
  });
  

  app.post('/schedule_event', async (req, res) => {
    try {
      const { firstName, lastName, email, appointmentDate, appointmentTime } = req.body;

        // Define the attendees with the user's email and a predefined email
        const attendees = [
            {
                email: email,
            },
            {
                email: 'shrutivishwakarma0509@gmail.com', // Add the predefined attendee email here
            },
        ];
      

      const eventResponse = await calendar.events.insert({
        calendarId: 'primary',
        auth: oauth2Client,
        conferenceDataVersion: 1,
        requestBody: {
          summary: `Appointment for ${firstName} ${lastName}`,
          description: 'Appointment details',
          start: {
              dateTime: `${appointmentDate}T${appointmentTime}:00Z`,
              timeZone: 'Asia/Kolkata',
          },
          end: {
              dateTime: `${appointmentDate}T${appointmentTime}:00Z`,
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
  
      // Access the Google Meet link
      const meetLink = eventResponse.data.conferenceData.entryPoints[0].uri;
      console.log(`Google Meet Link: ${meetLink}`);
  
      res.redirect('http://localhost:3000/get-started');

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

