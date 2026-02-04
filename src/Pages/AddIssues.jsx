import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

const AddIssues = () => {
const {user} = useContext(AuthContext)


  const handleSubmit = (e) => {
    e.preventDefault()
    
    const fromData = {
      title: e.target.title.value,
      category: e.target.category.value,
      location: e.target.location.value,
      description: e.target.description.value,
      image: e.target.image.value,
      amount: e.target.amount.value,
      date: new Date(),
    email:user.email,
    }
    fetch('http://localhost:3000/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fromData)
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Issue reported successfully')
      console.log(data)
      })
      .catch(err => {
      console.log(err)
    })
}


  return (
    <div>
       <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Report a New Issue</h2>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="label">Issue Title *</label>
              <input
                id="title"
                name="title"
                className="input"
               
                placeholder="Enter issue title"
                
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="label">Category *</label>
              <select
                id="category"
                name="category"
                className="select"
              
              >
                <option value="">Select category</option>
                <option value="Garbage">Garbage</option>
                <option value="Illegal Construction">Illegal Construction</option>
                <option value="Broken Public Property">Broken Public Property</option>
                <option value="Road Damage">Road Damage</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="label">Location *</label>
              <input
                id="location"
                name="location"
                className="input"
                
                
                placeholder="Enter location"
                
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="label">Description *</label>
              <textarea
                id="description"
                name="description"
                className="textarea"
               
                placeholder="Describe the issue in detail"
                rows={4}
                
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="label">Image URL *</label>
              <input
                id="image"
                name="image"
                type="url"
                className="input"
               
                placeholder="Enter image URL"
                
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="amount" className="label">Suggested Fix Budget ($) *</label>
              <input
                id="amount"
                name="amount"
                type="number"
                min="0"
                step="1"
                className="input"
                
                
                placeholder="Enter estimated budget"
                
              />
            </div>

            <div className="space-y-2">
              <label className="label">Email (Read Only)</label>
                <input className="input"
                  value={user?.email || ''}
                disabled/>
            </div>

            <button type="submit" className="btn btn-primary w-full" >
              
                'Submit Issue'
              
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AddIssues
