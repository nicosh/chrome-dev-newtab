import { useState } from 'react';

const Window = ({ size, children }) => {
  const [show, setShow] = useState(true);
  const [small, setSmall] = useState(false);

  const resize = (e, action) => {
    e.preventDefault();
    setSmall(action);
  };

  const hide = (e) => {
    e.preventDefault();
    setShow(false);
  };
  return (
    <div
      className={`${small ? 'col-md-1' : size} mt-4 flex-grow-1 flex-fill window position-relative ${
        !show ? 'd-none' : ''
      }`}
    >
      <div className='window-buttons'>
        <a
          onClick={(e) => {
            hide(e);
          }}
          className='me-2'
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'>
            <g fill='none' fill-rule='evenodd' transform='translate(1 1)'>
              <circle cx='6' cy='6' r='6' fill='#FF5F56' stroke='#E0443E' stroke-width='.5'></circle>
            </g>
          </svg>
        </a>
        <a
          onClick={(e) => {
            resize(e, true);
          }}
          className='me-2'
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'>
            <g fill='none' fill-rule='evenodd' transform='translate(1 1)'>
              <circle cx='6' cy='6' r='6' fill='#FFBD2E' stroke='#DEA123' stroke-width='.5'></circle>
            </g>
          </svg>
        </a>
        <a
          onClick={(e) => {
            resize(e, false);
          }}
          className='me-2'
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'>
            <g fill='none' fill-rule='evenodd' transform='translate(1 1)'>
              <circle cx='6' cy='6' r='6' fill='#27C93F' stroke='#1AAB29' stroke-width='.5'></circle>
            </g>
          </svg>
        </a>
      </div>
      {children}
    </div>
  );
};
export default Window;
