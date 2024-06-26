import { Router } from "express";
import {
  renderNotescodigo1,
  renderNotes,
  renderNotesqf,
  renderNotessf,
  renderEditForm,
  updateNote,
  deleteNote,
  imprimirNote,
  imprimirNote1,
  imprimirNote2,
  calcularposicion,
  renderVisualizarnotas
} from "../controllers/notes.controller.js";

import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

// New Note


// Get All Notes
router.get("/notes", isAuthenticated, renderNotes);
router.get("/notesb", isAuthenticated, calcularposicion);
router.get("/notesqf", isAuthenticated, renderNotesqf);
router.get("/notessf", isAuthenticated, renderNotessf);

// Edit Notes
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);
router.post("/pedircodigo1", isAuthenticated, renderNotescodigo1);

router.put("/notes/edit-note/:id", isAuthenticated, updateNote);


// Delete Notes
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

// imprimir Notes
router.get("/notes/imprimir", isAuthenticated, imprimirNote);
router.get("/notes/imprimir1", isAuthenticated, imprimirNote1);
router.get("/notes/imprimir2", isAuthenticated, imprimirNote2);

router.get("/notes/visualizar/:id", isAuthenticated, renderVisualizarnotas);


export default router;
