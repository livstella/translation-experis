//default component to show if user tries to go to an invalid url on our website. The Navbar handles navigation in that case as well.

import React from 'react';

const NotFound = () => {
  return <div>
      <h3>Sorry, this is an invalid URL. Better luck next time</h3>
  </div>;
};

export default NotFound;
