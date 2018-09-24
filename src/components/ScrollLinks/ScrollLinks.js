import React from 'react';

const ScrollLinks = ({ children }) => (
  <aside
    style={{
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    {children}
  </aside>
);

export default ScrollLinks;
