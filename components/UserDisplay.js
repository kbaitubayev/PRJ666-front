// components/UserDisplay.js
import React from 'react';

const UserDisplay = ({ userEmail }) => {
  return (
    <div>
      {userEmail && <p>User Email: {userEmail}</p>}
    </div>
  );
};

export default UserDisplay;
