# SRS · `<System Name>` · v<0.1>

> **Software Requirements Specification** — structured per **ISO/IEC/IEEE 29148:2018** (supersedes IEEE 830-1998).
> Used when: regulated industries (banking, medical, aviation, defence), government RFPs, long-lifecycle systems, formal contracts.
> Target length: 30–100+ pages. This template gives you the full skeleton — fill every subsection; if truly N/A, state so.

---

## § 01 · Introduction

### 1.1 · Purpose
State the purpose of this SRS and the intended readership (developers, testers, auditors, regulators, customer).

### 1.2 · Scope of the Product
- **Product name:** `<official name>`
- **What the product will do:** `<one paragraph>`
- **What the product will NOT do:** `<one paragraph — scope boundaries>`
- **Benefits / goals:** `<business outcomes>`
- **Applicability:** `<target users, deployment contexts>`

### 1.3 · Definitions, Acronyms, Abbreviations
| Term | Meaning |
|---|---|
| SRS | Software Requirements Specification |
| `<acronym>` | `<expansion>` |

### 1.4 · References
Numbered list of every document this SRS references: standards, regulations, interfacing-system specs, prior versions.

1. ISO/IEC/IEEE 29148:2018 · Systems and software engineering — Life cycle processes — Requirements engineering
2. `<regulation citation>`
3. `<interfacing system SRS>`

### 1.5 · Overview of this Document
One short paragraph: what each remaining section contains. Readers use this as a navigation map.

---

## § 02 · Overall Description

*The "big picture" section. Non-specialists read this and specialists skim it.*

### 2.1 · Product Perspective
Is this system standalone, a component of a larger system, a replacement for an existing system? Include a **context diagram** showing this system and its interfaces to external systems, users, and hardware.

- **System interfaces:** `<list external systems this connects to>`
- **User interfaces:** `<web · mobile · kiosk · API>`
- **Hardware interfaces:** `<sensors · printers · POS terminals>`
- **Software interfaces:** `<OS · databases · third-party APIs · versions>`
- **Communication interfaces:** `<HTTP/REST · MQTT · SFTP · protocols>`
- **Memory / storage constraints:** `<if applicable>`
- **Operations:** `<modes — normal, degraded, maintenance>`
- **Site adaptation:** `<per-deployment configuration>`

### 2.2 · Product Functions
A summary of the **major functions** the product will perform. Two or three paragraphs, or a bulleted list of function groups. Details go in §3.

### 2.3 · User Characteristics
Describe each class of user: education level, experience, expertise, frequency of use, privilege level. Drives UX, training, and help-system requirements.

| User Class | Description | Expertise | Frequency |
|---|---|---|---|
| `<admin>` | `<who>` | Expert | Daily |
| `<end-user>` | `<who>` | Novice | Weekly |
| `<auditor>` | `<who>` | Expert | Quarterly |

### 2.4 · Constraints
Constraints the designer is required to honour. Include:
- Regulatory policies
- Hardware limitations
- Interfaces to other applications
- Parallel operation requirements
- Audit functions
- Control functions
- Higher-order-language requirements
- Signal-handshake protocols
- Reliability requirements
- Criticality of the application
- Safety and security considerations

### 2.5 · Assumptions and Dependencies
Factors that are not design constraints but affect the requirements. If any of these change, the requirements must be reviewed.

- `<third-party API will remain available>`
- `<regulation X will not change before launch>`
- `<user browsers will support ECMAScript 2020+>`

### 2.6 · Apportioning of Requirements
Which requirements may be delayed to future versions.

---

## § 03 · Specific Requirements

*The heart of the SRS. Every requirement must be: correct, unambiguous, complete, consistent, ranked for importance/stability, verifiable, modifiable, traceable.*

### 3.1 · External Interface Requirements

#### 3.1.1 · User Interfaces
- Screen layouts (reference wireframes)
- UI standards (style guide compliance)
- Screen / message format
- Standard buttons, functions, or navigation
- Error-message display

#### 3.1.2 · Hardware Interfaces
- Supported device types, logical / physical characteristics
- Data / control interactions
- Communication protocols

#### 3.1.3 · Software Interfaces
For each external software component:
- Name · mnemonic · specification number · version · source
- Discussion of purpose
- Definition of the interface (messages, data, semantics)

#### 3.1.4 · Communications Interfaces
- Network protocols
- Electronic forms / email
- Synchronous vs asynchronous
- Communication standards (HTTP/2, gRPC, etc.)
- Security/encryption (TLS 1.3, mTLS)

