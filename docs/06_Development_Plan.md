# 1 Technology Stack

# 1.1 Front-End

Technology: Vanilla JavaScript (ES6+)
Markup & Styling: HTML5, CSS3

Purpose:

Build dynamic forms (Person, Child, Guardian, Education, Health, Economy, Household).
Handle client-side validation.
Manage modal interactions.
Perform requests to backend (PHP).
Render dynamic lists (Guardians per Child, Education history, Health history, Economy history).

Architectural Style:

The system is designed using a Model-View-Controller (MVC) architectural pattern, implemented natively in JavaScript (ES6+). This pattern enforces a strict Separation of Concerns (SoC), ensuring that data management, user interface rendering, and business logic remain decoupled and independently maintainable.

# Components:

# Model

Manages data structures, state persistence (LocalStorage), and data logic. It is the single source of truth.

child.model.js
fetchChildrenFromServer
saveChild
deleteChild
getChild
persistData
loadLocalData

# View

Responsible for DOM manipulation, template rendering, and data extraction from UI fields.

form.view.js
collectFormData
populateChildForm
resetForm

registry.view.js
renderTable
attachTableEvents

modal.view.js
renderChildModal
closeModal
handleOutsideClick
bindModalEvents

guardian.view.js
addGuardianForm
removeGuardianForm

# Controller

Orchestrates the flow. It listens for DOM events, updates the Model, and triggers View refreshes.

child.controller.js
handleSave
handleClearForm
loadChildIntoForm
handleViewChild
handleEditChild
handleDeleteChild
bindChildEvents

guardian.controller.js
handleAddGuardian
handleRemoveGuardian
bindGuardianEvents

ui.controller.js
bindTabEvents

# Entry Point

Bootstraps the application and initializes event bindings.

main.js

# State Management (Centralized Store)

The application utilizes a State Container pattern (state.js). This provides a predictable data flow where all components access a shared state object, preventing "prop-drilling" or inconsistent data across different views.
state.js

# MVC model:

js/
├── models/
│-----child.model.js
├── views/
│-----form.view.js
│-----guardian.view.js
│-----modal.view.js
│-----registry.view.js
├── controllers/
│-----child.controller.js
│-----guardian.controller.js
│-----ui.controller.js
├── main.js
├── state.js

# 1.2 Back-End

Language: PHP (>= 8.1 recommended).
Architecture Style: Object-Oriented, Layered Architecture.
Pattern: MVC-inspired structure (without heavy framework).

Responsibilities:

Business rule enforcement.
Data validation.
Repository pattern implementation.
Transaction management.
JSON API responses.

Structure Example:

/app
--/Controllers
--/Services
--/Models
--/Repositories
/config
/database
/public

# 1.3 Database

Database Engine: MySQL (>= 8.0 recommended)

Responsibilities:

Data persistence.
Foreign key enforcement.
Unique constraints.
Indexing for performance.
Data integrity guarantees

# 1.4 Communication Layer

Protocol: HTTP
Data Format: JSON

Front-end → sends JSON via fetch()
Backend → returns JSON responses

Example:
{
"status": "success",
"data": { ... }
}

# 1.5 Development Environment

Local Server: XAMPP
Version Control: Git
Repository Hosting: GitHub
IDE: VS Code
Database Tool: phpMyAdmin or MySQL Workbench

# 2 Architecture Overview (Layered OOP)

The system follows a Layered Object-Oriented Architecture. This approach organizes the codebase into logical layers of responsibility, ensuring that the business logic is independent of the database and the delivery mechanism (API/Web)

# 2.1 The Layering Strategy

# Presentation Layer

Handles incoming HTTP requests and outgoing JSON responses. Acts as the entry point for the Front-End.

Pattern / Implementation: Controllers

# Business Logic Layer

Orchestrates complex operations and enforces domain-specific rules (e.g., socioeconomic scoring).

Pattern / Implementation: Services

# Domain Layer

Represents the core entities of the system (Child, Guardian, Household) and their relationships.

Pattern / Implementation: Models (Entities)

# Data Access Layer

Abstracts SQL queries. Handles all interactions with the MySQL database.

Pattern / Implementation: Repositories

# Infrastructure Layer

Provides low-level technical capabilities like Database connections and Configuration.

Pattern / Implementation: PDO Wrapper / Config

# 3 Domain Modeling Phase

Test

# 4 Business Logic Phase

# 5 Persistence Phase

# 6 Integration Phase

# 7 Rule Enforcement Phase

# 8 Testing Strategy

# 9 Refactoring & Optimization

# 10 Version Control Strategy

# 11 Deployment Strategy
