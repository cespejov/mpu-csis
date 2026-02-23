//Collecting form data
//Resetting form
//Populating form for edit

import { state } from "../state.js";
import { saveChild } from "../services/child.service.js";
import { renderTable } from "./table.js";
import { getChild } from "../services/child.service.js";

// --- Form Data Handling ---
export function collectFormData() {
  const child = {
    // --- Personal Information ---
    fn: document.getElementById("c-fn").value,
    ln: document.getElementById("c-ln").value,
    dni: document.getElementById("c-dni").value,
    sex: document.getElementById("c-sex").value,
    dob: document.getElementById("c-dob").value,
    pob: document.getElementById("c-pob").value,
    addr: document.getElementById("c-addr").value,
    city: document.getElementById("c-city").value,
    rel: document.getElementById("c-rel").value,
    ph: document.getElementById("c-phone").value,
    em: document.getElementById("c-email").value,

    // --- Education Record ---
    education: {
      school: document.getElementById("e-school").value,
      year: document.getElementById("e-year").value,
      grade: document.getElementById("e-grade").value,
      status: document.getElementById("e-status").value,
      performance: document.getElementById("e-performance").value,
      conduct: document.getElementById("e-conduct").value,
      socialization: document.getElementById("e-socialization").value,
      bullying: document.getElementById("e-bullying").value,
      socialBehavior: document.getElementById("e-social-behavior").value,
      observation: document.getElementById("e-observation").value,
    },

    // --- Health Record ---
    health: {
      bloodType: document.getElementById("h-blood").value,
      vaxStatus: document.getElementById("h-vax").value,
      allergies: document.getElementById("h-allergies").value,
    },

    // --- Household Details ---
    household: {
      occupants: document.getElementById("h-count").value,
      income: document.getElementById("h-income").value,
      type: document.getElementById("h-type").value,
    },

    // --- Dynamic Guardians Array ---
    guardians: [],
  };

  document.querySelectorAll(".guardian-entry").forEach((el) => {
    let g = {};
    el.querySelectorAll(".g-in").forEach(
      (input) => (g[input.dataset.k] = input.value),
    );
    child.guardians.push(g);
  });

  return child;
}

export function handleSave() {
  const child = collectFormData();

  if (!child.dni || !child.fn) {
    alert("DNI and Name are required.");
    return;
  }

  saveChild(child);
  renderTable();
  resetForm();
}

export function resetForm() {
  document
    .querySelectorAll(
      "#registry-form input, #registry-form select, #registry-form textarea",
    )
    .forEach((i) => (i.value = ""));

  document.getElementById("guardian-container").innerHTML = "";
  state.editingIndex = -1;
  document.getElementById("form-title").innerText = "Child Registration";
}

