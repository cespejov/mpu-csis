import { removeGuardianForm, addGuardianForm } from "../views/guardian.view.js";

export function handleAddGuardian() {
  // Logic to update the View
  addGuardianForm();
}

export function handleRemoveGuardian(event) {
  const id = event.target.dataset.id;

  if (!id) return;

  removeGuardianForm(id);
}

export function bindGuardianEvents() {
  const container = document.getElementById("guardian-container");
  const addGuardianBtn = document.getElementById("add-guardian-btn");

  if (addGuardianBtn) {
    addGuardianBtn.addEventListener("click", handleAddGuardian);
  }

  if (!container) return;

  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      handleRemoveGuardian(e);
    }
  });
}
