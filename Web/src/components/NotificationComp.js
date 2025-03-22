import { Menu } from '@headlessui/react';
import React from 'react';
import { FaBirthdayCake } from 'react-icons/fa';
import { notificationsData } from './Datas';
import { BiCalendar } from 'react-icons/bi';

function NotificationComp({ children }) {
  return (
    <Menu>
      <Menu.Button>{children}</Menu.Button>
      <Menu.Items className="flex flex-col w-full sm:w-8/12 md:w-6/12  xl:w-2/6 top-20 right-0 gap-4 absolute bg-white rounded-md shadow-lg py-4 px-6 ring-1 ring-border focus:outline-none z-50">
        <div className="flex-btn flex-wrap gap-4">
          <h2 className="text-md font-medium text-main">Notifications</h2>
          <button className="px-4 py-2 hover:bg-text rounded-md text-subMain text-sm">
            Mark all read
          </button>
        </div>
        {/* notif */}
        <div className="flex flex-col gap-4 overflow-y-scroll max-h-[500px]">
          {notificationsData.map((item) => (
            <div
              key={item.id}
              className="w-full p-4 border border-border rounded-lg"
            >
              <div className="grid xs:grid-cols-12 gap-4 items-center">
                <div className="xs:col-span-2">
                  <div
                    className={`${
                      item.action === 1
                        ? 'bg-subMain text-white'
                        : 'bg-text text-subMain'
                    }
                  w-12 h-12 rounded-full text-md flex-colo border-[.5px] border-subMain`}
                  >
                    {item.action === 1 ? <FaBirthdayCake /> : <BiCalendar />}
                  </div>
                </div>
                <div className="xs:col-span-10 ">
                  {item.action === 1 ? (
                    <p className="text-sm text-textGray">
                      Its{' '}
                      <span className="text-main font-medium">
                        {item.user.title}
                      </span>{' '}
                      birthday today
                    </p>
                  ) : (
                    <p className="text-sm text-textGray">
                      Recent appointment with{' '}
                      <span className="text-main font-medium">
                        {item.user.title}
                      </span>{' '}
                      at 2:00 PM
                    </p>
                  )}
                  <div className="flex-btn gap-4">
                    <p className="text-xs text-textGray mt-2 font-light">
                      {item.time}
                    </p>
                    <p className="text-xs text-textGray">2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}

export default NotificationComp;
