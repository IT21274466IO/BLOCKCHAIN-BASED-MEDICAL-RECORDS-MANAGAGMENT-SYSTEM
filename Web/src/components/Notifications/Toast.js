import React from 'react';
import { Toaster } from 'react-hot-toast';

function Toast() {
  return (
    <Toaster
      position="bottom-left"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 2000,
        style: {
          background: '#fff',
          color: '#000',
        },
      }}
    />
  );
}

export default Toast;
