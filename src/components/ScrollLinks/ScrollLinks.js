import React from 'react';

const ScrollLinks = ({ children, scrollStyle }) => (
  <aside
    style={{
      ...{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      },
      ...scrollStyle,
    }}
  >
    {children}
  </aside>
);

export default ScrollLinks;
