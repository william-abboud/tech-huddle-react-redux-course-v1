import React from 'react';

function Avatar({ firstName, lastName, imageSrc }) {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="avatar">
      <img src={imageSrc} alt="" />
      <h4>{fullName}</h4>
    </div>
  );
}

export default Avatar;