export function addGuardianForm(data = {}) {
  const id = "g-" + Math.random().toString(36).substr(2, 9);

  const html = `
        <div class="guardian-entry" id="${id}">
            <button type="button" class="remove-btn" data-id="${id}">✕ REMOVE</button>
            
            <div class="grid">
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="g-in" data-k="fn" value="${data.fn || ""}">
                </div>

                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="g-in" data-k="ln" value="${data.ln || ""}">
                </div>

                <div class="form-group">
                    <label>Relationship</label>
                    <select class="g-in" data-k="rel">
                        <option value="">Select</option>
                        <option value="Father" ${data.rel === "Father" ? "selected" : ""}>Father</option>
                        <option value="Mother" ${data.rel === "Mother" ? "selected" : ""}>Mother</option>
                        <option value="Sister" ${data.rel === "Sister" ? "selected" : ""}>Sister</option>
                        <option value="Brother" ${data.rel === "Brother" ? "selected" : ""}>Brother</option>
                        <option value="Aunt" ${data.rel === "Aunt" ? "selected" : ""}>Aunt</option>
                        <option value="Uncle" ${data.rel === "Uncle" ? "selected" : ""}>Uncle</option>
                        <option value="Grandmother" ${data.rel === "Grandmother" ? "selected" : ""}>Grandmother</option>
                        <option value="Grandfather" ${data.rel === "Grandfather" ? "selected" : ""}>Grandfather</option>
                        <option value="Proxy" ${data.rel === "Proxy" ? "selected" : ""}>Proxy</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Primary</label>
                    <select class="g-in" data-k="pri">
                        <option value="True" ${data.pri === "True" ? "selected" : ""}>True</option>
                        <option value="False" ${data.pri === "False" ? "selected" : ""}>False</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>DNI</label>
                    <input type="text" class="g-in" data-k="dni" value="${data.dni || ""}">
                </div>

                <div class="form-group">
                    <label>Sex</label>
                    <select class="g-in" data-k="sex">
                        <option value="M" ${data.sex === "M" ? "selected" : ""}>M</option>
                        <option value="F" ${data.sex === "F" ? "selected" : ""}>F</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="g-in" data-k="addr" value="${data.addr || ""}">
                </div>

                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="tel" class="g-in" data-k="ph" value="${data.ph || ""}">
                </div>

                <div class="form-group">
                    <label>Occupation</label>
                    <input type="text" class="g-in" data-k="occ" value="${data.occ || ""}">
                </div>

                <div class="form-group">
                    <label>Education</label>
                    <input type="text" class="g-in" data-k="edu" value="${data.edu || ""}">
                </div>
            </div>
        </div>
    `;

  document
    .getElementById("guardian-container")
    .insertAdjacentHTML("beforeend", html);

  attachRemoveGuardianEvent();
}

function attachRemoveGuardianEvent() {
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      document.getElementById(id)?.remove();
    });
  });
}

export function loadChildIntoForm(index) {
  const child = getChild(index);

  if (!child) return;

  state.editingIndex = index;

  document.getElementById("c-fn").value = child.fn || "";
  document.getElementById("c-ln").value = child.ln || "";
  document.getElementById("c-dni").value = child.dni || "";
  document.getElementById("c-sex").value = child.sex || "";
  document.getElementById("c-dob").value = child.dob || "";
  document.getElementById("c-pob").value = child.pob || "";
  document.getElementById("c-addr").value = child.addr || "";
  document.getElementById("c-city").value = child.city || "";
  document.getElementById("c-rel").value = child.rel || "";
  document.getElementById("c-phone").value = child.ph || "";
  document.getElementById("c-email").value = child.em || "";

  // Clear existing guardians
  document.getElementById("guardian-container").innerHTML = "";

  // Re-add guardians
  child.guardians.forEach((g) => addGuardianForm(g));

  if (child.education) {
    document.getElementById("e-school").value = child.education.school || "";
    document.getElementById("e-year").value = child.education.year || "";
    document.getElementById("e-grade").value = child.education.grade || "";
    document.getElementById("e-status").value = child.education.status || "";
    document.getElementById("e-performance").value =
      child.education.performance || "";
    document.getElementById("e-conduct").value = child.education.conduct || "";
    document.getElementById("e-attendance").value =
      child.education.attendance || "";
    document.getElementById("e-socialization").value =
      child.education.socialization || "";
    document.getElementById("e-bullying").value =
      child.education.bullying || "";
    document.getElementById("e-social-behavior").value =
      child.education.socialBehavior || "";
    document.getElementById("e-observation").value =
      child.education.observation || "";
  }

  if (child.health) {
    document.getElementById("h-blood").value = child.health.bloodType || "";
    document.getElementById("h-vax").value = child.health.vaxStatus || "";
    document.getElementById("h-allergies").value = child.health.allergies || "";
  }

  if (child.household) {
    document.getElementById("h-count").value = child.household.occupants || "";
    document.getElementById("h-income").value = child.household.income || "";
    document.getElementById("h-type").value = child.household.type || "";
  }

  document.getElementById("form-title").innerText = "Edit Child Record";

  window.scrollTo({ top: 0, behavior: "smooth" });
}
