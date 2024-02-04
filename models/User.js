const { model, Schema } = require("mongoose");
const _hash = require("password-hash");

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String

});



// Method (always call an Instance of an Class)
userSchema.methods.verifyPassword = async function (password) {
    return _hash.verify(password, this.password);
}





// Pre hook for hashing the password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            this.password = _hash.generate(this.password);
        }
        catch (error) {
            return next(error);
        }
    }

    next();

})


module.exports = model("User", userSchema);