# passport-mock

Mock passport JWT strategy for testing a Node.js application.

This module allows you authenticate a fake user in a Node application using your existing  `jwtStrategy.authenticate()` function, to allow for easy testing of routes.

## Install

Install using `yarn`:

```bash
$ yarn add passport-jwt-mock --dev
```

Or use `npm` if you wish:

```bash
$ npm install passport-jwt-mock --save-dev
```

## Usage

To get started you can import `MockStrategy` and create a new instance. I believe the easiest approach is to use an environment variable to hot-swap the regular jwtStrategy with the mock strategy.

```javascript
const passport = require("passport");

let jwtStrategy = null;
if (process.env.NODE_ENV === "test") {
	jwtStrategy = require("passport-jwt-mock").Strategy;
} else {
	jwtStrategy = require("passport-jwt").Strategy;
}
```

Once you have replaced the the `jwtStrategy` object, you are nearly done! The implementation (however youused it) will work without modifying the implementation.

```javascript
passport.use(
	new jwtStrategy(
		{
			//secret we used to sign our JWT
			secretOrKey: 'secret',
			//we expect the user to send the token as a query paramater with the name 'secret_token'
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
		},
		async (token, done) => {
			try {
				//Pass the user details to the next middleware
				return done(null, token.user);
			} catch (error) {
				done(error);
			}
		}
	)
);
```

## Important Note
This package is for testing purposes only! Please do not use this for actual authentication as it provides no security whatsoever!

## License
passport-mock-strategy is available under the [MIT License](https://github.com/ewholmes/passport-jwt-mock/tree/master/LICENSE).

## Contributing
Contributions are welcome. Feel free to open an issue or submit a pull request.