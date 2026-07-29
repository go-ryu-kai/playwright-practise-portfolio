[![Playwright Tests](https://github.com/go-ryu-kai/playwright-practise-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/go-ryu-kai/playwright-practise-portfolio/actions/workflows/playwright.yml)

<img width="1024" height="572" alt="image" src="https://github.com/user-attachments/assets/169041ec-2e4e-4cc3-a2ca-fd9d2bcb7d66" />

---

A test automation framework designed with **TypeScript** and **Playwright**, targeting the modern web elements of the [Automation Exercise](https://automationexercise.com/) sandbox. 

This repository showcases enterprise-level automation practices, focusing on web-first assertions, role-based locators, robust Page Object Model implementation, API/UI hybrid scripts, client-side security checks, and reliable CI/CD pipelines. It is currently a Work In Progress: expect new updates every week, if not every other day.

It is not only my automation portfolio, but my playground where I am actively improving and exploring my test automation skillset. Any comments, suggestions, and additions are welcome!

---

## Highlights

Rather than relying on basic click-and-fill scripts, this framework implements advanced automation patterns:

*   **Modern Locator Tier-List:** No XPaths — role-based selectors used according to Playwright's locator ranking and best practises, parent-child filtering
*   **Hybrid API & UI Integration:** Intercepting, auditing and validating backend payloads parallel to UI interactions
*   **Defensive Security Verification:** Monitors the console, reports cross-origin leaks during navigation, and validates the webpage according to OWASP standards
*   **Web-First Asynchronous Resilience:** Leverages Playwright's automatic retry logic to achieve zero flakiness
*   **Production Git Workflow & CI/CD:** Automated **GitHub Actions** integration, targeting the industry-standard `dev` and `main` branches

---

## Tech Stack & Architecture

*   **Language:** TypeScript
*   **Test Runner:** Playwright Test
*   **CI/CD:** GitHub Actions (Ubuntu Environment)
*   **Design Pattern:** Page Object Model (POM) with encapsulation and inheritance

```text
Playwright-Portfolio-Pro/
│
├── pages/                  # Page Object Models (UI actions and encapsulation)
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   └── ProductPage.ts
│   └── ...
│
├── tests/                  # Executable test suites
│   ├── ui/                 # Functional E2E and visual states
│   ├── api/                # Endpoint validation tests
│   └── security/           # Dynamic error & console auditing
│
├── .github/workflows/      # Automated CI/CD execution pipeline
└── playwright.config.ts    # Main runner configurations
```

---

## AI Usage Disclosure

Generative AI was **NOT** used to generate any code for this project.
The purpose of this project is to learn Playwright, and I find that relying on the Copilot GenAI autocomplete defeats the entire purpose of learning a new language.
Copilot AI and autocomplete was thus disabled.
Generative AI was, however, used in the following ways:
  
* Creating a mockup banner to brighten up the README
* Formatting the README in a legible manner after providing a rough draft
* Debugging hard-to-replicate issues, such as debugging that the Google Ads screen was interfering with locator selection
* Suggesting libraries to implement, such as Faker.js

For the above, Google AI Search/Gemini AI was used. _No other AI tools were used._

