// DO NOT EXPOSE YOUR ENV VARIABLES.
// TO MAKE IT WORKED, PLEASE CREATE .env file in the project's root and add your credentials into .env
export default () => ({
    jwt_secret: process.env.JWT_SECRET,
    twilio: {
        twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
        twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
        twilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
    },
});
