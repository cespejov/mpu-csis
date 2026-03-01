# Software Design

# 1. Design Overview

## 1. Presentation Layer (Frontend)

## 2. Business Logic Layer (Application Layer)

## 3. Data Access Layer (Database Layer)

# 2. High Level Architecture

[ UI / Forms / Admin Dashboard ]
↓
[ Controllers ]
↓
[ Services / Business Logic ]
↓
[ Repositories / DAO ]
↓
[ Database ]

# 3. Core Modules Design

## 3.1 Household Module

Responsibilities:

Registering and managing household records.
Classifying households by type.
Managing household dwelling information.
Managing access to public/basic services.
Linking families to households.
Enforcing household-level business validation rules.

Main Classes:
Household
HouseholdService
Service
HouseholdType
Dwelling
Tenure
ConstructionMaterial
Family

Relationships:

Household → has many Families
Household → has one Dwelling
Household → has one Tenure
Household → has many Household_Services
Household → has one HouseholdType
Dwelling → has one ConstructionMaterial

## 3.2 Family Module

Responsibilities:

Create family inside a household.
Link persons to family.
Maintain surname.

Main Classes:
Family

Relationships:

Family → belongs to Household
Family → has many Persons

## 3.3 Person Module

Responsibilities:

Managing personal identity information.
Assigning persons to families.
Specializing persons into Child or Guardian.
Managing individual economic profiles (for any person).
Supporting income aggregation at household level.
Enforcing uniqueness and identity constraints (DNI).
Providing data for socio-economic risk calculations.

Base Class:

Person

Extended Entities:
Child
Guardian

Relationships:
Family → has many Person
Person (1) → (0..1) Child
Person (1) → (0..1) Guardian
Person → has many Economy

## 3.4 Child Module

Responsibilities:

Specializing a Person as a Child.
Managing child–guardian relationships.
Tracking educational history and performance.
Tracking health records and physical indicators.
Supporting child-level vulnerability assessment.
Enforcing guardian relationship integrity.
Providing longitudinal (time-based) tracking.

Related Classes:

Child
HealthRecord
Education
GuardianChild (junction table)

Relationships:
Child → has many Education
Child → has many HealthRecord

## 3.5 Health Module

Responsibilities:

Track nutrition.
Track diseases.
Track violence indicators.
Maintain longitudinal records.

Core Classes:

HealthRecord
HealthLifestyle
HealthNutrition
HealthRecordDisease

Relationships:

HealthRecord → has many HealthRecordDisease
HealthRecord → has many HealthLifestyle
HealthRecord → has many HealthNutrition

## 3.6 Education Module

Responsibilities:

Store school information.
Attendance.
Performance.
Enrollment history.

Class:
Education

## 3.7 Economy Module

Responsibilities:

Store income.
Track employment.
Track expenses.
Evaluate vulnerability.

Classes:

Person
Economy
EconomyExpense
ExpenseType

Relationships:

Person → has many Economy
Economy → has many EconomyExpense

## 4. Class Diagram (Conceptual OOP Design)

class Person {
personId
firstName
lastName
dni
dateOfBirth
sex
religion
phone
email
List<Economy> economyRecords
}

class Child {
childId
Person person
List<HealthRecord> healthRecords
List<Education> educationRecords
List<ChildGuardian> guardianLinks
}

class Education{
educationId
Child child
schoolName
academicYear
gradeLevel
enrollmentStatus
performanceLevel
conduct
attendance
socialization
bullying
socialBehavior
observation
educationStatusResult
}

class HealthRecord{
healthRecordId
Child child
weight
height
weightStatus
muacScore
violence
bmi
healthStatusResult
List<HealthLifestyle> lifestyles
List<HealthNutrition> nutritions
List<HealthRecordDisease> diseases
}

class HealthLifestyle{
lifestyleId
Health_Record health_record
hobby
habit
}

class HealthNutrition{
nutritionId
Health_Record health_record
nutritionName
activityType
}

class HealthRecordDisease{
Health_Record health_record
Disease disease
}

class Disease{
diseaseId
diseaseName
diseaseType
}

class Guardian {
guardianId
Person person
occupation
educationLevel
List<ChildGuardian> childLinks
}

class ChildGuardian {
Child child
Guardian guardian
relationshipType
isPrimary
startDate
endDate
}

class Family {
familyId
Household household
List<Person> persons
}

class Economy {
economyId
Person person
individualIncome
economyDate
economyStatusResult
List<EconomyExpense> expenses
}

class EconomyExpense{
Economy economy
Expense_type expense_type
amount
}

class ExpenseType{
expense_type_id (PK)
name
}

class Household {
householdId
Household_Type household_type
Tenure tenure
Dwelling dwelling
personPerBed
householdStatusResult
List<Family> families
List<HouseholdService> services
}

class HouseholdService{
householdServiceId
Household household
Service service
availabilityStatus
accessType
qualityLevel
}

class Service{
serviceId
serviceName
}

class HouseholdType{
householdTypeId
typeName
description
}

class Tenure{
tenureId
tenureName
description
}

class Dwelling{
dwellingId
Construction_Material construction_material
address
city
geoLocation
rooms
bedrooms
ventilation
yearBuilt
}

class ConstructionMaterial{
constructionMaterialId
materialName
}

## 5. Key Design Decisions

✔ 1. Use Composition for Strong Ownership

Household OWNS families.
Child OWNS health records.
Guardian OWNS economy profile.

✔ 2. Use Junction Table for Many-to-Many
Child ↔ Guardian

This allows:
One child with multiple guardians.
One guardian responsible for multiple children.

✔ 3. Normalization Level

Database follows:

3rd Normal Form (3NF).
No redundant economic duplication.
No duplicated personal data

## 6. API Design (RESTful Structure)

Example endpoints:

Household
POST /households
GET /households/{id}
GET /households
PUT /households/{id}
DELETE /households/{id}

POST /household-types
GET /household-types

POST /services
GET /services

POST /households/{id}/services
DELETE /households/{id}/services/{serviceId}

Family
POST /families
GET /families/{id}

Person
POST /persons
GET /persons/{id}

Child
POST /children
GET /children/{id}

Guardian
POST /guardians
GET /guardians/{id}

Economy
POST /economy
GET /economy/{guardianId}

## 7. Data Validation Rules

DNI → UNIQUE

Child must belong to exactly one Family
Guardian must have exactly one Economy profile
HealthRecord must belong to exactly one Child
EconomyExpense must belong to exactly one Economy

## 8. Security Design

Role-based access control:

Admin
Field Worker
Viewer

Data encryption:

Password hashing
Sensitive PII protected

## 9. Scalability Considerations

Pagination for listing households

Index on:
-DNI
-foreign keys
-record_date (health)

## 10. Future Design Enhancements

Risk Scoring Engine.
Reporting Module (PDF/Excel export).
Geographic Mapping.
AI-based vulnerability prediction.
