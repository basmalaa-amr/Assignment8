const express = require("express");
const router = express.Router();
const noteController = require("./note.controller");

router.post("/", noteController.createNote);

router.patch("/all", noteController.updateAllTitles);
router.get("/paginate-sort", noteController.paginateNotes);
router.get("/note-by-content", noteController.getNoteByContent);
router.get("/note-with-user", noteController.getNotesWithUserEmail);
router.get("/aggregate", noteController.getNotesWithUser);
router.delete("/", noteController.deleteAllNotes);

router.patch("/:noteId", noteController.updateNote);
router.put("/replace/:noteId", noteController.replaceNote);
router.delete("/:noteId", noteController.deleteNote);
router.get("/:id", noteController.getNote);

module.exports = router;
