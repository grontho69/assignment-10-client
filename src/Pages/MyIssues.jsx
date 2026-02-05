import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Pencil, Trash2, X, Loader2 } from 'lucide-react'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const MyIssues = () => {

  const { user } = useContext(AuthContext)
  const [issues, setIssues] = useState([])
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null); 
  const [isUpdating, setIsUpdating] = useState(false);
 
  const handleEditClick = (issue) => {
    setSelectedIssue(issue); 
    setShowUpdateModal(true);
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedIssue(prev => ({ ...prev, [name]: value }));
  };

  
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const response = await fetch(`http://localhost:3000/issues/${selectedIssue._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify(selectedIssue)
      });

      const result = await response.json();

      if (result.modifiedCount > 0) {
       
        setIssues(prev => prev.map(issue => 
          issue._id === selectedIssue._id ? selectedIssue : issue
        ));
        toast.success("Issue updated successfully!");
        setShowUpdateModal(false);
      } else {
        toast.info("No changes were made.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update issue.");
    } finally {
      setIsUpdating(false);
    }
  };
  
  useEffect(() => {
    fetch(`http://localhost:3000/my-issues?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setIssues(data)
    })
  }, [user.email, user.accessToken])

 const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (!result.isConfirmed) return;

    fetch(`http://localhost:3000/issues/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          toast.error("Delete failed");
          return;
        }

        setIssues(prev => prev.filter(issue => issue._id !== id));
        toast.success("Issue deleted successfully");
      })
      .catch(() => toast.error("Server error"));
  });
};




  return (
   <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl mb-8 text-gray-900 dark:text-white">My Issues</h1>

      {issues.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">You haven't reported any issues yet</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
  <tr>
    <th>Title</th>
    <th>Category</th>
    <th>Location</th>
  
    <th>Budget</th>
    <th>Date</th>
    <th className="text-right">Actions</th>
  </tr>
</thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue._id}>
                  <td className="font-medium">{issue.title}</td>
                  <td>{issue.category}</td>
                  <td>{issue.location}</td>
                  
                  <td className="text-green-600">${issue.amount}</td>
                  <td>{new Date(issue.date).toLocaleDateString()}</td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => handleEditClick(issue)}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="btn btn-sm btn-destructive"
                        onClick={() => handleDelete(issue._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      
      {showUpdateModal && selectedIssue && (
        <div className="dialog-overlay" onClick={() => setShowUpdateModal(false)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <div className="flex items-center justify-between">
                <h3 className="dialog-title">Update Issue</h3>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="btn btn-ghost btn-sm p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="dialog-description">Make changes to your reported issue.</p>
            </div>
            <div className="dialog-content">
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                
                
                <div className="space-y-2">
                  <label htmlFor="title" className="label">Title *</label>
                  <input
                    id="title"
                    name="title"
                    className="input"
                    value={selectedIssue.title || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   
                  <div className="space-y-2">
                    <label htmlFor="category" className="label">Category *</label>
                    <select
                      id="category"
                      name="category"
                      className="select"
                      value={selectedIssue.category || ''}
                      onChange={handleInputChange}
                    >
                      <option value="Garbage">Garbage</option>
                      <option value="Illegal Construction">Illegal Construction</option>
                      <option value="Broken Public Property">Broken Public Property</option>
                      <option value="Road Damage">Road Damage</option>
                    </select>
                  </div>

                  
                </div>

              
                <div className="space-y-2">
                  <label htmlFor="description" className="label">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    className="textarea"
                    value={selectedIssue.description || ''}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                
                <div className="space-y-2">
                  <label htmlFor="amount" className="label">Budget ($) *</label>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    min="0"
                    step="1"
                    className="input"
                    value={selectedIssue.amount || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" className="btn btn-primary flex-1" disabled={isUpdating}>
                    {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isUpdating ? 'Updating...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyIssues
