import React from "react";
import { Link } from "react-router";

const IssueCard = ({ issue }) => {
  if (!issue) return null;

  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow">
      
      <div className="h-48 overflow-hidden">
        <img
          src={issue.image}
          alt={issue.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="card-content">
        
        <div className="mb-2 flex items-center justify-between">
          <span className="badge badge-success">
            {issue.category}
          </span>
        </div>

        <h3 className="mb-2 line-clamp-1">{issue.title}</h3>

        <p className="text-sm mb-4 line-clamp-2">
          {issue.description}
        </p>

        <div className="flex items-center justify-between text-sm mb-4">
          <span>{issue.location}</span>
          <span className="text-green-600 font-semibold">
            ${issue.amount}
          </span>
        </div>

        <Link to={`/issues/${issue.id}`}>
          <button className="btn btn-primary w-full">
            See Details
          </button>
        </Link>

      </div>
    </div>
  );
};

export default IssueCard;
