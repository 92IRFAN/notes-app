import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notesSchema = new Schema({
    title: { type: String, required: true },
    note: { type: String, required: true },
    image: { type: String, },
    InWishlist: {type: Boolean, default: false},
    creator : {type: String, required: true},
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
});

const NOTES = mongoose.model('Notes', notesSchema);

export default NOTES;