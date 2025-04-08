import React from 'react';

const ClickjackingExplanation = () => {
    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-white">
                <h1 className="text-4xl font-bold mb-8 text-center">Clickjacking</h1>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <p className="mb-4 text-gray-300">
                        Clickjacking is a type of attack where an attacker tricks a user into clicking on something different from what they perceive they are clicking on. This is done by overlaying or obscuring a malicious element (e.g., a button or link) over a legitimate webpage, often using HTML/CSS tricks like iframes, transparency, or positioning. The user thinks they're interacting with the visible page, but their click triggers an action on a hidden or disguised element.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">How Does Clickjacking Work?</h2>
                    <div className="space-y-6">
                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Embedding the Target Site:</h3>
                            <p className="text-gray-300">The attacker creates a malicious webpage that embeds the target site (e.g., example.com) in an iframe.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Overlay or Disguise:</h3>
                            <p className="text-gray-300">The attacker uses CSS (e.g., opacity, z-index, or absolute positioning) to hide the iframe or align it with a fake UI element, making it invisible or deceptive to the user.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">User Interaction:</h3>
                            <p className="text-gray-300">The user interacts with what appears to be a harmless button or link on the attacker's page, but the click is passed to the hidden iframe, triggering an action on the target site.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Exploiting Authentication:</h3>
                            <p className="text-gray-300">Since the user is often already logged into the target site, the action uses their existing session (e.g., cookies) to execute.</p>
                        </div>
                    </div>

                    <div className="mt-8 bg-gray-750 p-6 rounded-lg border border-gray-600">
                        <h3 className="text-xl font-semibold mb-3 text-white">Example Scenario:</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li>A user is logged into socialmedia.com.</li>
                            <li>They visit evil.com, which iframes socialmedia.com/post with a hidden "Post" button aligned under a fake "Claim Free Prize" button.</li>
                            <li>Clicking "Claim Free Prize" actually posts a message (e.g., spam or a malicious link) on the user's social media account.</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
                    <h2 className="text-2xl font-semibold mb-6">Why is Clickjacking Dangerous?</h2>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Unauthorized Actions: Attackers can trick users into performing actions like posting content, transferring money, or changing settings without their knowledge.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Phishing Amplification: It can be combined with phishing to make attacks more convincing (e.g., "Click to verify your account" triggers a real account change).</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Reputation Damage: Victims may unintentionally share malicious content, harming their credibility.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>No Code Exploit Needed: Clickjacking doesn't require vulnerabilities in the application's code—just the ability to embed it in an iframe and deceive the user.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">Example of Vulnerable Code</h2>
                    <p className="text-gray-300 mb-4">Here's an example of a vulnerable Remix application that doesn't protect against clickjacking:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Vulnerable Code (Remix Route)
// File: app/routes/profile.tsx

import { Form } from "@remix-run/react";
import { ActionFunction, redirect } from "@remix-run/node";

// Server-side action to update profile
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const status = formData.get("status");

  // Simulate updating the user's status (e.g., in a database)
  console.log(\`Updated status to: \${status}\`);
  return redirect("/profile");
};

// Client-side form
export default function Profile() {
  return (
    <div>
      <h1>Update Your Status</h1>
      <Form method="post">
        <label>
          Status: <input type="text" name="status" />
        </label>
        <button type="submit">Update</button>
      </Form>
    </div>
  );
}`}
                        </pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why is this vulnerable?</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-8">
                        <li>There's no protection against the page being loaded in an iframe on a malicious site.</li>
                        <li>An attacker could embed this page in an iframe on evil.com and overlay a fake button (e.g., "Win a Prize") over the "Update" button. Clicking it would submit the form with a malicious status (e.g., a spam link).</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-6">Attacker's Code (example):</h2>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`<!-- evil.com -->
<html>
  <head>
    <style>
      iframe {
        opacity: 0.5; /* Optional: Make it semi-visible for demo */
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .fake-button {
        position: absolute;
        top: 150px; /* Align with the "Update" button */
        left: 50px;
        padding: 10px;
        background: green;
        color: white;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <iframe src="https://example.com/profile" sandbox="allow-forms allow-scripts"></iframe>
    <div class="fake-button">Click to Win a Prize!</div>
  </body>
</html>`}
                        </pre>
                    </div>

                    <h2 className="text-2xl font-semibold mt-8 mb-6">Example of Fixed Code</h2>
                    <p className="text-gray-300 mb-4">Here's the fixed version of the Remix application using the X-Frame-Options header to prevent clickjacking:</p>

                    <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Fixed Code (Remix Route)
// File: app/routes/profile.tsx

import { Form } from "@remix-run/react";
import { ActionFunction, redirect, LoaderFunction, json } from "@remix-run/node";

// Loader to set X-Frame-Options header
export const loader: LoaderFunction = async () => {
  return json(
    { message: "Profile page" },
    {
      headers: {
        "X-Frame-Options": "DENY", // Prevent iframe embedding
      },
    }
  );
};

// Server-side action to update profile
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const status = formData.get("status");

  console.log(\`Updated status to: \${status}\`);
  return redirect("/profile", {
    headers: {
      "X-Frame-Options": "DENY", // Also set on redirects
    },
  });
};

// Client-side form
export default function Profile() {
  return (
    <div>
      <h1>Update Your Status</h1>
      <Form method="post">
        <label>
          Status: <input type="text" name="status" />
        </label>
        <button type="submit">Update</button>
      </Form>
    </div>
  );
}`}
                        </pre>
                    </div>

                    <h2 className="text-2xl font-semibold mt-8 mb-6">Alternative Approach: Use a Content Security Policy (CSP)</h2>
                    <p className="text-gray-300 mb-4">Here's how to use Content Security Policy with frame-ancestors directive:</p>

                    <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Using CSP in Remix
export const loader: LoaderFunction = async () => {
  return json(
    { message: "Profile page" },
    {
      headers: {
        "Content-Security-Policy": "frame-ancestors 'self'", // Only allow same-origin framing
      },
    }
  );
};`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClickjackingExplanation;