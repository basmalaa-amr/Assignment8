const mongoose = require("mongoose");
const noteRepository = require("./note.repository");

const createNote = async (userId, data) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return null;
  }

  return noteRepository.createNote({
    title: data.title,
    content: data.content,
    userId
  });
};

const updateNote = async (noteId, userId, data) =>
  noteRepository.updateOwnedNote(noteId, userId, data);

const replaceNote = async (noteId, userId, data) =>
  noteRepository.replaceOwnedNote(noteId, userId, data);

const updateAllTitles = async (userId, title) =>
  noteRepository.updateAllTitles(userId, title);

const deleteNote = async (noteId, userId) =>
  noteRepository.deleteOwnedNote(noteId, userId);

const paginateNotes = async (userId, page, limit) =>
  noteRepository.paginateAndSort(userId, page, limit);

const getNote = async (noteId, userId) =>
  noteRepository.findOwnedNote(noteId, userId);

const getNoteByContent = async (userId, content) =>
  noteRepository.findByContent(userId, content);

const getNotesWithUserEmail = async (userId) =>
  noteRepository.findNotesWithUserEmail(userId);

const getNotesWithUser = async (userId, title) =>
  noteRepository.aggregateNotes(userId, title);

const deleteAllNotes = async (userId) =>
  noteRepository.deleteAllNotes(userId);

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
