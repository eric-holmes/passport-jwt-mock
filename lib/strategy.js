var passport = require("passport-strategy"),
	util = require("util");

/**
 * Strategy constructor
 *
 * @param options
 *          payload: Object containing your sample User Token
 * @param verify - Verify callback with args (jwt_payload, done_callback) if passReqToCallback is false,
 *                 (request, jwt_payload, done_callback) if true.
 */
function MockStrategy(options, verify) {
	passport.Strategy.call(this);
	this.name = "jwt";

	if (options.payload) {
		this._payload = options.payload;
	} else {
		this._payload = {
			user: {
				email: "test@user.com"
			}
		};
	}

	this._verify = verify;
	if (!this._verify) {
		throw new TypeError("JwtStrategy requires a verify callback");
	}
}
util.inherits(MockStrategy, passport.Strategy);

/**
 * Authenticate request based on mock token data.
 */
MockStrategy.prototype.authenticate = function(req, options) {
	var self = this;

	// Mimicked from passport-jwt Strategy object.
	// TODO - build out to allow for mocking expired tokens, etc.

	// Pass the parsed token to the user
	var verified = function(err, user, info) {
		if (err) {
			return self.error(err);
		} else if (!user) {
			return self.fail(info);
		} else {
			return self.success(user, info);
		}
	};
	try {
		self._verify(this._payload, verified);
	} catch (ex) {
		self.error(ex);
	}
};

/**
 * Export the Mock Strategy
 */
module.exports = MockStrategy;
