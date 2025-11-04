# 🧪 1. What is Software Testing?

Software testing means **checking if your code works correctly**, meets user requirements, and is **free from bugs or issues**.

It ensures that your application:

* 💡 Works as intended
* ⚙️ Handles errors gracefully
* 🚀 Performs efficiently
* 👥 Delivers a great user experience

---

## 🧱 Types of Testing (based on scope)

| Type                    | Description                                 | Example                            |
| ----------------------- | ------------------------------------------- | ---------------------------------- |
| **Unit Testing**        | Testing individual functions or modules     | Testing `add(2, 3)` returns 5      |
| **Integration Testing** | Testing how multiple modules interact       | Testing login → dashboard flow     |
| **System Testing**      | Testing the whole application as one system | Testing complete web app           |
| **Acceptance Testing**  | Checking if it meets business/user needs    | End-user approval testing          |
| **Regression Testing**  | Checking old features after new updates     | Re-test login after profile update |

---

# 🕹️ 2. Selenium — The Automation Tool

**Selenium** is an **open-source tool** that automates browsers.
It allows you to **simulate real user actions** — typing, clicking, scrolling, etc.

### ⚙️ Selenium supports:

* Multiple **browsers** (Chrome, Firefox, Safari, Edge)
* Multiple **languages** (JavaScript, Java, Python, C#, Ruby)
* **Cross-platform** testing (Windows, macOS, Linux)

---

## 🔧 Selenium with JavaScript Example

Let’s use **Selenium WebDriver** with Node.js.

```javascript
const { Builder, By, Key, until } = require('selenium-webdriver');

(async function testGoogleSearch() {
  // Step 1: Start Chrome browser
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Step 2: Open Google
    await driver.get('https://www.google.com');

    // Step 3: Find search bar and type query
    await driver.findElement(By.name('q')).sendKeys('Selenium WebDriver', Key.RETURN);

    // Step 4: Wait until results appear
    await driver.wait(until.titleContains('Selenium WebDriver'), 5000);

    console.log("✅ Test Passed: Page title contains 'Selenium WebDriver'");
  } catch (error) {
    console.error("❌ Test Failed:", error);
  } finally {
    // Step 5: Close the browser
    await driver.quit();
  }
})();
```

---

# 🧱 3. Testing Frameworks

A **testing framework** is a structured environment that helps you **write, organize, run, and report** tests.

### 🧩 Why use a framework?

* Better **organization** (separate tests from code)
* Clear **reports**
* Built-in **assertions**
* Easy **automation and CI/CD integration**

Popular frameworks:

| Framework        | Language   | Type             |
| ---------------- | ---------- | ---------------- |
| **Jest**         | JavaScript | Unit/Integration |
| **Mocha + Chai** | JavaScript | Unit/E2E         |
| **Pytest**       | Python     | Unit/Integration |
| **TestNG**       | Java       | Unit/Integration |
| **Selenium**     | Multi      | UI/E2E Testing   |

---

# 🧱 4. POM (Page Object Model) Design Pattern 🧩

**POM (Page Object Model)** is a **design pattern** for structuring Selenium automation projects.

It separates:

* **Page elements and actions** (like buttons, input fields)
* **Test scripts** (that perform validation)

### ⚙️ Structure Example

```
/tests
  ├── testLogin.js
/pages
  ├── loginPage.js
```

### 🔹 loginPage.js

```javascript
const { By } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.username = By.id('username');
    this.password = By.id('password');
    this.loginBtn = By.id('loginBtn');
  }

  async login(user, pass) {
    await this.driver.findElement(this.username).sendKeys(user);
    await this.driver.findElement(this.password).sendKeys(pass);
    await this.driver.findElement(this.loginBtn).click();
  }
}

module.exports = LoginPage;
```

### 🔹 testLogin.js

```javascript
const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/loginPage');

(async function testLogin() {
  const driver = await new Builder().forBrowser('chrome').build();
  const loginPage = new LoginPage(driver);

  await driver.get('https://example.com/login');
  await loginPage.login('testUser', 'testPassword');

  console.log("✅ Login test successful!");
  await driver.quit();
})();
```

✅ **Advantages of POM:**

* Clean, reusable code ♻️
* Easier maintenance 🔧
* Scalable for large apps 📈
* Clear separation of logic 🔍

---

# 🧩 5. Testing Methodologies — TDD & BDD

Now let’s understand the **approaches** to writing and organizing your tests.

---

## 🧠 TDD (Test Driven Development)

### ⚙️ What is TDD?

TDD = **Test → Code → Refactor**

You write **tests first**, then write the **code to make those tests pass**.

**Cycle of TDD (Red-Green-Refactor):**

1. 🔴 **Write a test** that fails (RED)
2. 🟢 **Write minimal code** to make it pass (GREEN)
3. 🧹 **Refactor** the code for clarity and performance

### 💡 Example (TDD in JavaScript with Jest)

**Step 1: Write test first (fails)**

```javascript
// math.test.js
const add = require('./math');

test('adds two numbers correctly', () => {
  expect(add(2, 3)).toBe(5);
});
```

**Step 2: Implement code to pass**

```javascript
// math.js
function add(a, b) {
  return a + b;
}
module.exports = add;
```

✅ **Benefits:**

* Ensures all code is testable
* Reduces bugs early
* Builds confidence in code changes

---

## 💬 BDD (Behavior Driven Development)

### ⚙️ What is BDD?

BDD = **Behavior-driven development**
It focuses on **user behavior** and **business logic**, not just code logic.

It uses **plain English scenarios** written in a format like:

```
Given → When → Then
```

* **Given**: initial context
* **When**: an action
* **Then**: expected outcome

### 🌟 Example (BDD in JavaScript using Cucumber.js)

**Feature file (login.feature):**

```
Feature: Login functionality

Scenario: Valid login
  Given I am on the login page
  When I enter valid credentials
  Then I should see the dashboard
```

**Step Definitions (loginSteps.js):**

```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By } = require('selenium-webdriver');

let driver;

Given('I am on the login page', async function () {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://example.com/login');
});

When('I enter valid credentials', async function () {
  await driver.findElement(By.id('username')).sendKeys('user');
  await driver.findElement(By.id('password')).sendKeys('pass');
  await driver.findElement(By.id('loginBtn')).click();
});

Then('I should see the dashboard', async function () {
  const title = await driver.getTitle();
  if (!title.includes('Dashboard')) throw new Error('Login failed!');
  await driver.quit();
});
```

✅ **Benefits:**

* Improves collaboration between developers, testers, and stakeholders
* Easy-to-read documentation
* Tests describe **user behavior** instead of technical details

---

# ⚛️ 6. Jest (JavaScript Testing Framework)

### ✨ Jest Features:

* Fast & zero-configuration 🚀
* Built-in mocking and coverage reports 📊
* Ideal for **React**, **Node.js**, and **frontend testing**

### Example:

```javascript
function multiply(a, b) {
  return a * b;
}

test('multiplies 2 and 3 correctly', () => {
  expect(multiply(2, 3)).toBe(6);
});
```

Run using:

```bash
npx jest
```

✅ Use Jest for:

* Unit and integration testing in **JavaScript** projects
* Testing **React components**

---

# 🐍 7. Pytest (Python Testing Framework)

### Features:

* Simple syntax 🧠
* Auto-discovery of tests 🔍
* Rich plugins (HTML reports, fixtures)

Example:

```python
def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5
```

Run with:

```bash
pytest
```

✅ Use Pytest for:

* **API**, **backend**, or **data pipeline** testing in Python

---

# ☕ 8. TestNG (Java Testing Framework)

### Features:

* Annotation-based (`@Test`, `@BeforeClass`, etc.)
* Data-driven tests
* Parallel test execution

Example (Java):

```java
import org.testng.annotations.Test;

public class LoginTest {
  @Test
  public void testLogin() {
    System.out.println("Login successful!");
  }
}
```

✅ Use TestNG for:

* **Selenium Java automation**
* **Enterprise-grade testing**

---

# ⚖️ 9. Comparison Summary Table

| Feature       | Selenium           | Jest               | Pytest         | TestNG           | Cucumber (BDD)          |
| ------------- | ------------------ | ------------------ | -------------- | ---------------- | ----------------------- |
| **Language**  | Multi              | JavaScript         | Python         | Java             | Multi                   |
| **Test Type** | E2E / UI           | Unit / Integration | Unit / API     | UI / Integration | BDD Scenarios           |
| **Approach**  | Manual scripting   | TDD                | TDD            | TDD              | BDD                     |
| **Best For**  | Browser automation | JS apps            | Python backend | Java automation  | Business-readable tests |
| **Speed**     | Medium             | Fast               | Fast           | Medium           | Medium                  |

---

# 🧠 10. Summary

| Concept       | Description                                    |
| ------------- | ---------------------------------------------- |
| **Testing**   | Process to verify code works correctly         |
| **Selenium**  | Automates browsers for UI testing              |
| **Framework** | Structure for writing & managing tests         |
| **POM**       | Design pattern to keep Selenium code organized |
| **TDD**       | Write tests first, then write code             |
| **BDD**       | Describe tests in human-readable language      |
| **Jest**      | JS testing framework for unit/integration      |
| **Pytest**    | Python testing framework                       |
| **TestNG**    | Java testing framework for Selenium            |

---

# 🚀 Final Thought

If you’re a **JavaScript developer**, a great testing setup looks like this:

🧩 **Stack Recommendation:**

* **Selenium (for UI automation)**
* **Jest or Mocha (for test framework)**
* **Cucumber (for BDD if needed)**
* **POM pattern (for scalability)**

This combination =
✅ Clean code
✅ Easy maintenance
✅ Great collaboration
✅ Scalable testing system

