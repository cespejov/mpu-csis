import { collectFormData } from "../views/form.view.js";
import { renderTable } from "../views/registry.view.js";
import { saveChild } from "../models/child.model.js";
import { state } from "../state.js";
import { resetForm } from "../views/form.view.js";
import { getChild } from "../models/child.model.js";
import { populateChildForm } from "../views/form.view.js";
import { renderChildModal } from "../views/modal.view.js";
import { deleteChild } from "../models/child.model.js";

export function handleSave() {
  const child = collectFormData();

  // Basic validation
  if (!child.dni || !child.fn) {
    alert("DNI and Name are required.");
    return;
  }

  // Save through Model
  saveChild(child);

  // Update UI through View
  renderTable();
  resetForm();
}

function handleClearForm() {
  state.editingIndex = -1;
  resetForm();
}

export function loadChildIntoForm(index) {
  const child = getChild(index);

  if (!child) return;

  state.editingIndex = index;

  populateChildForm(child);
}

export function handleViewChild(index) {
  const child = getChild(index);

  if (!child) return;

  renderChildModal(child);
}

export function handleEditChild(index) {
  const child = getChild(index);

  if (!child) return;

  state.editingIndex = index;

  populateChildForm(child);
}

export function handleDeleteChild(index) {
  const confirmDelete = confirm("Are you sure you want to delete this child?");

  if (!confirmDelete) return;

  deleteChild(index);
  renderTable();
}

/* =========================
   Event Bindings
========================= */

export function bindChildEvents() {
  const saveBtn = document.querySelector(".btn-save");
  const clearBtn = document.getElementById("clear-btn");

  if (saveBtn) saveBtn.addEventListener("click", handleSave);
  if (clearBtn) clearBtn.addEventListener("click", handleClearForm);
}
