import React from 'react';

const Loading: React.FC = () => {
  return (
    <div
      className="
        animate-spin
        inline-flex
        w-12 h-12
        border-2 border-blue-500/40 border-b-transparent
        rounded-full
      "
    />
  );
};

export default Loading;
