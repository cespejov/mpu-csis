# Requirements Specification

## 1. Introduction

This document defines the functional and non-functional requirements for the Child Services Information System. The system aims to centralize and digitalize child welfare data, including household, health, and education information.

---

## 2. Stakeholders

- Non-Profit Administrators
- Social Workers
- Education Coordinators

---

## 3. Functional Requirements

### 3.1 User Management

FR-01: The system shall allow administrators to create user accounts.  
FR-02: The system shall authenticate users via secure login.  
FR-03: The system shall enforce role-based access control.

---

### 3.2 Child Management

FR-04: The system shall allow registration of a child profile.  
FR-05: The system shall allow updating child information.  
FR-06: The system shall associate a child with a household.  
FR-07: The system shall associate one or more guardians with a child.  
FR-08: The system shall allow viewing complete child profiles.

---

### 3.3 Household Management

FR-09: The system shall allow creation of household records.  
FR-10: The system shall store socio-economic indicators per household.  
FR-11: The system shall allow linking multiple children to one household.  
FR-12: The system shall allow updating household information.

---

### 3.4 Guardian Management

FR-13: The system shall register guardian profiles.  
FR-14: The system shall define guardian-child relationships.  
FR-15: The system shall allow viewing guardian history.

---

### 3.5 Health Module

FR-16: The system shall record child health data (weight, height, MUAC).  
FR-17: The system shall calculate BMI automatically.  
FR-18: The system shall classify weight status based on input metrics.  
FR-19: The system shall store health history records.

---

### 3.6 Education Module

FR-20: The system shall record school enrollment data.  
FR-21: The system shall track academic performance.  
FR-22: The system shall record attendance indicators.

---

### 3.7 Reporting

FR-23: The system shall generate basic summary reports.  
FR-24: The system shall allow filtering data by household or program.

---

## 4. Non-Functional Requirements

### 4.1 Security

NFR-01: Passwords shall be securely hashed.  
NFR-02: The system shall use prepared statements to prevent SQL injection.  
NFR-03: Access to data shall be restricted by user role.

### 4.2 Performance

NFR-04: System response time shall not exceed 3 seconds under normal load.  
NFR-05: The system shall support at least 15 concurrent users.

### 4.3 Usability

NFR-06: The interface shall be intuitive and require minimal training.  
NFR-07: Forms shall provide client-side validation feedback.

### 4.4 Reliability

NFR-08: The system shall log errors for diagnostics.  
NFR-09: Weekly database backups shall be supported.

### 4.5 Maintainability

NFR-10: The system shall follow MVC architecture.  
NFR-11: Code shall follow OOP principles.  
NFR-12: Documentation shall be maintained in the project repository.

---

## 5. Business Rules

BR-01: A child must belong to exactly one household.  
BR-02: A household may contain multiple children.  
BR-03: A child may have multiple guardians.  
BR-04: Health records must be historically preserved (no overwrite).  
BR-05: Only administrators can delete records.

---

## 6. Assumptions

- Users have basic computer literacy.
- The organization has stable internet connectivity.
- Staff will receive basic system training.

---

## 7. Constraints

- The system will be developed using PHP, MySQL, HTML, CSS, and Vanilla JavaScript.
- Budget limitations restrict use of paid enterprise tools.
- Hosting environment will use Apache server.

---

## 8. Requirement Traceability (Reference)

Each functional requirement is mapped to:

- Corresponding module
- Database entity
- Test case ID (see 09_TEST_CASES.md)
