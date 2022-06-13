const config = require("./config")
module.exports = {


    /**
     * param1 : Password
     */
    forgotPassword: {
        subject: "Travelopia: Forgotten Password",
        body: `<span>Hi,</span><br> <br> You recently requested to reset your password for your Travelopia account. Please log in with the below password. Your password is:<br> <strong>%s</strong><br><br> . If you did not request a password reset, please ignore this email or <a href="mailto:abhilash.vadlamudi@hotmail.com"> contact support</a>. &nbsp;</span>`,
    }
}