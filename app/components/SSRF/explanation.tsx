import React from 'react';

const SSRFExplanation = () => {
    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-white">
                <h1 className="text-4xl font-bold mb-8 text-center">Server-Side Request Forgery (SSRF)</h1>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <p className="mb-4 text-gray-300">
                        Server-Side Request Forgery (SSRF) is a security vulnerability that allows an attacker to trick a server into making unintended HTTP requests to internal or external resources. This occurs when the server accepts user input (e.g., a URL) and uses it to perform requests without proper validation or restriction.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">How Does SSRF Work?</h2>
                    <div className="space-y-6">
                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">User Input:</h3>
                            <p className="text-gray-300">The application accepts input from a user (e.g., a URL parameter, form field, or API payload) that specifies a resource to fetch.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Server Processing:</h3>
                            <p className="text-gray-300">The server uses this input to make an HTTP request (e.g., via fetch, axios) without validating or restricting the target.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Malicious Request:</h3>
                            <p className="text-gray-300">The attacker crafts input to request internal systems (e.g., http://localhost), sensitive external services, or arbitrary URLs.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Exploitation:</h3>
                            <p className="text-gray-300">The server executes the request and may return sensitive data to the attacker or perform unintended actions.</p>
                        </div>
                    </div>

                    <div className="mt-8 bg-gray-750 p-6 rounded-lg border border-gray-600">
                        <h3 className="text-xl font-semibold mb-3 text-white">Example Scenario:</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li>A web app lets users submit a URL to fetch and display an image.</li>
                            <li>The attacker submits http://169.254.169.254/latest/meta-data/ (AWS metadata endpoint).</li>
                            <li>The server fetches and exposes sensitive cloud instance metadata (e.g., IAM credentials) to the attacker.</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
                    <h2 className="text-2xl font-semibold mb-6">Why is SSRF Dangerous?</h2>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Internal Network Access: Attackers can reach internal services (e.g., databases, admin panels) that are not publicly accessible.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Cloud Metadata Exposure: In cloud environments (e.g., AWS, Azure), SSRF can extract credentials or tokens from metadata services.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Service Abuse: Attackers can use the server as a proxy to attack other systems or perform DoS attacks.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Data Leakage: Sensitive data fetched by the server (e.g., internal API responses) may be returned to the attacker.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Privilege Escalation: Access to internal resources can lead to broader system compromise.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">Example of Vulnerable Code</h2>
                    <p className="text-gray-300 mb-4">Here's an example of a vulnerable Next.js API route susceptible to SSRF:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Vulnerable Code (Next.js API Route)
// File: pages/api/fetch-url.ts

import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { url } = req.body;

    try {
      // Directly fetch the user-provided URL
      const response = await fetch(url);
      const data = await response.text();

      res.status(200).json({ content: data });
    } catch (error) {
      res.status(500).json({ message: "Error fetching URL", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}`}
                        </pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why is this vulnerable?</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-8">
                        <li>The url parameter is used directly in a fetch call without validation or restriction.</li>
                        <li>An attacker can submit:</li>
                        <ul className="pl-6 space-y-2 text-gray-300">
                            <li>http://localhost:3000/admin (access internal admin panel)</li>
                            <li>http://169.254.169.254/latest/meta-data/iam/security-credentials/ (AWS metadata)</li>
                            <li>file:///etc/passwd (attempt to read local files, if supported)</li>
                        </ul>
                        <li>The server executes the request and may return sensitive data to the attacker.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-4">Attack Example:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-8">
                        <li>POST request: {'"url": "http://169.254.169.254/latest/meta-data/"'}</li>
                        <li>Response leaks cloud metadata, including temporary credentials.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-6">Example of Fixed Code</h2>
                    <p className="text-gray-300 mb-4">Here's the fixed version with validation and restrictions to prevent SSRF:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Fixed Code (Next.js API Route)
// File: pages/api/fetch-url.ts

import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { url } = req.body;

    try {
      // Validate the URL
      const parsedUrl = new URL(url);
      const allowedHosts = ["example.com", "api.example.com"]; // Whitelist

      // Restrict to HTTP/HTTPS and allowed hosts
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        return res.status(400).json({ message: "Invalid protocol" });
      }
      if (!allowedHosts.includes(parsedUrl.hostname)) {
        return res.status(400).json({ message: "Host not allowed" });
      }

      // Prevent internal IP addresses (e.g., localhost, 169.254.169.254)
      const internalIpRegex = /^(127\\.0\\.0\\.1|localhost|169\\.254\\.\\d+\\.\\d+)$/i;
      if (internalIpRegex.test(parsedUrl.hostname)) {
        return res.status(400).json({ message: "Internal addresses not allowed" });
      }

      const response = await fetch(url);
      const data = await response.text();

      res.status(200).json({ content: data });
    } catch (error) {
      res.status(400).json({ message: "Invalid URL or fetch error", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}`}
                        </pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why is this fixed?</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300">
                        <li>URL validation ensures proper format and protocol</li>
                        <li>Hostname whitelist restricts allowed destinations</li>
                        <li>Internal IP check prevents access to local resources</li>
                        <li>Error handling returns 400 instead of 500 for invalid URLs</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-6">Alternative with Remix Loader</h2>
                    <p className="text-gray-300 mb-4">Here's how to implement the same functionality using a Remix loader:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
{`// Fixed Code (Remix Loader)
// File: app/routes/fetch-url.tsx
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import fetch from "node-fetch";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    return json({ message: "URL required" }, { status: 400 });
  }

  try {
    const parsedUrl = new URL(url);
    const allowedHosts = ["example.com", "api.example.com"];

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return json({ message: "Invalid protocol" }, { status: 400 });
    }
    if (!allowedHosts.includes(parsedUrl.hostname)) {
      return json({ message: "Host not allowed" }, { status: 400 });
    }

    const internalIpRegex = /^(127\\.0\\.0\\.1|localhost|169\\.254\\.\\d+\\.\\d+)$/i;
    if (internalIpRegex.test(parsedUrl.hostname)) {
      return json({ message: "Internal addresses not allowed" }, { status: 400 });
    }

    const response = await fetch(url);
    const data = await response.text();

    return json({ content: data });
  } catch (error) {
    return json({ message: "Invalid URL or fetch error" }, { status: 400 });
  }
};

export default function FetchUrl() {
  const data = useLoaderData<typeof loader>();
  return <div>{data.content || data.message}</div>;
}`}
                        </pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why is this fixed?</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300">
                        <li>URL Validation: new URL() ensures the input is a valid URL, catching malformed inputs.</li>
                        <li>Protocol Restriction: Only http: and https: are allowed, blocking file:, ftp:, etc.</li>
                        <li>Host Whitelisting: Limits requests to a predefined list of trusted domains.</li>
                        <li>Internal IP Block: Prevents access to localhost, 127.0.0.1, or cloud metadata IPs (e.g., 169.254.169.254).</li>
                        <li>Malicious inputs like http://localhost or http://169.254.169.254 are rejected before the request is made.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SSRFExplanation;