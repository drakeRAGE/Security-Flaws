import React from 'react';

const InjectionAttacksExplanation = () => {
    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-white">
                <h1 className="text-4xl font-bold mb-8 text-center">Injection Attacks</h1>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <p className="mb-4 text-gray-300">
                        Injection attacks occur when an attacker inserts malicious code or data into an application, which is then executed or interpreted in an unintended way. In the context of frontend applications like ReactJS, TypeScript, or Remix, the most relevant types are HTML injection and JavaScript injection, often overlapping with Cross-Site Scripting (XSS).
                    </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">How Do Injection Attacks Work?</h2>
                    <div className="space-y-6">
                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">User Input:</h3>
                            <p className="text-gray-300">The application accepts input from a user (e.g., a form field, URL parameter, or API response).</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Improper Handling:</h3>
                            <p className="text-gray-300">The input is processed or rendered without proper escaping, sanitization, or validation.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Injection Execution:</h3>
                            <p className="text-gray-300">The malicious code is interpreted by the browser as HTML, JavaScript, or another executable format, altering the page or executing unintended actions.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Exploitation:</h3>
                            <p className="text-gray-300">The attacker achieves their goal, such as stealing data, redirecting users, or modifying the DOM.</p>
                        </div>
                    </div>

                    <div className="mt-8 bg-gray-750 p-6 rounded-lg border border-gray-600">
                        <h3 className="text-xl font-semibold mb-3 text-white">Example Scenario:</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li>A comment form accepts user input like &lt;script&gt;alert('Hacked!')&lt;/script&gt;.</li>
                            <li>The app renders this input directly into the DOM without sanitization.</li>
                            <li>The browser executes the script, showing an alert (or worse, stealing cookies).</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
                    <h2 className="text-2xl font-semibold mb-6">Why Are Injection Attacks Dangerous?</h2>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Code Execution: Attackers can run arbitrary JavaScript, leading to data theft (e.g., cookies, tokens), session hijacking, or malware distribution.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Page Manipulation: HTML injection can alter the page's content, defacing it or tricking users into phishing schemes.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>User Trust Exploitation: Malicious content appears to come from a trusted site, increasing its effectiveness.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Widespread Impact: If stored (e.g., in a database), injected code can affect all users who view the compromised content.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Legal/Reputation Damage: Breaches of user privacy or security can lead to lawsuits or loss of credibility.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">Example of Vulnerable Code</h2>
                    <p className="text-gray-300 mb-4">Here's an example of a vulnerable React component susceptible to HTML/JavaScript injection:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Vulnerable Code (React Component)
import React from 'react';

interface CommentProps {
  text: string;
}

const Comment: React.FC<CommentProps> = ({ text }) => {
  // Assume \`text\` is user input, e.g., "<script>alert('Hacked!')</script>"
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
};

export default Comment;`}
                        </pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why is this vulnerable?</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-8">
                        <li>The text prop is rendered directly into the DOM using dangerouslySetInnerHTML without sanitization.</li>
                        <li>If text contains &lt;script&gt;alert('Hacked!')&lt;/script&gt;, the browser executes the script, potentially stealing cookies or performing other malicious actions.</li>
                        <li>Even non-script HTML like &lt;img src="x" onerror="alert('Hacked!')"&gt; could trigger JavaScript execution.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-6">Example of Fixed Code</h2>
                    <p className="text-gray-300 mb-4">Here's the fixed version using sanitization to prevent injection:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Fixed Code (React Component)
import React from 'react';
import DOMPurify from 'dompurify';

interface CommentProps {
  text: string;
}

const Comment: React.FC<CommentProps> = ({ text }) => {
  // Sanitize the input before rendering
  const sanitizedText = DOMPurify.sanitize(text);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedText }} />;
};

export default Comment;`}
                        </pre>
                    </div>

                    <h2 className="text-2xl font-semibold mt-8 mb-6">Alternative Approach (Preferred)</h2>
                    <p className="text-gray-300 mb-4">If HTML isn't needed, render the text directly in JSX:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Even Safer Code (React Component)
import React from 'react';

interface CommentProps {
  text: string;
}

const Comment: React.FC<CommentProps> = ({ text }) => {
  // React escapes the text automatically
  return <div>{text}</div>;
};

export default Comment;`}
                        </pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why is this fixed?</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300">
                        <li>Sanitized Version: DOMPurify removes or escapes malicious tags (e.g., &lt;script&gt;, onerror), allowing only safe HTML. For example, &lt;script&gt;alert('Hacked!')&lt;/script&gt; becomes plain text or is stripped entirely.</li>
                        <li>JSX Version: React's default escaping converts special characters into their HTML entities (e.g., &lt; becomes &amp;lt;), preventing execution. The input &lt;script&gt;alert('Hacked!')&lt;/script&gt; is displayed as literal text, not executed.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default InjectionAttacksExplanation;