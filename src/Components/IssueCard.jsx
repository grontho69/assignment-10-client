import React from "react";
import { Link } from "react-router";

const IssueCard = ({ issue }) => {
  if (!issue) return null;

  return (
    <div className="card bg-card text-foreground overflow-hidden hover:shadow-lg transition-shadow border border-border">
      
      
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

       
        <h3 className="mb-2 line-clamp-1 font-semibold text-foreground">
          {issue.title}
        </h3>

      
        <p className="text-sm mb-4 line-clamp-2 text-muted-foreground">
          {issue.description}
        </p>

        
        <div className="flex items-center justify-between text-sm mb-4">
          <span className="text-muted-foreground">
            {issue.location}
          </span>

          <span className="font-semibold text-green-600 dark:text-green-400">
            ${issue.amount}
          </span>
        </div>

        
        <Link to={`/issue-details/${issue._id}`}>
          <button className="btn btn-primary w-full">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default IssueCard;
