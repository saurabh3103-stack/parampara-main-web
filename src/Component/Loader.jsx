import React from 'react';
import styled from 'styled-components';

const loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-orange-500 border-orange-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-orange-800">Loading your sacred journey...</p>
        </div>
      </div>
  );
}

export default loader;
