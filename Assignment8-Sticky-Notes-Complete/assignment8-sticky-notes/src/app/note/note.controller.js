const noteService = require("./note.service");

const getUserId = (req) => req.query.userId;

const createNote = async (req, res, next) => {
  try {
    const note = await noteService.createNote(getUserId(req), req.body);

    if (!note) {
      return res.status(400).json({ message: "Please provide a valid userId" });
    }

    res.status(201).json({ message: "Note created", note });
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const note = await noteService.updateNote(
      req.params.noteId,
      getUserId(req),
      req.body
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note updated", note });
  } catch (error) {
    next(error);
  }
};

const replaceNote = async (req, res, next) => {
  try {
    const note = await noteService.replaceNote(
      req.params.noteId,
      getUserId(req),
      req.body
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note replaced", note });
  } catch (error) {
    next(error);
  }
};

const updateAllTitles = async (req, res, next) => {
  try {
    const result = await noteService.updateAllTitles(getUserId(req), req.body.title);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "No note found" });
    }

    res.status(200).json({ message: "All notes updated" });
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const note = await noteService.deleteNote(req.params.noteId, getUserId(req));

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted", note });
  } catch (error) {
    next(error);
  }
};

const paginateNotes = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
    const notes = await noteService.paginateNotes(getUserId(req), page, limit);

    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

const getNote = async (req, res, next) => {
  try {
    const note = await noteService.getNote(req.params.id, getUserId(req));

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

const getNoteByContent = async (req, res, next) => {
  try {
    const note = await noteService.getNoteByContent(
      getUserId(req),
      req.query.content
    );

    if (!note) {
      return res.status(404).json({ message: "No note found" });
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

const getNotesWithUserEmail = async (req, res, next) => {
  try {
    const notes = await noteService.getNotesWithUserEmail(getUserId(req));
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

const getNotesWithUser = async (req, res, next) => {
  try {
    const notes = await noteService.getNotesWithUser(
      getUserId(req),
      req.query.title
    );

    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

const deleteAllNotes = async (req, res, next) => {
  try {
    await noteService.deleteAllNotes(getUserId(req));
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  updateNote,
  replaceNote,
  updateAllTitles,
  deleteNote,
  paginateNotes,
  getNote,
  getNoteByContent,
  getNotesWithUserEmail,
  getNotesWithUser,
  deleteAllNotes
};
