import React from 'react';

const EmptyState = ({ text = 'Nothing to display' }: { text: string }): JSX.Element => {
  return (
    <div className='EmptyState'>
      <p>{text}</p>
    </div>
  );
};

export default EmptyState;
