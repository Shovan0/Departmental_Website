import React from "react";
import { Link } from "react-router-dom";

function Query() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">
        Query Addressal
      </h1>

      <div className="grid gap-6 w-full max-w-md">
        {/* Card 1 */}
        <Link
          to="/apply/noc"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex items-center justify-between"
        >
          <span className="text-lg font-semibold text-gray-800">
            Apply for NOC
          </span>
          <span className="text-blue-600 font-bold">&rarr;</span>
        </Link>

        {/* Card 2 */}
        <Link
          to="/apply/certificate"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex items-center justify-between"
        >
          <span className="text-lg font-semibold text-gray-800">
            Request a Certificate
          </span>
          <span className="text-blue-600 font-bold">&rarr;</span>
        </Link>

        {/* Card 3 */}
        <Link
          to="/apply/query"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex items-center justify-between"
        >
          <span className="text-lg font-semibold text-gray-800">
            Submit General Query
          </span>
          <span className="text-blue-600 font-bold">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}

export default Query;
