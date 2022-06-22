// const mongoose = require('mongoose');
//
// const {eventModes} = require("./event");
// const {Users, Genders} = require("./user");
// const {assistantPermissions} = require("./assistant");
//
// const selectionTypes = Object.freeze({
//     Radio: 'radio',
//     Checkbox: 'checkbox',
// });
//
// const selectionSchema = new mongoose.Schema(
//
//     {
//         event_id: {
//             ref: 'Event',
//             require: [true, "Event id is required"],
//             type: mongoose.Schema.Types.ObjectId
//         },
//         name: {
//             type: String,
//             require: [true, "Selection name is required"]
//         },
//         _type: {
//             type: String,
//             enum: Object.values(selectionTypes),
//             require: [true, "Selection type is required"]
//         },
//         option: [String],
//     },
//     {
//         timestamps: true,
//     }
// );
//
// Object.assign(selectionSchema.statics, {
//     selectionTypes,
// });
//
// //Compile the schema into models
// module.exports = mongoose.model('Selection', selectionSchema);