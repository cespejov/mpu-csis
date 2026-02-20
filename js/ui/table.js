//Opening modal
//Closing modal
//Rendering modal content

// js/ui/table.js

import { state } from "../state.js";
import { deleteChild } from "../services/child.service.js";
import { openModal } from "./modal.js";
import { loadChildIntoForm } from "./forms.js";

export function renderTable() {
  const tbody = document.getElementById("registry-table");

  tbody.innerHTML = state.children
    .map(
      (c, i) => `
        <tr>
            <td>${c.dni}</td>
            <td>${c.fn} ${c.ln}</td>
            <td>
    ${
      c.guardians.length > 0
        ? c.guardians
            .map(
              (g) => `
            <span class="badge">
                ${g.fn || ""} ${g.ln || ""} 
                (${g.rel || "N/A"})
            </span>
        `,
            )
            .join(" ")
        : "—"
    }
</td>

            <td>
                <button class="btn btn-view view-btn" data-i="${i}">View</button>
                <button class="btn btn-edit edit-btn" data-i="${i}">Edit</button>
                <button class="btn btn-delete delete-btn" data-i="${i}">Delete</button>
            </td>
        </tr>
    `,
    )
    .join("");

  attachTableEvents();
}

function attachTableEvents() {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.i;
      deleteChild(index);
      renderTable();
    });
  });

  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.i;
      openModal(index);
    });
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      loadChildIntoForm(Number(e.target.dataset.i));
    });
  });
}
