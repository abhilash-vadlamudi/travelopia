'user strict'
const config = require('./config');
module.exports = {

    error: {
        require: {
            token_invalid_error: "Authorization token is not valid.",
        },
        no_access: 'You don\'t have access.',
        session_expired: 'Session Expired please login again.',
        user_not_exist: 'User doest not exists.',
        account_blocked: 'Your account are blocked. Please contact administrator.'
    },
    success: {
        created: '%s created successfully.',
        updated: '%s updated successfully.',
        deleted: '%s deleted successfully.',
        email_success: 'Email sent successfully',
        resetPassword: "An email has been sent to %s with further instructions.",
        travelDetailsAdded: "Travel Details Added"
    },
}