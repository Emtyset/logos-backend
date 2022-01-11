const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    sessions: [{
        type: Date,
    }],
    joined: {
        type: Date,
        immutable: true,
        default: () => {
            let now = new Date()
            // return new Date(`${now.getFullYear}-${now.getMonth()}-${now.getDate()}T05:00:00.000Z`)
            return now
        }
    },
    doneExercises: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: 'Exercise'
            }],
            default: []
        }
    })

UserSchema.pre('save', function (next) {
    var user = this
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
})

UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.virtual("totalTrainings").get(function() {
    return this.sessions.length
})

UserSchema.virtual("lastTraining").get(function() {
    if (this.sessions && this.sessions.length > 0) {
        return this.sessions.at(-1)
    }
    return null
})

UserSchema.methods.pushMany = function (dates) {
    this.sessions.push({
        $each: dates,
    })
    this.sort()
}

UserSchema.methods.sort = function () {
    this.sessions.sort((a, b) => a - b)
}

UserSchema.methods.pushToday = function () {
    let last = this.lastTraining
    let now = new Date()
    now = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} 09:00`)
    if (last) {
        if ((now - last) / (1000 * 60 * 60 * 24) > 0){
            this.sessions.push(now)
        }
    } else {
        this.sessions = [now]
    }
}

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)