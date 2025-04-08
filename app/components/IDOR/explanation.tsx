import React from 'react';

const IDORExplanation = () => {
    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-white">
                <h1 className="text-4xl font-bold mb-8 text-center">Insecure Direct Object References (IDOR)</h1>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <p className="mb-4 text-gray-300">
                        Insecure Direct Object References (IDOR) is a security vulnerability that occurs when an application exposes a reference to an internal object (e.g., a database ID, file, or user account) in a way that allows an attacker to manipulate it directly. By altering the reference, an attacker can access or modify data they shouldn't have permission to, bypassing proper authorization checks.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">How Does IDOR Work?</h2>
                    <div className="space-y-6">
                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Object Reference Exposure:</h3>
                            <p className="text-gray-300">The application uses predictable identifiers (e.g., userId=123, file=report.pdf) in requests, URLs, or responses, exposing internal objects.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Lack of Authorization:</h3>
                            <p className="text-gray-300">The server fails to verify whether the requesting user has permission to access or modify the referenced object.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Manipulation by Attacker:</h3>
                            <p className="text-gray-300">An attacker changes the reference (e.g., from userId=123 to userId=124) to access someone else's data or perform unauthorized actions.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Successful Exploit:</h3>
                            <p className="text-gray-300">The server processes the request without checking ownership or permissions, granting the attacker access.</p>
                        </div>
                    </div>

                    <div className="mt-8 bg-gray-750 p-6 rounded-lg border border-gray-600">
                        <h3 className="text-xl font-semibold mb-3 text-white">Example Scenario:</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li>A user logs into example.com/profile?userId=123 to view their profile.</li>
                            <li>The attacker changes the URL to example.com/profile?userId=124 and views another user's profile, including private data like their email or address.</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
                    <h2 className="text-2xl font-semibold mb-6">Why is IDOR Dangerous?</h2>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Unauthorized Data Access: Attackers can view or modify sensitive data (e.g., other users' profiles, orders, or files).</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Data Manipulation: Attackers can alter records they don't own (e.g., changing someone else's account details).</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Escalation of Privileges: In some cases, attackers can access admin-level resources by guessing higher privilege IDs.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Widespread Impact: If IDs are sequential or predictable, an attacker can systematically enumerate and exploit many objects.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Reputation and Legal Risks: Breaches of user privacy can lead to loss of trust, lawsuits, or regulatory fines (e.g., GDPR violations).</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">Example of Vulnerable Code</h2>
                    <p className="text-gray-300 mb-4">Here's an example of a vulnerable Remix application with an IDOR vulnerability:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Vulnerable Code (Remix Route)
// File: app/routes/profile.$userId.tsx

import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// Simulated database
const fakeDatabase = {
  123: { name: "Alice", email: "alice@example.com", privateNote: "Secret" },
  124: { name: "Bob", email: "bob@example.com", privateNote: "Hidden" },
};

// Server-side loader to fetch user profile
export const loader: LoaderFunction = async ({ params }) => {
  const userId = params.userId; // Directly from URL
  const user = fakeDatabase[userId as keyof typeof fakeDatabase];

  if (!user) {
    throw new Response("User not found", { status: 404 });
  }

  // No authorization check!
  return json(user);
};

// Client-side rendering
export default function Profile() {
  const user = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Private Note: {user.privateNote}</p>
    </div>
  );
}`}
                        </pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why is this vulnerable?</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-8">
                        <li>The userId comes directly from the URL (e.g., /profile/123) and is used to fetch data without verifying if the logged-in user owns that ID.</li>
                        <li>An attacker can change the URL to /profile/124 and access Bob's profile, including his private note, even if they're logged in as Alice (or not logged in at all).</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-6">Example of Fixed Code</h2>
                    <p className="text-gray-300 mb-4">Here's the fixed version of the Remix application with proper authorization checks:</p>

                    <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Fixed Code (Remix Route)
// File: app/routes/profile.$userId.tsx

import { LoaderFunction, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// Simulated database
const fakeDatabase = {
  123: { name: "Alice", email: "alice@example.com", privateNote: "Secret" },
  124: { name: "Bob", email: "bob@example.com", privateNote: "Hidden" },
};

// Simulated session (in a real app, use Remix's session management)
const getSessionUser = async (request: Request) => {
  // Example: Extract user ID from a cookie or auth token
  const cookie = request.headers.get("Cookie");
  return cookie?.includes("user=123") ? "123" : null; // Simulate Alice logged in
};

// Server-side loader with authorization
export const loader: LoaderFunction = async ({ params, request }) => {
  const userId = params.userId; // From URL
  const sessionUserId = await getSessionUser(request); // From session

  // Check if user is authenticated
  if (!sessionUserId) {
    return redirect("/login");
  }

  // Check if user is authorized to access this profile
  if (sessionUserId !== userId) {
    throw new Response("Unauthorized", { status: 403 });
  }

  const user = fakeDatabase[userId as keyof typeof fakeDatabase];
  if (!user) {
    throw new Response("User not found", { status: 404 });
  }

  return json(user);
};

// Client-side rendering
export default function Profile() {
  const user = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Private Note: {user.privateNote}</p>
    </div>
  );
}`}
                        </pre>
                    </div>

                    <h2 className="text-2xl font-semibold mt-8 mb-6">Alternative Approach: Use an Indirect Reference</h2>
                    <p className="text-gray-300 mb-4">Here's how to use indirect references (e.g., UUID or token) instead of direct IDs:</p>

                    <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Using a token instead of raw ID
export const loader: LoaderFunction = async ({ params, request }) => {
  const profileToken = params.token; // e.g., a UUID or hashed value
  const sessionUserId = await getSessionUser(request);

  if (!sessionUserId) {
    return redirect("/login");
  }

  // Map token to user ID securely on the server
  const tokenMap = {
    "abc123": "123", // Alice's token
    "xyz789": "124", // Bob's token
  };
  const userId = tokenMap[profileToken as keyof typeof tokenMap];

  if (!userId || userId !== sessionUserId) {
    throw new Response("Unauthorized or invalid token", { status: 403 });
  }

  const user = fakeDatabase[userId as keyof typeof fakeDatabase];
  if (!user) {
    throw new Response("User not found", { status: 404 });
  }

  return json(user);
};`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IDORExplanation;