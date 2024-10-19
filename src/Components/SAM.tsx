import { useState } from "react";

export default function SecurityAuditingMonitoring() {
  const [selectedTab, setSelectedTab] = useState<string>("Security");

  const renderContent = () => {
    switch (selectedTab) {
      case "Security":
        return (
          <section>
            <h2 className="text-3xl font-bold mb-6">Plan & Organize</h2>
            <ul className="space-y-6">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold">Capture & Prioritize Ideas</h3>
                  <p className="text-gray-400">
                    Vote and prioritize features based on importance.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold">Structure Your Work</h3>
                  <p className="text-gray-400">
                    Create dedicated projects for clear organization.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold">Visualize Workflow</h3>
                  <p className="text-gray-400">
                    Track progress of tasks across different stages.
                  </p>
                </div>
              </li>
            </ul>
          </section>
        );
      case "Auditing":
        return (
          <section>
            <h2 className="text-3xl font-bold mb-6">Auditing Details</h2>
            <p className="text-gray-400">
              This section will contain details related to auditing.
            </p>
          </section>
        );
      case "Monitoring":
        return (
          <section>
            <h2 className="text-3xl font-bold mb-6">Monitoring Details</h2>
            <p className="text-gray-400">
              This section will contain details related to monitoring.
            </p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-white p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Security Auditing And Monitoring</h1>
        <p className="text-gray-400">
          Focus. Speed. Quality. Elevate your product development with the
          streamlined tools and proven practices of world-class teams.
        </p>
      </header>

      <nav className="mb-12">
        <ul className="flex space-x-6">
          <li
            className={`cursor-pointer ${
              selectedTab === "Security" ? "text-green-500" : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("Security")}
          >
            
          </li>
          <li
            className={`cursor-pointer ${
              selectedTab === "Auditing" ? "text-green-500" : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("Auditing")}
          >
            Auditing
          </li>
          <li
            className={`cursor-pointer ${
              selectedTab === "Monitoring" ? "text-green-500" : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("Monitoring")}
          >
            Monitoring
          </li>
        </ul>
      </nav>

      <main>{renderContent()}</main>

    </div>
  );
}
