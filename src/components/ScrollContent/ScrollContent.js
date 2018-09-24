import React from 'react';

const ScrollContent = React.forwardRef(({ children }, ref) => {
  return (
    <aside ref={ref} style={{ flex: 2, overflowY: 'scroll', color: '#FFF' }}>
      {children}
    </aside>
  );
});

export default ScrollContent;
