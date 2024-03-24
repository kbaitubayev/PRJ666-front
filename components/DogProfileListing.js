import React, { useState } from 'react';
import EditDogProfileForm from './EditDogProfileForm'; // Import the EditDogProfileForm component
import { deleteDogProfile } from '../dog/api'; // Import the deleteDogProfile function

const DogProfileListing = ({ dogProfiles, fetchDogProfiles }) => {
  const [editingDogProfileId, setEditingDogProfileId] = useState(null);

  const handleEditClick = (dogProfileId) => {
    setEditingDogProfileId(dogProfileId);
  };

  const handleCancelEdit = () => {
    setEditingDogProfileId(null);
  };

  const handleDelete = async (dogProfileId) => {
    try {
      await deleteDogProfile(dogProfileId);
      // After successful deletion, fetch updated list of dog profiles
      fetchDogProfiles();
    } catch (error) {
      console.error('Error deleting dog profile:', error);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Existing Dog Profiles</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {dogProfiles.map(dogProfile => (
          <li key={dogProfile._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <div style={{ marginBottom: '10px' }}>
              <strong>Name:</strong> {dogProfile.name}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Breed:</strong> {dogProfile.breed}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Age:</strong> {dogProfile.age}
            </div>
            
            <div>
              <button onClick={() => handleDelete(dogProfile._id)} style={{ backgroundColor: '#f44336', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>Delete</button>
              {!editingDogProfileId && (
                <button onClick={() => handleEditClick(dogProfile._id)} style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
              )}
            </div>
            {editingDogProfileId === dogProfile._id && (
              <EditDogProfileForm
                dogProfile={dogProfile}
                onUpdate={() => {
                  handleCancelEdit();
                  fetchDogProfiles(); // Fetch dog profiles after successful update
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DogProfileListing;
