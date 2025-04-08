import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Footer from "~/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "Security Flaws" },
    { name: "description", content: "It shows the various types of security flaws and how we can be secure from that vulnerable code." },
  ];
};

const securityFlaws = {
  frontend: [
    {
      id: 'xss',
      title: 'Cross-Site Scripting (XSS)',
      description: 'Learn about XSS attacks and how to prevent them in your web applications.',
      icon: '🔓'
    },
    {
      id: 'csrf',
      title: 'Cross-Site Request Forgery (CSRF)',
      description: 'Discover how CSRF attacks work and how to protect your web applications against them.',
      icon: '🛡️'
    },
    {
      id: 'clickjacking',
      title: 'Clickjacking',
      description: 'Discover how clickjacking attacks work and how to prevent them in your web applications.',
      icon: '🖱️'
    },
    {
      id: 'idor',
      title: 'Insecure Direct Object Reference (IDOR)',
      description: 'Discover how IDOR attacks work and how to prevent them in your web applications.',
      icon: '🔑'
    },
    {
      id: 'injection',
      title: 'HTML and JS Injection',
      description: 'Discover how HTML and JS injection attacks work and how to prevent them in your web applications.',
      icon: '💻'
    },
    {
      id: 'brokenAuth',
      title: 'Broken Authentication',
      description: 'Discover how Broken Authentication attacks work and how to prevent them in your web applications.',
      icon: '🛑'
    }
  ],
  backend: [
    {
      id: 'sqlInjection',
      title: 'SQL Injection',
      description: 'Learn about SQL injection attacks and how to implement proper database security.',
      icon: '🗄️'
    },
  ]
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
              Web Security Vulnerabilities
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore common security flaws and learn how to protect your applications
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Frontend Security Flaws</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityFlaws.frontend.map((flaw) => (
                <Link
                  key={flaw.id}
                  to={`/security/${flaw.id}`}
                  className="group block h-full"
                >
                  <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 transform transition-all duration-300 hover:scale-105 hover:bg-gray-750 hover:border-gray-600 hover:shadow-2xl h-full flex flex-col">
                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">
                      {flaw.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3 line-clamp-2">
                      {flaw.title}
                    </h2>
                    <p className="text-gray-400 leading-relaxed line-clamp-3">
                      {flaw.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Backend Security Flaws</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityFlaws.backend.map((flaw) => (
                <Link
                  key={flaw.id}
                  to={`/security/${flaw.id}`}
                  className="group block h-full"
                >
                  <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 transform transition-all duration-300 hover:scale-105 hover:bg-gray-750 hover:border-gray-600 hover:shadow-2xl h-full flex flex-col">
                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">
                      {flaw.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3 line-clamp-2">
                      {flaw.title}
                    </h2>
                    <p className="text-gray-400 leading-relaxed line-clamp-3">
                      {flaw.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
