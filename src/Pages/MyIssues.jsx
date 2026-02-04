import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Pencil, Trash2 } from 'lucide-react'

const MyIssues = () => {

  const { user } = useContext(AuthContext)
  const [issues,setIssues]= useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/my-issues?email=${user.email}`
      , {
          headers: {
            authorization:`Bearer ${user.accessToken}`
           }
        }
    )
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setIssues(data)
    })
 })

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
                <tr key={issue.id}>
                  <td className="font-medium">{issue.title}</td>
                  <td>{issue.category}</td>
                  <td>{issue.location}</td>
                  <td className="text-green-600">${issue.amount}</td>
                  
                  <td>{new Date(issue.date).toLocaleDateString()}</td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        className="btn btn-sm btn-outline"
                        
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="btn btn-sm btn-destructive"
                       
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
    </div>
  )
}

export default MyIssues
