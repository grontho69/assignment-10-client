import React, { useContext, useEffect, useState } from 'react'
import { MapPin, Calendar, DollarSign, User, Loader2, X } from 'lucide-react';
import {   useNavigate, useParams } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { RotateLoader } from 'react-spinners';

const IssueDetails = () => {
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [contributions, setContributions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { id } = useParams()
    const [issue, setIssue] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/issues/${id}`, {
          headers: {
            authorization:`Bearer ${user.accessToken}`
           }
        })
        .then(res=>res.json())
            .then(data => {
                console.log(data)
                setIssue(data.result)
                setLoading(false)
        })
    },[])




    
    useEffect(() => {
        if (issue?._id) {
            fetch(`http://localhost:3000/contributions?issueId=${issue._id}`)
                .then(res => res.json())
                .then(data => setContributions(data))
                .catch(err => console.error("Failed to load contributions", err));
        }
    }, [issue]);

    
    const totalRaised = contributions.reduce((acc, curr) => acc + Number(curr.amount), 0);
    const progressPercentage = Math.min((totalRaised / (issue.amount || 1)) * 100, 100);

    const handleContributionSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target;
        const contributionData = {
            issueId: issue._id,
            issueTitle: issue.title,
            contributorName: form.contributorName.value,
            contributorEmail: user?.email,
            contributorImage: user?.photoURL || '',
            phoneNumber: form.phone.value,
            address: form.address.value,
            amount: form.contributionAmount.value,
            additionalInfo: form.additionalInfo.value,
        };

        try {
            const response = await fetch('http://localhost:3000/contributions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contributionData),
            });

            const result = await response.json();

            if (result._id) {
                toast.success('Contribution successful!');
                navigate('/my-contribution');
                setContributions([result, ...contributions]);
                setShowModal(false);
                form.reset();
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong.');
        } finally {
            setIsSubmitting(false);
        }
    }

     if (loading) {
       return <div className='h-[97vh] flex items-center justify-center'>
       <RotateLoader
     color="#54b355"
     size={25}
   />
     </div>
   }

    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card">
                            <div className="h-96 overflow-hidden">
                                <img
                                    src={issue.image}
                                    alt={issue.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="card-content">
                                <div className="mb-4">
                                    <span className="badge badge-success text-sm">
                                        {issue.category}
                                    </span>
                                </div>
                                <h1 className="text-3xl mb-4 text-gray-900 dark:text-white">{issue.title}</h1>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-5 w-5 mr-2" />
                                        {issue.location}
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <Calendar className="h-5 w-5 mr-2" />
                                        {new Date(issue.date).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <DollarSign className="h-5 w-5 mr-2" />
                                        Budget: ${issue.amount}
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <User className="h-5 w-5 mr-2" />
                                        {issue.email}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl mb-2 text-gray-900 dark:text-white">Description</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{issue.description}</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className="card">
                            <div className="card-content">
                                <h3 className="text-xl mb-4 text-gray-900 dark:text-white">Contributors</h3>
                                <div className="table-container">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Contributor</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contributions.map((contrib) => (
                                                <tr key={contrib._id}>
                                                    <td>
                                                        <div className="flex items-center">
                                                            <div className="avatar mr-2">
                                                                <div className="avatar-fallback overflow-hidden">
                                                                    <img src={contrib.contributorImage || "https://via.placeholder.com/40"} alt="" />
                                                                </div>
                                                            </div>
                                                            <span>{contrib.contributorName}</span>
                                                        </div>
                                                    </td>
                                                    <td className="text-green-600 font-semibold">${contrib.amount}</td>
                                                    <td>{new Date(contrib.createdAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="space-y-6">
                        <div className="card">
                            <div className="card-content">
                                <h3 className="text-xl mb-4 text-gray-900 dark:text-white">Contribution Progress</h3>
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Total Raised</span>
                                        <span className="text-green-600 font-semibold">${totalRaised}</span>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                                    </div>
                                    <div className="flex justify-between text-xs mt-2 text-gray-500">
                                        <span>{Math.round(progressPercentage)}% of goal</span>
                                        <span>Goal: ${issue.amount}</span>
                                    </div>
                                </div>

                                <button className="btn btn-primary w-full" onClick={() => setShowModal(true)}>
                                    Pay Clean-Up Contribution
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                
                {showModal && (
                    <div className="dialog-overlay" onClick={() => setShowModal(false)}>
                        <div className="dialog" onClick={(e) => e.stopPropagation()}>
                            <div className="dialog-header">
                                <div className="flex items-center justify-between">
                                    <h3 className="dialog-title">Make a Contribution</h3>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="btn btn-ghost btn-sm p-1"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <p className="dialog-description">Enter your details to contribute to this issue.</p>
                            </div>
                            <div className="dialog-content">
                                <form onSubmit={handleContributionSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="label">Issue Title</label>
                                        <input className="input" value={issue.title} disabled />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="contributorName" className="label">Name *</label>
                                        <input
                                            id="contributorName"
                                            name="contributorName"
                                            className="input"
                                            defaultValue={user?.displayName || ''}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="contributorEmail" className="label">Email *</label>
                                        <input
                                            id="contributorEmail"
                                            type="email"
                                            className="input"
                                            value={user?.email || ''}
                                            disabled
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="label">Phone Number *</label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            className="input"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="address" className="label">Address *</label>
                                        <input
                                            id="address"
                                            name="address"
                                            className="input"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="contributionAmount" className="label">Amount ($) *</label>
                                        <input
                                            id="contributionAmount"
                                            name="contributionAmount"
                                            type="number"
                                            min="1"
                                            step="1"
                                            className="input"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="additionalInfo" className="label">Additional Information</label>
                                        <textarea
                                            id="additionalInfo"
                                            name="additionalInfo"
                                            className="textarea"
                                            placeholder="Any additional notes (optional)"
                                            rows={3}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isSubmitting ? 'Submitting...' : 'Submit Contribution'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default IssueDetails