import google from "passport-google-oauth20"
import passport from "passport"
import dotenv from "dotenv"
import Registration_Data from "../models/register.js"

dotenv.config()
var GOOGLE_CLIENT_ID =
	"702926383572-2ihnmkn7dr47dpmcov7449gpcju5uk32.apps.googleusercontent.com"
var GOOGLE_SLIENT_SECRET = "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"

passport.use(
	new google.Strategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SLIENT_SECRET,
			// callbackURL: "http://stiamivip.com/api/auth/google/callback",
			callbackURL:
				process.env.NODE_ENV === "development"
					? "http://localhost:5000/api/auth/google/callback"
					: "http://stiamivip.com/api/auth/google/callback",
			//   passReqToCallback: true,
		},
		function (accessToken, refreshToken, profile, done) {
			console.log("RefreshToken")
			console.log(refreshToken)
			console.log("AccessToken")
			console.log(accessToken)

			Registration_Data.findOne({ email: profile.emails[0].value }).then(
				(data) => {
					if (data) {
						return done(null, data)
					} else {
						Registration_Data({
							email: profile.emails[0].value,
							googleId: profile.id,
							password: "",
						}).save(function (err, data) {
							return done(null, data)
						})
					}
				}
			)
		}
	)
)

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((user, done) => {
	done(null, user)
})

export default passport
