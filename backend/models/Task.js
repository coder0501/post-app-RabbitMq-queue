
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {type: String, required:true, unique: true},
    description: {type: String},
    status: {type: String, enum: ['pending', 'completed'], required: true},
    imagePath: {
        type: String,
        required: true
    },
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Task', TaskSchema);








