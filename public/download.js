const express = require("express");
const crypto = require("crypto");
const app = express();
const fs = require("fs");
const path = require("path");

// Function to generate a secure random token of a specified length
function generateRandomToken(length) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
}

// Function to generate a temporary download URL with a given expiration time (in minutes)
function generateTempDownloadUrl(expirationMinutes) {
  // Replace "/bluey.apk" with the actual path to your APK file on the server
  const apkFilePath = path.join(__dirname, "/bluey.apk");

  // Generate a unique token for the temporary URL
  const token = generateRandomToken(20); // Generate a 20-character random token

  // Calculate the expiration timestamp (current time + expiration time in minutes)
  const expirationTimestamp = Date.now() + expirationMinutes * 60 * 1000;

  // Construct the temporary download URL with the token and expiration timestamp
  const tempDownloadUrl = `/temp_download/${token}/${expirationTimestamp}`;

  // Create the temp_download folder if it doesn't exist
  const tempDownloadFolder = path.join(__dirname, "/temp_download");
  if (!fs.existsSync(tempDownloadFolder)) {
    fs.mkdirSync(tempDownloadFolder);
  }

  // Move the APK file to the temporary folder with the generated token in the filename
  const tempApkFilePath = path.join(tempDownloadFolder, `${token}.apk`);
  fs.copyFileSync(apkFilePath, tempApkFilePath);

  return tempDownloadUrl;
}

// Route to handle download requests and generate temporary URLs
app.get("/get_temp_download_url", (req, res) => {
  // Generate a temporary URL that expires in 10 minutes (you can customize the expiration time)
  const tempDownloadUrl = generateTempDownloadUrl(10);

  // Respond with the temporary URL as JSON
  res.json({ tempDownloadUrl });
});

// Start the server on port 3000 (you can change this to a different port if needed)
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
