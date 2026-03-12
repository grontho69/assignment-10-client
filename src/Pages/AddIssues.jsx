import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { issueService } from '../services/issue.service';
import { useNavigate } from 'react-router';

const AddIssues = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const issueData = {
        title: form.title.value,
        image: form.image.value,
        location: form.location.value,
        category: form.category.value,
        amount: Number(form.amount.value),
        description: form.description.value,
        email: user.email,
        userName: user.name,
        userPhoto: user.photoURL,
        status: 'Pending'
    };

    try {
        await issueService.createIssue(issueData);
        toast.success("Issue reported successfully");
        navigate('/my-issues');
    } catch (err) { toast.error("Submission failed"); } finally { setLoading(false); }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl text-slate-800 dark:text-white">
      <h1 className="text-5xl font-black mb-12">Report Concern</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-900 p-12 rounded-[3.5rem] shadow-sm">
        <input name="title" required placeholder="Issue Title" className="input bg-slate-50 dark:bg-gray-800 p-4 rounded-xl" />
        <input name="image" required placeholder="Photo URL" className="input bg-slate-50 dark:bg-gray-800 p-4 rounded-xl" />
        <input name="location" required placeholder="Location" className="input bg-slate-50 dark:bg-gray-800 p-4 rounded-xl" />
        <select name="category" className="input bg-slate-50 dark:bg-gray-800 p-4 rounded-xl">
            <option>Waste Management</option>
            <option>Broken Infrastructure</option>
            <option>Waterlogging</option>
        </select>
        <input name="amount" type="number" required min="1" placeholder="Estimated Budget ($)" className="input bg-slate-50 dark:bg-gray-800 p-4 rounded-xl" />
        <textarea name="description" required placeholder="Describe the situation..." className="md:col-span-2 bg-slate-50 dark:bg-gray-800 p-4 rounded-xl h-32"></textarea>
        <button disabled={loading} className="md:col-span-2 bg-emerald-500 text-white font-black p-5 rounded-[2rem]">Submit Report</button>
      </form>
    </div>
  );
};
export default AddIssues;
