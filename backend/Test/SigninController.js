const uuid = require("uuid");
const { Session, sessions } = require('./UserInformation');

// this object stores the users sessions. For larger scale applications, you can use a database or cache for this purpose
const signinHandler = (req, res) => {
    // get users credentials from the JSON body
    const { username, password } = req.body
    if (!username) {
        // If the username isn't present, return an HTTP unauthorized code
        res.status(401).end()
        return
    }
    // validate the password against our data
    // if invalid, send an unauthorized code
    if (password !== "password") {
        res.status(401).end()
        return
    }

    // generate a random UUID as the session token
    const sessionToken = uuid.v4()

    // set the expiry time as 120s after the current time
    const now = new Date()
    const expiresAt = new Date(+now + 120 * 1000)

    // create a session containing information about the user and expiry time
    const session = new Session(username, expiresAt)
    // add the session information to the sessions map
    sessions[sessionToken] = session

    // In the response, set a cookie on the client with the name "session_cookie"
    // and the value as the UUID we generated. We also set the expiry time
    res.cookie("session_token", sessionToken, { expires: expiresAt })
    res.end()
}
module.exports = signinHandler;