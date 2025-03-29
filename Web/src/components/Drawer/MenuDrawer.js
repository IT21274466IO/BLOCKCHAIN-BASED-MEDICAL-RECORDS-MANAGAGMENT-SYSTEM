import React from 'react';
import MainDrawer from './MainDrawer';
import Sidebar from '../../Layout/Sidebar';

function MenuDrawer({ isOpen, toggleDrawer }) {
  return (
    <MainDrawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
      <Sidebar />
    </MainDrawer>
  );
}

export default MenuDrawer;
