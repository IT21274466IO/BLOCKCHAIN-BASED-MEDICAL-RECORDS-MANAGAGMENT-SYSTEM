import React from 'react';
import Drawer from 'react-modern-drawer';

function MainDrawer({ isOpen, toggleDrawer, children }) {
  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="left"
      className="bg-white overflow-y-scroll"
    >
      {children}
    </Drawer>
  );
}

export default MainDrawer;
