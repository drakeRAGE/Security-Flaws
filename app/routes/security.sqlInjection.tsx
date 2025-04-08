import React from 'react';

const SqlInjectionExplanation = () => {
    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-white">
                <h1 className="text-4xl font-bold mb-8 text-center">SQL Injection</h1>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <p className="mb-4 text-gray-300">
                        SQL Injection is a type of security vulnerability that allows an attacker to inject malicious SQL code into a query executed by a backend database. This happens when user input is improperly sanitized or directly concatenated into SQL statements, enabling attackers to manipulate the query's logic.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">How Does SQL Injection Work?</h2>
                    <div className="space-y-6">
                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">User Input:</h3>
                            <p className="text-gray-300">The application accepts input from a user (e.g., via a form, URL parameter, or API request).</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Improper Query Construction:</h3>
                            <p className="text-gray-300">The input is directly embedded into a SQL query without sanitization or parameterization.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Query Manipulation:</h3>
                            <p className="text-gray-300">The attacker crafts input that alters the query's intended behavior, such as bypassing authentication, extracting data, or modifying the database.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Execution:</h3>
                            <p className="text-gray-300">The database executes the altered query, fulfilling the attacker's objective.</p>
                        </div>
                    </div>

                    <div className="mt-8 bg-gray-750 p-6 rounded-lg border border-gray-600">
                        <h3 className="text-xl font-semibold mb-3 text-white">Example Scenario:</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li>A login form accepts a username and password.</li>
                            <li>The backend constructs a query like: SELECT * FROM users WHERE username = 'input' AND password = 'input'.</li>
                            <li>Attacker enters ' OR '1'='1 as the username, making the query: SELECT * FROM users WHERE username = '' OR '1'='1' AND password = 'input', which logs them in without a valid password.</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
                    <h2 className="text-2xl font-semibold mb-6">Why is SQL Injection Dangerous?</h2>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Unauthorized Data Access: Attackers can retrieve sensitive data (e.g., passwords, credit card numbers) from the database.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Data Modification: Attackers can alter or delete records (e.g., changing account balances, dropping tables).</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Authentication Bypass: Attackers can log in as any user, including admins, without credentials.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Full System Compromise: In severe cases, attackers can execute system commands (e.g., via xp_cmdshell in MSSQL) or escalate privileges.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Legal/Reputation Risks: Data breaches can lead to regulatory fines (e.g., GDPR) and loss of user trust.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">Example of Vulnerable Code</h2>
                    <p className="text-gray-300 mb-4">Here's an example of a vulnerable Next.js API route with SQL injection:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Vulnerable Code (Next.js API Route)
// File: pages/api/user.ts

import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg"; // Using PostgreSQL

const pool = new Pool({
  user: "dbuser",
  host: "localhost",
  database: "mydb",
  password: "dbpassword",
  port: 5432,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Directly concatenating user input into query
    const query = \`SELECT * FROM users WHERE username = '\${username}' AND password = '\${password}'\`;
    try {
      const result = await pool.query(query);
      if (result.rows.length > 0) {
        res.status(200).json({ message: "Login successful", user: result.rows[0] });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}`}
                        </pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why is this vulnerable?</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-8">
                        <li>The username and password inputs are directly inserted into the SQL query string without sanitization.</li>
                        <li>An attacker can input username = ' OR '1'='1 and password = anything, resulting in:</li>
                        <li className="font-mono bg-gray-850 p-2 rounded">SELECT * FROM users WHERE username = '' OR '1'='1' AND password = 'anything'</li>
                        <li>This always evaluates to true, bypassing authentication and returning the first user's data (potentially an admin).</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-4">Attack Examples:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-8">
                        <li>username: admin' -- (comments out the rest of the query):</li>
                        <li className="font-mono bg-gray-850 p-2 rounded">SELECT * FROM users WHERE username = 'admin' -- AND password = 'anything'</li>
                        <li>username: ' UNION SELECT null, username, password FROM users -- (extracts all usernames/passwords).</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-6">Example of Fixed Code</h2>
                    <p className="text-gray-300 mb-4">Here's the fixed version using parameterized queries to prevent SQL injection:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Fixed Code (Next.js API Route)
// File: pages/api/user.ts

import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg"; // Using PostgreSQL

const pool = new Pool({
  user: "dbuser",
  host: "localhost",
  database: "mydb",
  password: "dbpassword",
  port: 5432,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Use parameterized query
    const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
    const values = [username, password];

    try {
      const result = await pool.query(query, values);
      if (result.rows.length > 0) {
        res.status(200).json({ message: "Login successful", user: result.rows[0] });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}`}
                        </pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why is this fixed?</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300">
                        <li>Uses parameterized queries ($1, $2) instead of string concatenation</li>
                        <li>Parameters are automatically escaped by the database driver</li>
                        <li>Malicious input can't change the query structure</li>
                        <li>Additional security measures like password hashing should also be implemented</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-6">Alternative with ORM (Prisma)</h2>
                    <p className="text-gray-300 mb-4">Here's how to implement the same functionality using Prisma ORM:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
{`// Using Prisma in Next.js
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      const user = await prisma.user.findFirst({
        where: {
          username: username,
          password: password, // In reality, hash passwords!
        },
      });

      if (user) {
        res.status(200).json({ message: "Login successful", user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}`}
                        </pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why is this fixed?</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300">
                        <li>Parameterized Queries: The SQL driver (e.g., pg) separates the query logic from the data, treating username and password as values, not executable code. Malicious input like ' OR '1'='1 is treated as a literal string, not a query modification.</li>
                        <li>ORM: Prisma generates safe queries automatically, avoiding raw SQL concatenation. The where clause ensures inputs are properly escaped.</li>
                        <li>The attacker's payloads (e.g., ' OR '1'='1) no longer manipulate the query; they're just searched as-is.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SqlInjectionExplanation;