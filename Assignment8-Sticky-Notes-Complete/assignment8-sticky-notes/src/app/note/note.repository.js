const Note = require("../../common/db/note.model");

const createNote = (data) => Note.create(data);

const findById = (id) => Note.findById(id);

const updateOwnedNote = (noteId, userId, data) =>
  Note.findOneAndUpdate(
    { _id: noteId, userId },
    data,
    { new: true, runValidators: true }
  );

const replaceOwnedNote = (noteId, userId, data) =>
  Note.findOneAndReplace(
    { _id: noteId, userId },
    { title: data.title, content: data.content, userId },
    { new: true, runValidators: true }
  );

const updateAllTitles = (userId, title) =>
  Note.updateMany({ userId }, { $set: { title } }, { runValidators: true });

const deleteOwnedNote = (noteId, userId) =>
  Note.findOneAndDelete({ _id: noteId, userId });

const paginateAndSort = (userId, page, limit) =>
  Note.find({ userId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

const findOwnedNote = (noteId, userId) =>
  Note.findOne({ _id: noteId, userId });

const findByContent = (userId, content) =>
  Note.findOne({ userId, content });

const findNotesWithUserEmail = (userId) =>
  Note.find({ userId })
    .select("title userId createdAt")
    .populate("userId", "email");

const aggregateNotes = (userId, title) => {
  const match = { userId };

  if (title) {
    match.title = { $regex: title, $options: "i" };
  }

  return Note.aggregate([
    { $match: match },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },
    {
      $project: {
        title: 1,
        userId: 1,
        createdAt: 1,
        "user.name": 1,
        "user.email": 1
      }
    }
  ]);
};

const deleteAllNotes = (userId) => Note.deleteMany({ userId });

module.exports = {
  createNote,
  updateOwnedNote,
  replaceOwnedNote,
  updateAllTitles,
  deleteOwnedNote,
  paginateAndSort,
  findOwnedNote,
  findByContent,
  findNotesWithUserEmail,
  aggregateNotes,
  deleteAllNotes
};
