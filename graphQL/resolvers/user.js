const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");
const { UserInputError } = require("apollo-server");
const { validateRegisterInput, validateLoginInput } = require('../../util/validators');


module.exports = {
    Mutation: {
        async register(_, args) {
            try {
                // Validate Data will be here only
                const { registerInput: { username, password, email, confirmPassword } } = args;

                // validateRegisterInput function is a great function please use this in every project
                const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
                if (!valid) {
                    throw new UserInputError('Errors', { errors })
                }
                // Make sure user doesn't already exists
                const alreadyExist = await User.findOne({ username }).lean();
                if (alreadyExist) {
                    throw new UserInputError('UserName is taken', {
                        errors: {
                            username: 'This username is already exist'
                        },
                    })
                }
                const newUser = new User({ email, username, password, createdAt: new Date().toISOString() });
                // hash the password before saving into DB, we are using the pre hook on schema,  before saving the Hash password in DB
                const result = await newUser.save();

                // And Create a Authentication token
                const token = jwt.sign({ username, email, id: result._id }, JWT_SECRET, { expiresIn: "1 day" });
                return { ...result._doc, id: result._id, token }
            }
            catch (error) {
                console.error('Error during registration:', error);
                throw error;
            }
        }

    }
}