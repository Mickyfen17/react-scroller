import React from 'react';

const ScrollContent = React.forwardRef(({ children, contentStyle }, ref) => {
  return (
    <aside
      ref={ref}
      style={{
        ...{ overflowY: 'scroll' },
        ...contentStyle,
      }}
    >
      {children}
    </aside>
  );
});

export default ScrollContent;
