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
      <h2>Existing Dog Profiles</h2>
      <ul>
        {dogProfiles.map(dogProfile => (
          <li key={dogProfile._id}>
            <div>
              <strong>Name:</strong> {dogProfile.name}
            </div>
            <div>
              <strong>Breed:</strong> {dogProfile.breed}
            </div>
            <div>
              <strong>Age:</strong> {dogProfile.age}
            </div>
            <div>
              <button onClick={() => handleDelete(dogProfile._id)}>Delete</button>
              {!editingDogProfileId && (
                <button onClick={() => handleEditClick(dogProfile._id)}>Edit</button>
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
