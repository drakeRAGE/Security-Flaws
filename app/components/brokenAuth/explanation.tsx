import React from 'react';

const BrokenauthExplanation = () => {
    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-white">
                <h1 className="text-4xl font-bold mb-8 text-center">Broken Authentication</h1>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <p className="mb-4 text-gray-300">
                        Broken Authentication refers to vulnerabilities in an application's authentication mechanisms that allow attackers to bypass or compromise the process of verifying a user's identity. This can enable unauthorized access to user accounts, sessions, or sensitive resources.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">How Does Broken Authentication Work?</h2>
                    <div className="space-y-6">
                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Weak Authentication Design:</h3>
                            <p className="text-gray-300">The application uses inadequate security controls, such as weak passwords, predictable session IDs, or no multi-factor authentication (MFA).</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Exploitation:</h3>
                            <p className="text-gray-300">Attackers exploit these weaknesses through techniques like:</p>
                            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
                                <li>Credential stuffing (using stolen username/password pairs)</li>
                                <li>Session hijacking (stealing session tokens)</li>
                                <li>Brute-forcing weak credentials or tokens</li>
                                <li>Bypassing authentication checks (e.g., via misconfigured APIs)</li>
                            </ul>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Unauthorized Access:</h3>
                            <p className="text-gray-300">The attacker gains access to a user's account or session, impersonating them and performing actions on their behalf.</p>
                        </div>
                    </div>

                    <div className="mt-8 bg-gray-750 p-6 rounded-lg border border-gray-600">
                        <h3 className="text-xl font-semibold mb-3 text-white">Example Scenario:</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li>An app stores a session token in an insecure cookie that's easily stolen via XSS.</li>
                            <li>An attacker uses the token to access the victim's account without needing their password.</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
                    <h2 className="text-2xl font-semibold mb-6">Why is Broken Authentication Dangerous?</h2>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Account Takeover: Attackers can fully impersonate users, accessing sensitive data (e.g., emails, financial details) or performing actions (e.g., transferring money).</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Privilege Escalation: Weak authentication might allow access to admin accounts or higher privileges.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Data Breaches: Compromised accounts can expose personal or organizational data.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Reputation Damage: Loss of user trust due to security breaches can harm the app's credibility.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Legal/Compliance Risks: Failure to protect authentication violates regulations like GDPR or CCPA.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">Example of Vulnerable Code</h2>
                    <p className="text-gray-300 mb-4">Here's an example of a vulnerable Remix application with broken authentication:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Vulnerable Code (Remix Route)
// File: app/routes/login.tsx

import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createCookie } from "@remix-run/node";

// Simulated user database
const users = {
  "alice@example.com": { password: "123", id: "123" },
};

// Insecure cookie setup
const sessionCookie = createCookie("session", {
  maxAge: 604800, // 7 days, no expiration enforcement
  httpOnly: false, // Accessible to JavaScript (XSS risk)
  secure: false, // Sent over HTTP (not HTTPS)
});

// Server-side login action
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = users[email];
  // Weak password check
  if (user && user.password === password) {
    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await sessionCookie.serialize(user.id), // Store user ID directly
      },
    });
  }

  return json({ error: "Invalid credentials" }, { status: 401 });
};

// Client-side login form
export default function Login() {
  return (
    <Form method="post">
      <label>
        Email: <input type="email" name="email" />
      </label>
      <label>
        Password: <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
    </Form>
  );
}`}
                        </pre>
                    </div>

                    <h2 className="text-2xl font-semibold mb-6">Dashboard Route (Vulnerable):</h2>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// File: app/routes/dashboard.tsx
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { sessionCookie } from "~/routes/login";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const userId = await sessionCookie.parse(cookieHeader);

  // No validation of session integrity
  if (userId) {
    return json({ message: \`Welcome, user \${userId}\` });
  }
  return redirect("/login");
};

export default function Dashboard() {
  const data = useLoaderData<typeof loader>();
  return <h1>{data.message}</h1>;
}`}
                        </pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why is this vulnerable?</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-8">
                        <li>Insecure Cookie: httpOnly: false allows XSS to steal the session cookie; secure: false sends it over HTTP.</li>
                        <li>Weak Password: Plaintext "123" with no hashing or strength requirements.</li>
                        <li>No Token Validation: The server trusts the cookie's userId without verifying its authenticity or expiration.</li>
                        <li>No Logout Mechanism: No way to invalidate the session.</li>
                        <li>Predictable Session: The userId is stored directly, making it easy to guess or forge.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-4">Attack Example:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300">
                        <li>Attacker steals the cookie via XSS (e.g., &lt;script&gt;alert(document.cookie)&lt;/script&gt;).</li>
                        <li>Attacker sets the cookie in their browser and accesses /dashboard as the victim.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-6">Example of Fixed Code</h2>
                    <p className="text-gray-300 mb-4">Here's the fixed version with secure authentication:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
{`// Fixed Code (Remix Route)
// File: app/routes/login.tsx

import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createCookieSessionStorage, redirect as sessionRedirect } from "@remix-run/node";
import { hash, compare } from "bcryptjs"; // For password hashing

// Simulated user database with hashed passwords
const users = {
  "alice@example.com": {
    password: await hash("StrongP@ssw0rd!", 10), // Hashed password
    id: "123",
  },
};

// Secure session storage
const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: true, // Only sent over HTTPS
    httpOnly: true, // Not accessible to JavaScript
    sameSite: "lax", // Prevents CSRF
    maxAge: 3600, // 1 hour expiration
    secrets: ["s3cret-k3y"], // Signing key
  },
});

// Server-side login action
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = users[email];
  if (user && (await compare(password, user.password))) {
    const session = await getSession();
    session.set("userId", user.id);

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return json({ error: "Invalid credentials" }, { status: 401 });
};

// Client-side login form
export default function Login() {
  return (
    <Form method="post">
      <label>
        Email: <input type="email" name="email" />
      </label>
      <label>
        Password: <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
    </Form>
  );
}`}
                        </pre>
                    </div>

                    <h2 className="text-2xl font-semibold mb-6">Dashboard Route (Fixed):</h2>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
{`// File: app/routes/dashboard.tsx
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/routes/login";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    return redirect("/login");
  }

  return json({ message: \`Welcome, user \${userId}\` });
};

export default function Dashboard() {
  const data = useLoaderData<typeof loader>();
  return <h1>{data.message}</h1>;
}`}
                        </pre>
                    </div>

                    <h2 className="text-2xl font-semibold mb-6">Logout Route (Fixed):</h2>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
{`// File: app/routes/logout.tsx
import { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/routes/login";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};`}
                        </pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why is this fixed?</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300">
                        <li>Secure Session: Uses Remix's session storage with httpOnly, secure, and sameSite cookies, plus a signing key and expiration.</li>
                        <li>Hashed Passwords: Passwords are hashed with bcryptjs, preventing plaintext exposure.</li>
                        <li>Session Validation: The server checks the session's userId instead of trusting raw input.</li>
                        <li>Logout: Properly invalidates the session on logout.</li>
                        <li>Stronger Policies: Encourages complex passwords (though not enforced here for simplicity).</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BrokenauthExplanation;