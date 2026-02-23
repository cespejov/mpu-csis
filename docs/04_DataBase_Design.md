# Database Design

## 1. Overview

The system uses a relational database model implemented in MySQL to ensure transactional consistency, referential integrity, and optimized data access.

The database follows a relational schema organized into domain-centered aggregates.

Core Hierarchy
-Household
--Family
---Person
----Child
----Guardian

Household Structural Domain
--Household_Type
--Tenure
--Dwelling
---Construction_Material
--Household_Service
---Service

Person Economic Domain
-Economy
--Economy_Expense
---Expense_Type

Child Development Domain
-Education
-Health_Record
--Health_Lifestyle
--Health_Nutrition
--Health_Record_Disease
---Disease

Relationship Tables

Child_Guardian (Many-to-Many between Child and Guardian)

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
- household_type_id (FK → Household_type)
- tenure_id (FK → Ternure)
- dwelling_id (FK → Dwelling)
- person_per_bed
- household_status_result
- created_at
- updated_at

Relationship:

- One Household → Many Families
- One Household → Many Household_Services
- One Household → One Dwelling

### 3.1.1 Dwelling

Represents housing characteristics.

Attributes:

- dwelling_id (PK)
- construction_material_id (FK → Construction_Material)
- address
- city
- geo_location
- rooms
- bedrooms
- ventilation
- year_built

Relationship:

- One Household → One Dwelling

### 3.1.1.1 Construction_Material

Lookup table for housing material classification.

Attributes:

- construction_material_id (PK)
- material_name

---

### 3.1.2 Household_Service

Junction table for services available to a household.

Attributes:

- household_service_id (PK)
- household_id (FK)
- service_id (FK)
- availability_status
- access_type
- quality_level

UNIQUE (household_id, service_id)

---

### 3.1.2.1 Service

Lookup table for available services.

Attributes:

- service_id (PK)
- service_name
  (e.g., Electricity, Internet, Water, Gas)

---

### 3.1.3 Household_Type

Lookup table describing family structure.

Attributes:

- household_type_id (PK)
- type_name
  (e.g., Nuclear, Extended, Single-parent)
- description

---

### 3.1.4 Tenure

Represents property ownership status.

Attributes:

- tenure_id (PK)
- tenure_type
  (e.g., Owned, Rented, Informal, Temporary)
- description

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

- One Person → May be Child
- One Person → May be Guardian
- One Person → Many Economy Records

---

### 3.3.1 Child

Represents a child enrolled in the program.

Attributes:

- child_id (PK)
- person_id (FK → Person)
- enrollment_date
- status

Relationships:

- One Child → Many Health Records
- One Child → Many Education Records
- One Child ↔ Many Guardians (via Child_Guardian junction table)

---

### 3.3.2 Guardian

Represents an adult responsible for a child.

Attributes:

- guardian_id (PK)
- person_id (FK → Person)
- occupation
- education_level

Relationship:

- Many Guardians ↔ Many Children

---

### 3.3.3 Child_Guardian (Junction Table)

Implements the many-to-many relationship.

Attributes:

- child_id (FK → Child)
- guardian_id (FK → Guardian)
- relationship_type
- is_primary

Composite Primary Key:
(child_id, guardian_id)

---

### Child Development

### 3.4 Health_Record

Stores historical child health metrics.

Attributes:

- health_record_id (PK)
- child_id (FK → Child)
- weight
- height
- weight_status
- muac_score
- violence
- bmi
- health_status_result
- created_at
- updated_at

Relationship:

- One Child → Many Health Records

Policy:

- Historical records are preserved (no overwrite).

---

### 3.4.1 Health_LifeStyle

Attributes:

- lifestyle_id (PK)
- health_record_id (FK)
- hobby
- habit

---

### 3.4.2 Disease

Attributes:

- disease_id (PK)
- disease_name
- disease_type

---

### 3.4.3 Health_Record_Disease (Junction Table)

Implements the many-to-many relationship.

Attributes:

- health_record_id (PK, FK)
- disease_id (PK, FK)

Composite Primary Key:
(health_record_id, disease_id)

---

### 3.5 Education_Record

Stores educational history.

Attributes:

- education_id (PK)
- child_id (FK)
- academic_year
- performance_level
- conduct
- attendance
- socialization
- Bullying
- social_treatment
- observation
- education_status_result
- education_date
- created_at
- updated_at

Relationship:

- One Child → Many Education Records

## Socio-Economic Domain Tables

To support comprehensive socio-economic assessment

---

### 3.6 Economy

Represents economic profile of a person.

Attributes:

- economy_id (PK)
- person_id (FK)
- individual_income
- economy_date
- economy_status_result
- created_at
- updated_at

Relationship:

- One Person → Many Economy Records
- One Economy → Many Expenses

---

### 3.6.1 Economy_Expense

Tracks person-level expenses.

Attributes:

- economy_id (PK, FK)
- expense_type_id (PK, FK)
- amount

Relationship:

- One Economy → Many Expenses

---

### 3.6.1.1 Expense_Type

Lookup table for expense classification.

Attributes:

- expense_type_id (PK)
- expense_name
  (e.g., Food, Rent, Utilities, Transportation)

## 4. Relationship Summary

- Household (1) → (M) Family
- Household (1) → (M) Household_Service
- Household (1) → (1) Dwelling

- Family (1) → (M) Person

- Person (1) → (0..1) Child
- Person (1) → (0..1) Guardian
- Person (1) → (M) Economy

- Child (M) ↔ (M) Guardian (via Child_Guardian)

- Child (1) → (M) Health_Record
- Health_Record (1) → (M) Health_Lifestyle
- Health_Record (1) → (M) Health_Nutrition
- Health_Record (1) → (M) Health_Record_Disease
- Health_Record (M) ↔ (M) Disease (via Health_Record_Disease)

- Child (1) → (M) Education

- Economy (1) → (M) Economy_Expense
- Economy_Expense (1) → (M) Expense_type

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
