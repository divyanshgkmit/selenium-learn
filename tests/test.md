### 🧠 Summary — Selenium Setup & Use with JavaScript + Firefox

#### 1️⃣ What Selenium Is

* A tool for **automating web browsers** (open sites, click buttons, fill forms, etc.)
* Works with browsers like **Firefox, Chrome, Edge**, etc.
* Supports languages: **JavaScript, Python, Java, C#, Ruby**

---

#### 2️⃣ How It Works

Your script → Selenium WebDriver → Browser Driver (e.g., GeckoDriver for Firefox) → Browser.

---

#### 3️⃣ How to Set It Up (JavaScript + Firefox)

```bash
# Step 1: Install Node.js (from nodejs.org)
# Step 2: Create project folder
mkdir selenium-demo && cd selenium-demo
npm init -y

# Step 3: Install Selenium
npm install selenium-webdriver

# Step 4: Install GeckoDriver (from GitHub: mozilla/geckodriver)
# Add it to your PATH
geckodriver --version
```

---

#### 4️⃣ Example Script (Using Firefox)

**test.js**

```javascript
const { Builder, By, Key, until } = require('selenium-webdriver');

async function run() {
  let driver = await new Builder().forBrowser('firefox').build();

  try {
    await driver.get('https://www.google.com');
    await driver.findElement(By.name('q')).sendKeys('Selenium WebDriver', Key.RETURN);
    await driver.wait(until.titleContains('Selenium WebDriver'), 5000);
    console.log(await driver.getTitle());
  } finally {
    await driver.quit();
  }
}

run();
```

Run it:

```bash
node test.js
```

🧩 Firefox will open, search for “Selenium WebDriver”, then close.

---

#### 5️⃣ Types of Frameworks in Selenium

| Framework                 | What It Does                          | Example                   |
| ------------------------- | ------------------------------------- | ------------------------- |
| **Data-Driven**           | Test data in files (Excel, JSON, CSV) | Login test using CSV data |
| **Keyword-Driven**        | Uses keywords for actions             | `Click`, `Login`, etc.    |
| **Hybrid**                | Combines both                         | Common in real projects   |
| **BDD (Behavior-Driven)** | Human-readable tests                  | Uses Cucumber.js or Mocha |

---

#### 6️⃣ Sample Task (Login Automation)

```javascript
const { Builder, By, Key } = require('selenium-webdriver');

async function loginDemo() {
  let driver = await new Builder().forBrowser('firefox').build();

  try {
    await driver.get('https://the-internet.herokuapp.com/login');
    await driver.findElement(By.id('username')).sendKeys('tomsmith');
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!', Key.RETURN);
    await driver.sleep(2000);
  } finally {
    await driver.quit();
  }
}

loginDemo();
```

---

So far, this setup gives you:
✅ Selenium running with JavaScript
✅ Firefox as the browser
✅ Example scripts working

---

Would you like me to now show you **how to build a simple framework** (like a BDD or data-driven framework) around your Selenium tests in JavaScript?
That’s the next logical step to make your automation “project-ready.”
