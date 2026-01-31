import React, { useEffect, useMemo, useState } from "react";
import { MapPin, Calendar, DollarSign, User, X } from "lucide-react";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";


const IssueDetails = () => {
  const data = useLoaderData();
  const issue = data.result;

  const [contributions, setContributions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  //  contributions for the issue
  useEffect(() => {
    fetch(`http://localhost:3000/contributions?issueId=${issue._id}`)
      .then(res => res.json())
      .then(data => setContributions(data));
  }, [issue._id]);

  // total 
  const totalCollected = useMemo(() => {
    return contributions.reduce((sum, c) => sum + Number(c.amount), 0);
  }, [contributions]);

  const progress = Math.min(
    (totalCollected / issue.amount) * 100,
    100
  );

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const payload = {
      issueId: issue._id,
      issueTitle: issue.title,
      amount: Number(form.amount.value),
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      note: form.note.value
    };

    const res = await fetch("http://localhost:3000/contributions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const saved = await res.json();
      setContributions(prev => [...prev, saved]);
      toast.success("Contribution submitted successfully!");
      setOpenModal(false);
      form.reset();
    } else {
      toast.error("Failed to submit contribution");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        
        <div className="lg:col-span-2 space-y-6">

         
          <div className="card bg-base-100 shadow-xl">
            <img src={issue.image} className="h-96 w-full object-cover" />

            <div className="p-6 space-y-4">
              <span className="badge badge-success">{issue.category}</span>

              <h1 className="text-3xl font-bold">{issue.title}</h1>

              <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                <div className="flex gap-2"><MapPin /> {issue.location}</div>
                <div className="flex gap-2"><Calendar /> {issue.date}</div>
                <div className="flex gap-2"><DollarSign /> Budget: ${issue.amount}</div>
                <div className="flex gap-2"><User /> {issue.email}</div>
              </div>

              <p className="text-gray-600">{issue.description}</p>
            </div>
          </div>

          {/* contributions */}
          <div className="card bg-base-100 shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Contributors</h3>

            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map(c => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td className="text-green-600">${c.amount}</td>
                    <td>{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-xl p-6 space-y-4">
            <h3 className="text-xl font-semibold">Contribution Progress</h3>

            <progress
              className="progress progress-primary w-full"
              value={progress}
              max="100"
            />

            <div className="flex justify-between text-sm">
              <span>Raised: ${totalCollected}</span>
              <span>Goal: ${issue.amount}</span>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="btn btn-primary w-full"
            >
              Pay Clean-Up Contribution
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">Make a Contribution</h3>
              <button onClick={() => setOpenModal(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 mt-4">
              <input readOnly value={issue.title} className="input input-bordered w-full" />
              <input name="amount" required type="number" placeholder="Amount" className="input input-bordered w-full" />
              <input name="name" required placeholder="Contributor Name" className="input input-bordered w-full" />
              <input name="email" readOnly value={issue.email} className="input input-bordered w-full" />
              <input name="phone" required placeholder="Phone Number" className="input input-bordered w-full" />
              <input name="address" required placeholder="Address" className="input input-bordered w-full" />
              <textarea name="note" placeholder="Additional info (optional)" className="textarea textarea-bordered w-full" />

              <button disabled={loading} className="btn btn-primary w-full">
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueDetails;
