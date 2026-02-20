// js/main.js

import { addGuardianForm } from "./ui/forms.js";
import { handleSave } from "./ui/forms.js";
import { closeModal, handleOutsideClick } from "./ui/modal.js";
import { renderTable } from "./ui/table.js";
import { resetForm } from "./ui/forms.js";
//import { loadInitialData } from "./services/child.service.js";

document.addEventListener("DOMContentLoaded", () => {
  //Save Button (Use ID for better performance and reliability)
  const saveBtn = document.querySelector(".btn-save");
  if (saveBtn) saveBtn.addEventListener("click", handleSave);

  //Modal Close Button (Add a specific class or ID in HTML)
  const closeBtn = document.querySelector(".modal-close"); // Suggested change
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  //Add Guardian Button
  const addGuardianBtn = document.getElementById("add-guardian-btn");
  if (addGuardianBtn) addGuardianBtn.addEventListener("click", addGuardianForm);

  // Clear Form Button
  const clearBtn = document.getElementById("clear-btn");
  if (clearBtn) clearBtn.addEventListener("click", resetForm);

  // background click to close modal
  window.addEventListener("click", handleOutsideClick);

  //Fetch data from Model/Service
  //loadInitialData();

  //Initial Render
  renderTable();

  // --- Tab Logic ---
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");

  tabLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent any accidental form submission

      const targetId = link.getAttribute("data-target");

      // 1. Remove active class from all links and sections
      tabLinks.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // 2. Add active class to current link and target section
      link.classList.add("active");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.classList.add("active");
      }
    });
  });
});
