import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

function index({ children, title }) {
  return (
    <div className="bg-dry xl:h-screen flex-colo mt-20">
      <div className="grid xl:grid-cols-12 w-full 2xl:max-w-[2000px]">
        <div className="col-span-2 xl:block hidden">
          <Sidebar />
        </div>
        <div className="col-span-10 xl:h-screen overflow-y-scroll relative">
          <Header title={title} />
          <div className="xs:px-8 px-2 pt-24">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default index;
