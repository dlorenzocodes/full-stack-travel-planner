const { OAuth2Client } = require('google-auth-library');
const googleUrl = require('../config/oauth');

const getGoogleUser = ({ code }) => {
    const { token } = await OAuth2Client.getToken(code);

    const googleUser = googleUrl();
    console.log(googleUser);
}

getGoogleUser();
