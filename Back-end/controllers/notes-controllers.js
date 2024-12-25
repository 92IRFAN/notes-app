import NOTES from "../models/notes.js";

// GetNotes API

export const GetNotes = async (req, res) => {
  try {
    const { userId } = req.params;

    let allNotes = await NOTES.find( { creator : userId });
    
    res.status(200).json(allNotes);
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// GetSingleNote API

export const GetSingleNote = async (req, res) => {
  try {
    const single_note = await NOTES.findOne({ _id: req.params.id });
    if (!single_note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(single_note);
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// CreateNote API
export const CreateNote = async (req, res) => {
  try {
    const { title, note, creator } = req.body;
    const imageFile = req.file;

    if (!title || !note || !creator) {
      return res.status(400).json({ message: "These fields are required" });
    }

    const newNote = new NOTES({
      title,
      note,
      image: imageFile ? imageFile.path : null,
      creator,
    });

    await newNote.save();

    res.status(201).json({
      message: "Note Created Successfully",
      note: {
        id: newNote._id,
        title: newNote.title,
        note: newNote.note,
        image: newNote.image,
        InWishlist: newNote.InWishlist,
        creator: creator,
        createdAt: newNote.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// DeleteNote API

export const DeleteNote = async (req, res) => {
  try {
    const { note_id } = req.body;

    if (!note_id) {
      return res.status(400).json({ message: "Note ID is required" });
    }

    const deletedNote = await NOTES.findByIdAndDelete(note_id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Return a success response
    res.status(200).json({
      message: "Note deleted successfully",
      note: {
        id: deletedNote._id,
        title: deletedNote.title,
        note: deletedNote.note,
        image: deletedNote.image,
        creator: deletedNote.creator,
        createdAt: deletedNote.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// UpdateNote API

export const UpdateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, note } = req.body;

    // Fetch the existing note
    const existingNote = await NOTES.findById(id);
    if (!existingNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check if a new image is uploaded; otherwise, retain the existing image
    const updatedImage = req.file ? req.file.path : existingNote.image;

    // Update the note
    const updatedNote = await NOTES.findByIdAndUpdate(
      id,
      { 
        title, 
        note, 
        image: updatedImage 
      },
      { new: true } // Return the updated document
    );

    res.status(200).json({
      message: "Note updated successfully",
      updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// InWishlist API

export const InWishlist = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await NOTES.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Toggle the InWishlist field
    note.InWishlist = !note.InWishlist;
    await note.save();

    res.status(200).json({
      message: "Wishlist status updated successfully",
      updatedNote: note,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}