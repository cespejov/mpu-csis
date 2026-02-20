# Database Design

## 1. Overview

The system uses a relational database model implemented in MySQL to ensure transactional consistency, referential integrity, and optimized data access.

The schema follows a hierarchical structure:

Household → Family → Person → (Child / Guardian)

The database is normalized to Third Normal Form (3NF) to eliminate redundancy and maintain data integrity across socio-economic, health, and education records.

---

## 2. Core Design Principles

- Primary keys (PK) ensure entity uniqueness
- Foreign keys (FK) enforce hierarchical relationships
- Junction tables implement many-to-many relationships
- Historical data is preserved (no destructive overwrites)
- Indexed foreign keys improve query performance
- Non-null constraints enforce mandatory data integrity

---

## 3. Entity Hierarchy

### 3.1 Household

Represents a physical socio-economic housing unit.

Attributes:

- household_id (PK)
- address
- income_level
- housing_type
- utilities_access
- created_at
- updated_at

Relationship:

- One Household → Many Families

---

### 3.2 Family

Represents a family unit within a household.

Attributes:

- family_id (PK)
- household_id (FK → Household)
- family_surname
- created_at
- updated_at

Relationship:

- One Family → Many Persons

Purpose:

- Supports extended family modeling
- Allows grouping by family surname
- Enables multiple family units within one household

---

### 3.3 Person

Abstract representation of individuals in the system.

Attributes:

- person_id (PK)
- family_id (FK → Family)
- first_name
- last_name
- dni (Unique)
- date_of_birth
- sex
- phone
- email
- created_at
- updated_at

Relationship:

- One Person → One Role (Child or Guardian)

This structure avoids duplication of demographic data.

---

### 3.4 Child

Represents a child enrolled in the program.

Attributes:

- child_id (PK)
- person_id (FK → Person)
- enrollment_date
- status

Relationships:

- One Child → Many Health Records
- One Child → Many Education Records
- One Child ↔ Many Guardians (via junction table)

---

### 3.5 Guardian

Represents an adult responsible for a child.

Attributes:

- guardian_id (PK)
- person_id (FK → Person)
- occupation
- education_level

Relationship:

- Many Guardians ↔ Many Children

---

### 3.6 Child_Guardian (Junction Table)

Implements the many-to-many relationship.

Attributes:

- child_id (FK → Child)
- guardian_id (FK → Guardian)
- relationship_type
- is_primary

Composite Primary Key:
(child_id, guardian_id)

---

### 3.7 Health_Record

Stores historical child health metrics.

Attributes:

- health_record_id (PK)
- child_id (FK → Child)
- record_date
- weight
- height
- muac_score
- bmi
- weight_status
- health_status_result
- created_at

Relationship:

- One Child → Many Health Records

Policy:

- Historical records are preserved (no overwrite).

---

### 3.8 Education_Record

Stores educational history.

Attributes:

- education_id (PK)
- child_id (FK → Child)
- school_name
- grade_level
- attendance_rate
- academic_performance
- academic_year
- created_at

Relationship:

- One Child → Many Education Records

## 3.9 Socio-Economic Domain Tables

To support comprehensive household socio-economic assessment, additional domain tables are implemented.

---

### 3.9.1 Dwelling

Represents housing characteristics.

Attributes:

- dwelling_id (PK)
- household_id (FK → Household)
- construction_material_id (FK → Construction_Material)
- household_type_id (FK → Household_Type)
- tenure_id (FK → Tenure)
- number_of_rooms
- sanitation_type
- water_source

Relationship:

- One Household → One Dwelling

---

### 3.9.2 Construction_Material

Lookup table for housing material classification.

Attributes:

- construction_material_id (PK)
- material_name

---

### 3.9.3 Household_Service

Junction table for services available to a household.

Attributes:

- household_id (FK → Household)
- service_id (FK → Service)

Composite Primary Key:
(household_id, service_id)

---

### 3.9.4 Service

Lookup table for available services.

Attributes:

- service_id (PK)
- service_name
  (e.g., Electricity, Internet, Water, Gas)

---

### 3.9.5 Household_Type

Lookup table describing family structure.

Attributes:

- household_type_id (PK)
- type_name
  (e.g., Nuclear, Extended, Single-parent)

---

### 3.9.6 Tenure

Represents property ownership status.

Attributes:

- tenure_id (PK)
- tenure_type
  (e.g., Owned, Rented, Informal, Temporary)

---

### 3.9.7 Economy

Represents economic profile of a household.

Attributes:

- economy_id (PK)
- household_id (FK → Household)
- total_income
- income_source
- employment_status
- last_updated

Relationship:

- One Household → One Economy Profile

---

### 3.9.8 Economy_Expense

Tracks household expenses.

Attributes:

- expense_id (PK)
- economy_id (FK → Economy)
- expense_type_id (FK → Expense_Type)
- amount
- frequency

Relationship:

- One Economy → Many Expenses

---

### 3.9.9 Expense_Type

Lookup table for expense classification.

Attributes:

- expense_type_id (PK)
- expense_name
  (e.g., Food, Rent, Utilities, Transportation)

## 4. Relationship Summary

- Household (1) → (M) Family
- Family (1) → (M) Person
- Person (1) → (1) Child OR Guardian
- Child (M) ↔ (M) Guardian
- Child (1) → (M) Health_Record
- Child (1) → (M) Education_Record

---

## 5. Referential Integrity Strategy

- All foreign keys use InnoDB constraints
- Cascading delete restricted for historical records
- Person deletion restricted if linked to Child or Guardian
- Family deletion restricted if linked to Persons
- Household deletion restricted if linked to Families

This prevents accidental loss of dependent data.

---

## 6. Transaction Management

- Multi-entity creation (e.g., Family + Persons) executed within transactions
- Child registration workflow is atomic
- Rollback executed on failure

---

## 7. Indexing Strategy

Indexes applied to:

- All foreign key columns
- DNI (Unique)
- household_id
- family_id
- child_id
- guardian_id

This improves:

- Search performance
- Reporting queries
- Join efficiency

---

## 8. Normalization Level

The schema complies with Third Normal Form (3NF):

- No repeating groups
- No partial dependencies
- No transitive dependencies
- Clear entity separation

---

## 9. Future Enhancements

- Soft-delete strategy with status flag
- Audit log table for change tracking
- Reporting views for aggregated statistics
- Performance indexing refinement after load testing
