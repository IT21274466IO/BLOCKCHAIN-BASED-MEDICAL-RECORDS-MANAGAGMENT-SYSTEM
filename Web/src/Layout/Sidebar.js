import React from 'react';
import { MenuDatas } from '../components/Datas';
import { Link } from 'react-router-dom';

function Sidebar() {
  // active link
  const currentPath = (path) => {
    const currentPath =
      window.location.pathname.split('/')[1] === path.split('/')[1];
    if (currentPath) {
      return path;
    }
    return null;
  };

  return (
    <div className="bg-white xl:shadow-lg py-6 px-4 xl:h-fit w-full border-r border-border">
      <Link to="/dashboard">
        <img
          src="/images/slide-bar.png"
          alt="logo"
          className="w-3/4 h-32 ml-4 object-contain"
        />
      </Link>
      <div className="flex-colo gap-2 mt-12">
        {MenuDatas.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`
            ${currentPath(item.path) === item.path ? 'bg-text' : ''}
            flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-text`}
          >
            <item.icon
              className={`text-xl text-subMain
            `}
            />
            <p
              className={`text-sm font-medium group-hover:text-subMain ${
                currentPath(item.path) === item.path
                  ? 'text-subMain'
                  : 'text-gray-500'
              }`}
            >
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
