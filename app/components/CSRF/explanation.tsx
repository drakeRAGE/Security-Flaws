import React from 'react';

const CSRFExplanation = () => {
    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-white">
                <h1 className="text-4xl font-bold mb-8 text-center">Cross-Site Request Forgery (CSRF)</h1>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <p className="mb-4 text-gray-300">
                        Cross-Site Request Forgery (CSRF) is a type of attack where an attacker tricks a victim into unknowingly submitting a malicious request to a web application on which the victim is authenticated. This exploits the trust that the web application has in the user's browser, typically by leveraging the user's existing session (e.g., cookies or authentication tokens) to perform unauthorized actions.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">How Does CSRF Work?</h2>
                    <div className="space-y-6">
                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">User Authentication:</h3>
                            <p className="text-gray-300">The victim logs into a legitimate website (e.g., example.com), and the browser stores a session cookie or authentication token.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Malicious Action:</h3>
                            <p className="text-gray-300">The attacker tricks the victim into visiting a malicious site (e.g., evil.com) or clicking a link/button that submits a hidden request to example.com.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Request Execution:</h3>
                            <p className="text-gray-300">The victim's browser automatically includes the session cookie or token with the request because it's sent to example.com. The server, unaware of the forgery, processes the request as if the user intended it.</p>
                        </div>
                    </div>

                    <div className="mt-8 bg-gray-750 p-6 rounded-lg border border-gray-600">
                        <h3 className="text-xl font-semibold mb-3 text-white">Example Scenario:</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li>A user is logged into their bank account at bank.com.</li>
                            <li>The attacker sends an email with a link to evil.com, which contains a hidden form that submits a POST request to bank.com/transfer?amount=1000&to=attacker.</li>
                            <li>The user's browser sends the request with their session cookie, and the bank transfers money to the attacker's account without the user's knowledge.</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
                    <h2 className="text-2xl font-semibold mb-6">Why is CSRF Dangerous?</h2>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Unauthorized Actions: Attackers can perform actions on behalf of the user, such as transferring money, changing account settings, or deleting data.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Exploits Trust: It takes advantage of the browser's automatic inclusion of credentials (e.g., cookies) in requests to trusted domains.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>No User Interaction Needed: In some cases, simply visiting a malicious page or loading an image can trigger the attack.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Hard to Detect: The server sees the request as legitimate because it comes with valid credentials, making it difficult to distinguish from intentional user actions.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">Example of Vulnerable Code</h2>
                    <p className="text-gray-300 mb-4">Here's an example of a vulnerable Remix application where a form submission is susceptible to CSRF:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
{`// Vulnerable Code (Remix Route)
// File: app/routes/transfer.tsx

import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

// Server-side action to handle form submission
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const amount = formData.get("amount");
  const toAccount = formData.get("toAccount");

  // Simulate transferring money (no CSRF protection)
  console.log(\`Transferring \${amount} to \${toAccount}\`);
  // In a real app, this would update a database or call an API

  return redirect("/success");
};

// Client-side form
export default function Transfer() {
  return (
    <Form method="post">
      <label>
        Amount: <input type="number" name="amount" />
      </label>
      <label>
        To Account: <input type="text" name="toAccount" />
      </label>
      <button type="submit">Transfer</button>
    </Form>
  );
}`}
                        </pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why is this vulnerable?</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-8">
                        <li>The server blindly trusts the POST request because it includes the user's session cookie (automatically sent by the browser).</li>
                        <li>An attacker could create a malicious page that automatically submits a form to your endpoint.</li>
                    </ul>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
{`<!-- Attacker's Site (evil.com) -->
<form action="https://example.com/transfer" method="POST" id="csrf-form">
  <input type="hidden" name="amount" value="1000" />
  <input type="hidden" name="toAccount" value="attacker-account" />
</form>
<script>
  document.getElementById("csrf-form").submit();
</script>`}
                        </pre>
                    </div>

                    <h2 className="text-2xl font-semibold mt-8 mb-6">Example of Fixed Code</h2>
                    <p className="text-gray-300 mb-4">Here's the fixed version using a CSRF token to protect the Remix application:</p>

                    <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
{`// Fixed Code (Remix Route)
// File: app/routes/transfer.tsx

import { ActionFunction, redirect, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { createCsrfToken, verifyCsrfToken } from "~/utils/csrf.server"; // Custom utility

// Loader to generate CSRF token
export const loader = async () => {
  const csrfToken = createCsrfToken(); // Generate a unique token
  return json({ csrfToken });
};

// Server-side action with CSRF validation
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const csrfToken = formData.get("csrfToken");
  const amount = formData.get("amount");
  const toAccount = formData.get("toAccount");

  // Verify the CSRF token
  if (!csrfToken || !verifyCsrfToken(csrfToken.toString())) {
    throw new Response("Invalid CSRF token", { status: 403 });
  }

  // Process the transfer
  console.log(\`Transferring \${amount} to \${toAccount}\`);
  return redirect("/success");
};

// Client-side form with CSRF token
export default function Transfer() {
  const { csrfToken } = useLoaderData<typeof loader>();

  return (
    <Form method="post">
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <label>
        Amount: <input type="number" name="amount" />
      </label>
      <label>
        To Account: <input type="text" name="toAccount" />
      </label>
      <button type="submit">Transfer</button>
    </Form>
  );
}`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CSRFExplanation;