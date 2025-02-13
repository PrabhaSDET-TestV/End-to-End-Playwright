// const express = require("express");
// const bodyParser = require("body-parser");
// const { exec } = require("child_process");

// const app = express();
// const PORT = 3000;

// // Middleware to parse JSON
// app.use(bodyParser.json());

// // Webhook endpoint - Triggers Playwright tests
// app.post("/webhook", (req, res) => {
//     const { test_script } = req.body;

//     if (!test_script) {
//         return res.status(400).json({ error: "Test script name is required" });
//     }

//     console.log(`Running Playwright test: ${test_script}`);

//     // Run the Playwright test using exec
//     exec(`npx playwright test ${test_script}`, (error, stdout, stderr) => {
//         console.log(stdout); // Logs test output
//         console.error(stderr); // Logs errors if any

//         if (error) {
//             console.error(`Test failed: ${stderr}`);
//             return res.status(500).json({ message: "Test failed", error: stderr });
//         }

//         res.status(200).json({ message: "Test passed successfully", output: stdout });
//     });
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Webhook server is running on http://localhost:${PORT}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Webhook endpoint - Runs Playwright test and returns result
app.post("/webhook", (req, res) => {
    const { test_script } = req.body;

    if (!test_script) {
        return res.status(400).json({ error: "Test script name is required" });
    }

    console.log(`Running Playwright test: ${test_script}`);

    // Run Playwright test with environment variable to prevent opening the report
    const command = `PW_TEST_HTML_REPORT_OPEN=never npx playwright test ${test_script}`;

    exec(command, (error, stdout, stderr) => {
        console.log(stdout); // Log test output
        console.error(stderr); // Log errors if any

        if (error) {
            console.error("Test execution error:", error);
            return res.status(500).json({
                message: "Test failed",
                error: stderr || stdout
            });
        }

        res.status(200).json({ message: "Test passed successfully", output: stdout });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Webhook server is running on http://localhost:${PORT}`);
});
