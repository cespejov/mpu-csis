export function renderChildModal(child) {
  // ----- CHILD DATA -----
  document.getElementById("v-title").innerText = `${child.fn} ${child.ln}`;

  document.getElementById("v-child-data").innerHTML = `
        <div class="view-item"><b>DNI</b>${child.dni || "—"}</div>
        <div class="view-item"><b>Sex</b>${child.sex || "—"}</div>
        <div class="view-item"><b>Birth Date</b>${child.dob || "—"}</div>
        <div class="view-item"><b>Birth Place</b>${child.pob || "—"}</div>
        <div class="view-item"><b>Address</b>${child.addr || ""} ${child.city || ""}</div>
        <div class="view-item"><b>Religion</b>${child.rel || "—"}</div>
        <div class="view-item"><b>Phone</b>${child.ph || "—"}</div>
        <div class="view-item"><b>Email</b>${child.em || "—"}</div>
    `;

  const guardianContainer = document.getElementById("v-guardians-data");

  if (!child.guardians || child.guardians.length === 0) {
    guardianContainer.innerHTML = "No guardians linked.";
  } else {
    guardianContainer.innerHTML = child.guardians
      .map(
        (g) => `
            <div style="background:#f1f5f9; padding:15px; border-radius:8px; margin-bottom:10px;">
                
                <h4 style="margin:0 0 10px 0;">
                    ${g.fn || ""} ${g.ln || ""} 
                    (${g.rel || "N/A"}) 
                    ${g.pri === "True" ? "⭐ Primary" : ""}
                </h4>

                <div class="view-grid">
                    <div class="view-item"><b>DNI</b>${g.dni || "—"}</div>
                    <div class="view-item"><b>Sex</b>${g.sex || "—"}</div>
                    <div class="view-item"><b>Address</b>${g.addr || "—"}</div>
                    <div class="view-item"><b>Phone</b>${g.ph || "—"}</div>
                    <div class="view-item"><b>Occupation</b>${g.occ || "—"}</div>
                    <div class="view-item"><b>Education</b>${g.edu || "—"}</div>
                </div>
            </div>
        `,
      )
      .join("");
  }

  document.getElementById("viewModal").style.display = "block";
}

export function closeModal() {
  const modal = document.getElementById("viewModal");
  modal.style.display = "none";
}

export function handleOutsideClick(event) {
  const modal = document.getElementById("viewModal");

  // close if clicking the modal overlay (outside modal-content)
  if (event.target === modal) {
    closeModal();
  }
}

export function bindModalEvents() {
  const modal = document.getElementById("viewModal");
  const closeBtn = document.querySelector(".modal-close");

  // Close button (×)
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Click outside modal-content
  if (modal) {
    modal.addEventListener("click", handleOutsideClick);
  }
}
