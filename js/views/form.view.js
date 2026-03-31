import { addGuardianForm } from "./guardian.view.js";

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
      attendance: document.getElementById("e-attendance").value,
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

    guardians: [],
  };

  document.querySelectorAll(".guardian-entry").forEach((el) => {
    let g = {};

    el.querySelectorAll(".g-in").forEach((input) => {
      g[input.dataset.k] = input.value;
    });

    child.guardians.push(g);
  });

  return child;
}

export function populateChildForm(child) {
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

  // Guardians
  const container = document.getElementById("guardian-container");
  container.innerHTML = "";

  child.guardians?.forEach((g) => addGuardianForm(g));

  // Education
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

  // Health
  if (child.health) {
    document.getElementById("h-blood").value = child.health.bloodType || "";
    document.getElementById("h-vax").value = child.health.vaxStatus || "";
    document.getElementById("h-allergies").value = child.health.allergies || "";
  }

  // Household
  if (child.household) {
    document.getElementById("h-count").value = child.household.occupants || "";
    document.getElementById("h-income").value = child.household.income || "";
    document.getElementById("h-type").value = child.household.type || "";
  }

  document.getElementById("form-title").innerText = "Edit Child Record";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function resetForm() {
  document
    .querySelectorAll(
      "#registry-form input, #registry-form select, #registry-form textarea",
    )
    .forEach((i) => (i.value = ""));

  const editIdx = document.getElementById("edit-idx");
  if (editIdx) editIdx.value = "-1";

  document.getElementById("guardian-container").innerHTML = "";

  document.getElementById("form-title").innerText = "Child Registration";
}
