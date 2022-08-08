const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(userEmail, userName, url) {
    try{
        await sgMail.send({
            to: userEmail, 
            from: 'donnalorenzo24@gmail.com', 
            subject: 'Forgot Password Request',
            text: `Hello, ${userName}`,
            html: `<p>A request has been received to change the 
                    password for your travel planner account.
                    Follow this link ${url} to do so.<p>

                    <p>If you did not initiate this request,
                    please disregard this message</p>`
        });
    }catch(err){
        throw new Error(err);
    };
}

module.exports = { sendEmail }