import React, { useState, useEffect } from 'react';
import DogProfileListing from '../components/DogProfileListing';
import CreateDogProfileForm from '../components/CreateDogProfileForm'; // Import the CreateDogProfileForm component
import { deleteDogProfile } from '../dog/api'; // Import your API functions
import { createDogProfile } from '../dog/api'; // Adjust the path as needed
import api from '../dog/api';

const DogProfileManagementPage = () => {
  const [dogProfiles, setDogProfiles] = useState([]);

  // Function to fetch dog profiles from the backend
  const fetchDogProfiles = async () => {
    try {
      const response = await api.get('/dogprofile');
      setDogProfiles(response.data);
    } catch (error) {
      console.error('Error fetching dog profiles:', error);
    }
  };

  // Fetch existing dog profiles from the backend when the page loads
  useEffect(() => {
    fetchDogProfiles();
  }, []);

  // Function to handle dog profile deletion
  const handleDeleteDogProfile = async (dogProfileId) => {
    try {
      await deleteDogProfile(dogProfileId);
      // Refetch dog profiles after deletion
      fetchDogProfiles();
    } catch (error) {
      console.error('Error deleting dog profile:', error);
    }
  };

  // Function to handle creation of a new dog profile
  const handleCreateDogProfile = async (formData) => {
    try {
      // Perform API call to create a new dog profile
      const newDogProfile = await createDogProfile(formData);
      // Refetch dog profiles after creation
      fetchDogProfiles();
    } catch (error) {
      console.error('Error creating dog profile:', error);
    }
  };

  return (
    <div>
      {/* Render the CreateDogProfileForm component */}
      <CreateDogProfileForm onCreate={handleCreateDogProfile} />
      {/* Pass fetchDogProfiles as a prop to DogProfileListingAdmin */}
      <DogProfileListing
        dogProfiles={dogProfiles}
        onDelete={handleDeleteDogProfile}
        fetchDogProfiles={fetchDogProfiles}
      />
    </div>
  );
};

export default DogProfileManagementPage;