### 3.2 · Functional Requirements

Each requirement is uniquely identified, testable, and traced to a user need.

#### FR-01 · `<Requirement name>`
- **Description:** `<one-sentence summary>`
- **Inputs:** `<sources · quantities · units · timing · valid ranges · accuracy>`
- **Processing:** `<validity checks · response to abnormal conditions · sequence · timing>`
- **Outputs:** `<destinations · format · timing · units>`
- **Preconditions:** `<state before>`
- **Postconditions:** `<state after>`
- **Error handling:** `<response to each failure mode>`
- **Priority:** Must / Should / Could
- **Traces to:** `<business need · stakeholder>`

#### FR-02 · ...

*(Repeat for every functional requirement. Numbered sections allow traceability to tests.)*

### 3.3 · Non-Functional Requirements

#### 3.3.1 · Performance Requirements
- `<static: number of users · records · transactions>`
- `<dynamic: throughput · response time · p95 / p99 latency>`
- **Measurable, testable.**

#### 3.3.2 · Safety Requirements
Requirements to prevent loss, damage, or harm. Often tied to standards (IEC 61508, ISO 26262, IEC 62304).

#### 3.3.3 · Security Requirements
- Authentication · authorisation · roles
- Data encryption at rest and in transit
- Audit logging
- Session management
- Compliance standards (PCI-DSS, HIPAA, GDPR, SOC 2)

#### 3.3.4 · Software Quality Attributes
| Attribute | Requirement |
|---|---|
| Reliability | `<MTBF · MTTR · failure modes>` |
| Availability | `<uptime %, maintenance windows>` |
| Maintainability | `<modularity · update cadence>` |
| Portability | `<platforms supported>` |
| Usability | `<training time · task completion · error rate>` |
| Accessibility | `<WCAG level · keyboard · screen reader>` |

#### 3.3.5 · Business Rules
Operating principles that aren't features but constrain behaviour. E.g., "Only a manager can approve a transfer over BTN 100,000."

### 3.4 · System Features *(alternative to §3.2 for feature-organised systems)*

For feature-oriented systems, organise by feature instead of type.

#### Feature 1 — `<name>`
- **Description and priority**
- **Stimulus / response sequences**
- **Functional requirements** (FR-F1-01, FR-F1-02, …)

### 3.5 · Other Requirements

#### 3.5.1 · Database Requirements
Types of information to be stored, frequency of use, accessing capabilities, data entities and relationships, integrity constraints, data retention.

#### 3.5.2 · Internationalisation / Localisation
Languages, regions, currency, date/time formats, right-to-left support.

#### 3.5.3 · Legal, Regulatory, Compliance
Specific statutes and standards the system must comply with.

---

## § 04 · Verification

How each requirement will be verified. **Every requirement traces to one or more verification methods.**

| Req ID | Verification Method | Acceptance Criterion |
|---|---|---|
| FR-01 | Test | `<measurable pass/fail>` |
| FR-02 | Demonstration | `<observable outcome>` |
| NFR-3.3.1 | Analysis | `<simulation / model>` |
| NFR-3.3.3 | Inspection | `<review against standard>` |

**Methods:** Test · Demonstration · Inspection · Analysis (T/D/I/A).

---

## § 05 · Appendices

### A. Analysis Models
Use-case diagrams, activity diagrams, data-flow diagrams, state diagrams, ER diagrams — whichever best communicate the system.

### B. Requirements Traceability Matrix
Map every requirement upwards (to business need / regulation) and downwards (to design element / test case).

| Req ID | Source (business need) | Design Element | Test Case(s) | Status |
|---|---|---|---|---|
| FR-01 | BR-02 · regulation § X | Module A | TC-01, TC-02 | Approved |

### C. Issues List
Open issues pending resolution before the SRS is baselined.

### D. Glossary
Domain-specific terms used throughout.

---

## Changelog

- `v0.1` · initial draft · `<author>` · `YYYY-MM-DD`
- `v0.5` · §3 complete, verification matrix added · `YYYY-MM-DD`
- `v1.0` · baselined; signed off by `<reviewers>` · `YYYY-MM-DD`

---

## Sign-off

| Role | Name | Signature | Date |
|---|---|---|---|
| Author (BA) | | | |
| Dev Lead | | | |
| QA Lead | | | |
| Architect | | | |
| Product Owner | | | |
| Compliance / QA Assurance | | | |
| Customer Representative | | | |
