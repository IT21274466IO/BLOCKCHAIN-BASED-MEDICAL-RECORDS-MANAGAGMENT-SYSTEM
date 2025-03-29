import React from 'react';
import { MenuSelect } from '../components/Form';
import { TbUser } from 'react-icons/tb';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import NotificationComp from '../components/NotificationComp';
import { useNavigate } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import MenuDrawer from '../components/Drawer/MenuDrawer';

function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  // toggle drawer
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const DropDown1 = [
    {
      title: 'Profile',
      icon: TbUser,
      onClick: () => {
        navigate('/settings');
      },
    },
    {
      title: 'Logout',
      icon: AiOutlinePoweroff,
      onClick: () => {
        navigate('/');
      },
    },
  ];

  return (
    <>
      {isOpen && <MenuDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />}

      {/* cmp */}
      <div className="xl:w-5/6 w-full 2xl:max-w-[1640px] bg-dry grid md:grid-cols-2 grid-cols-12 items-center bg-opacity-95 fixed top-0 z-40 xs:px-8 px-2">
        <div className="md:col-span-1 sm:col-span-11 col-span-10 flex gap-4 items-center md:py-0 py-4">
          <button
            onClick={toggleDrawer}
            className="block xl:hidden border text-2xl bg-greyed w-16 md:w-12 h-12 rounded-md flex-colo text-textGray transitions hover:bg-border"
          >
            <BiMenu />
          </button>
          {/* search */}
          <input
            type="text"
            placeholder='Search "Patients"'
            className="md:w-96 w-full h-12 text-sm text-main rounded-md bg-dry border border-border px-4"
          />
        </div>
        <div className="md:col-span-1 sm:col-span-1 col-span-2 items-center justify-end pr-4 md:pr-0">
          <div className="float-right flex gap-4 items-center justify-center">
            <NotificationComp>
              <div className="relative">
                <MdOutlineNotificationsNone className="text-2xl hover:text-subMain" />
                <span className="absolute -top-2.5 -right-2.5 font-semibold bg-subMain rounded-full px-1.5 py-0.5 text-xs text-white text-center">
                  5
                </span>
              </div>
            </NotificationComp>

            <div className=" items-center md:flex hidden">
              <MenuSelect datas={DropDown1}>
                <div className="flex gap-4 items-center p-4 rounded-lg">
                  <img
                    src="/images/user1.png"
                    alt="user"
                    className="w-12 border border-border object-cover h-12 rounded-full"
                  />
                  <p className="text-sm text-textGray font-medium">Dr. Sameera Madushan</p>
                </div>
              </MenuSelect>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
