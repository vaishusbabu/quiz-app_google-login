const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const CLIENT_ID = process.env.CLIENT_ID || '1027325725164-1htvgdqebi4ocafpo8ae8d58qirri7lb.apps.googleusercontent.com';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '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';

app.post('/api/google-login', async (req, res) => {
    const { token } = req.body;

    try {
        // Verify the token
        const response = await axios.get(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
        );

        const { sub: googleId, email } = response.data;

        // Fetch additional user information using Google People API
        const userInfoResponse = await axios.get(
            `https://people.googleapis.com/v1/people/me?personFields=birthdays,genders`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const { birthdays, genders } = userInfoResponse.data;
        const dateOfBirth = birthdays ? birthdays[0].date : null;
        const gender = genders ? genders[0].value : null;

        res.json({
            googleId,
            email,
            dateOfBirth,
            gender,
        });
    } catch (error) {
        console.error('Error fetching user information:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
