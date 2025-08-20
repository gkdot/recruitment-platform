/* eslint-disable */
import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { parse as csvParse } from "csv-parse/sync";

const serviceAccount = require(path.resolve(__dirname, "../../serviceAccountKey.json"));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

interface RoleEntry {
  email: string;
  role: string;
}

/**
 * Read the CSV file and parse into array of RoleEntry.
 */
function readUsersCSV(filePath: string): RoleEntry[] {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const rows: string[][] = csvParse(fileContent, {
    columns: false,
    skip_empty_lines: true,
    trim: true,
  });

  const records: RoleEntry[] = rows
    .map(row => ({
      email: row[0]?.trim(),
      role: row[1]?.trim(),
    }))
    .filter(r => r.email && r.role);

  return records;
}

async function assignRoles() {
  const csvFilePath = path.resolve(__dirname, "users.csv");
  const entries = readUsersCSV(csvFilePath);

  console.log(`Read ${entries.length} entries from CSV.`);

  for (const entry of entries) {
    const email = entry.email;
    const role = entry.role;

    if (!email || !role) {
      console.warn(`Skipping invalid entry:`, entry);
      continue;
    }

    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      await admin.auth().setCustomUserClaims(userRecord.uid, { role });
      console.log(`Assigned role "${role}" to ${email}`);
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        console.warn(`User not found yet: ${email}`);
      } else {
        console.error(`Failed for ${email}:`, err);
      }
    }
  }

  console.log("Role assignment complete!");
}

assignRoles().catch(console.error);
