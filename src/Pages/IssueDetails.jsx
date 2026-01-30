import React from "react";
import { MapPin, Calendar, DollarSign, User, X } from "lucide-react";
import { useLoaderData } from "react-router";

const IssueDetails = ({  contributions = [] }) => {
  const data = useLoaderData()
  const issue = data.result


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Issue Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="h-96 overflow-hidden">
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-4">

              <span className="badge badge-success text-sm">
                {issue.category}
              </span>

              <h1 className="text-3xl font-bold">
                {issue.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">

                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  {issue.location}
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  {issue.date}
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign size={18} />
                  Budget: ${issue.amount}
                </div>

                <div className="flex items-center gap-2">
                  <User size={18} />
                  {issue.email}
                </div>

              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-gray-600">
                  {issue.description}
                </p>
              </div>

            </div>
          </div>

          {/* Contributors Table */}
          <div className="card bg-base-100 shadow-xl">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Contributors</h3>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Contributor</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {contributions.map((c) => (
                      <tr key={c.id}>
                        <td className="flex items-center gap-2">
                          <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-8">
                              <span>{c.name?.[0]}</span>
                            </div>
                          </div>
                          {c.name}
                        </td>

                        <td className="text-green-600 font-semibold">
                          ${c.amount}
                        </td>

                        <td>{c.date}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* Progress */}
          <div className="card bg-base-100 shadow-xl">
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">
                Contribution Progress
              </h3>

              <progress className="progress progress-primary w-full" value="40" max="100"></progress>

              <div className="flex justify-between text-sm">
                <span>Total Raised</span>
                <span>Goal: ${issue.amount}</span>
              </div>

              <button className="btn btn-primary w-full">
                Pay Clean-Up Contribution
              </button>
            </div>
          </div>

          

        </div>
      </div>

      {/* Contribution Modal UI Only */}
     {/* 
      <div className="modal modal-open">
        <div className="modal-box space-y-4">

          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">
              Make a Contribution
            </h3>
            <button className="btn btn-ghost btn-sm">
              <X size={18} />
            </button>
          </div>

          <form className="space-y-3">

            <input className="input input-bordered w-full" placeholder="Name" />
            <input className="input input-bordered w-full" placeholder="Email" />
            <input className="input input-bordered w-full" placeholder="Phone" />
            <input className="input input-bordered w-full" placeholder="Address" />
            <input className="input input-bordered w-full" placeholder="Amount" type="number" />

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Additional Notes"
            />

            <button className="btn btn-primary w-full">
              Submit Contribution
            </button>

          </form>

        </div>
      </div>
     
     */}

    </div>
  );
};

export default IssueDetails;
