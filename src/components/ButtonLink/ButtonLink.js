import React from 'react';

const ButtonLink = ({
  children,
  handleClick,
  buttonStyle,
  active,
  buttonColor,
  buttonHoverColor,
  ...rest
}) => (
  <button
    type="button"
    onClick={handleClick}
    style={{
      ...{
        display: 'flex',
        width: 100,
        padding: '5px 5px 5px 20px',
        margin: '5px 0',
        color: active ? buttonHoverColor : buttonColor,
        background: 'transparent',
        border: '2px solid transparent',
        fontSize: '0.9rem',
        fontWeight: 700,
        textTransform: 'capitalize',
        cursor: 'pointer',
      },
      ...buttonStyle,
    }}
    {...rest}
  >
    {children}
  </button>
);

export default ButtonLink;
