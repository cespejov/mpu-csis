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

  return id; // useful for controller event binding
}

export function removeGuardianForm(id) {
  document.getElementById(id)?.remove();
}
