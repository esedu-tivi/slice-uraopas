const mongoose = require("mongoose");

//asettaa käyttäjälle scheman
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  field: { type: String, required: true },
  progress: {
        stepOne: {
                // Is step overall done. This is for later with progress bar 
                done: { type: Boolean, required: true },
                taskOne: {
                        done: {type: Boolean, required: true},
                        answer: {type: String, default: null}
                },
                taskTwo: {
                        done: { type: Boolean, required: true }
                }
        },
        stepTwo: {
                done: { type: Boolean, required: true },
                taskOne: {
                        done: {type: Boolean, required: true},
                        answer: {type: String, default: null}
                },
                taskTwo: {
                        done: {type: Boolean, required: true},
                        answer: {type: String, default: null}
                }
        }
        // add more when ready
  }
});

module.exports = mongoose.model("User", userSchema);