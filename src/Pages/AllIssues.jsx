import { Search } from "lucide-react";
import React, { useState, useMemo } from "react";
import { useLoaderData } from "react-router";
import IssueCard from "../Components/IssueCard";

const AllIssues = () => {
  const issues = useLoaderData() 
  const [search, setSearch] = useState("");


  const filteredIssues = useMemo(() => {
    if (!search) return issues;

    return issues.filter(i =>
      i.title?.toLowerCase().includes(search.toLowerCase()) ||
      i.location?.toLowerCase().includes(search.toLowerCase()) ||
      i.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, issues]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl mb-8">All Issues</h1>

     
      <div className="mb-8 max-w-md relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          className="input pl-10 w-full"
          placeholder="Search issues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

   
      {filteredIssues.length === 0 ? (
        <div className="text-center py-12">
          <p>No issues found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map(issues => (
            <IssueCard key={issues.id} issue={issues} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllIssues;
