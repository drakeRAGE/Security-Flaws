import React from 'react';

const XSSExplanation = () => {
    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-white">
                <h1 className="text-4xl font-bold mb-8 text-center">Cross-Site Scripting (XSS)</h1>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <p className="mb-4 text-gray-300">
                        Cross-Site Scripting (XSS) is a security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.
                        These scripts can execute in the victim's browser, potentially stealing sensitive data (like cookies, session tokens, or form inputs),
                        defacing websites, redirecting users to malicious sites, or performing actions on behalf of the user.
                    </p>

                    <p className="text-gray-300">
                        While React and Remix have built-in mechanisms to mitigate XSS, improper handling of user input or misuse of certain APIs can still lead to vulnerabilities.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">How Does XSS Work?</h2>
                    <p className="mb-4 text-gray-300">There are three main types of XSS attacks:</p>

                    <div className="space-y-6">
                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Stored XSS:</h3>
                            <p className="text-gray-300 mb-2">Malicious script is stored on the server (e.g., in a database) and served to users when they visit a page.</p>
                            <p className="text-gray-400 italic bg-gray-850 p-3 rounded">Example: An attacker posts a comment containing &lt;script&gt;alert('Hacked!')&lt;/script&gt;, and it's displayed to all users without sanitization.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">Reflected XSS:</h3>
                            <p className="text-gray-300 mb-2">Malicious script is embedded in a URL or form input and reflected back to the user in the server's response.</p>
                            <p className="text-gray-400 italic bg-gray-850 p-3 rounded">Example: A URL like example.com/search?q=&lt;script&gt;alert('Hacked!')&lt;/script&gt; executes the script when the page loads.</p>
                        </div>

                        <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-xl font-semibold mb-3 text-white">DOM-Based XSS:</h3>
                            <p className="text-gray-300 mb-2">The attack occurs entirely in the client-side JavaScript, manipulating the DOM directly.</p>
                            <p className="text-gray-400 italic bg-gray-850 p-3 rounded">Example: A script reads a URL parameter and writes it to the DOM without sanitization.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">Why is XSS Dangerous?</h2>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Data Theft: Attackers can steal cookies, session tokens, or form data.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>User Impersonation: Malicious scripts can perform actions (e.g., posting comments, transferring money) as the logged-in user.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Phishing: Redirect users to fake login pages to capture credentials.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>Website Defacement: Alter the appearance or content of the site.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 my-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6">Example of Vulnerable Code</h2>
                    <p className="text-gray-300 mb-4">Here's an example of a vulnerable React component that introduces an XSS vulnerability by using dangerouslySetInnerHTML with untrusted user input:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Vulnerable Code
import React from 'react';

interface CommentProps {
  comment: string;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  // Assume \`comment\` comes from user input, e.g., "<script>alert('Hacked!')</script>"
  return <div dangerouslySetInnerHTML={{ __html: comment }} />;
};

export default Comment;`}
                        </pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why is this vulnerable?</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-8">
                        <li>The comment prop is directly injected into the DOM without sanitization.</li>
                        <li>If comment contains &lt;script&gt;alert('Hacked!')&lt;/script&gt;, the script will execute in the user's browser, potentially stealing data or performing malicious actions.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-6">Example of Fixed Code</h2>
                    <p className="text-gray-300 mb-4">Here's the fixed version using DOMPurify to sanitize the input before rendering:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Fixed Code
import React from 'react';
import DOMPurify from 'dompurify';

interface CommentProps {
  comment: string;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  // Sanitize the comment before rendering
  const sanitizedComment = DOMPurify.sanitize(comment);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedComment }} />;
};

export default Comment;`}
                        </pre>
                    </div>

                    <h2 className="text-2xl font-semibold mt-8 mb-6">Additional Example: DOM-Based XSS</h2>
                    <p className="text-gray-300 mb-4">Here's a vulnerable DOM-based XSS example where user input from the URL is directly written to the DOM:</p>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Vulnerable Code
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    // Directly writing query to the DOM
    document.getElementById('search-result')!.innerHTML = query || '';
  }, [query]);

  return <div id="search-result"></div>;
};

export default SearchPage;`}
                        </pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why is this vulnerable?</h3>
                    <p className="text-gray-300 mb-6">
                        If the URL is example.com/search?q=&lt;script&gt;alert('Hacked!')&lt;/script&gt;, the script will execute because innerHTML doesn't escape the content.
                    </p>

                    <h2 className="text-2xl font-semibold mb-6">Fixed Code:</h2>

                    <div className="bg-gray-950 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-500 whitespace-pre-wrap break-words">
                            {`// Fixed Code
import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  return <div>{query}</div>;
};

export default SearchPage;`}
                        </pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why is this fixed?</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300">
                        <li>By rendering query directly in JSX, React escapes the content, preventing script execution.</li>
                        <li>Avoid innerHTML or document.getElementById for user input unless absolutely necessary and sanitized.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default XSSExplanation;