import React from 'react';
import Layout from '../Layout';
import { Button, MenuSelect } from '../components/Form';
import { BiDotsVerticalRounded, BiPlus } from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import { campaignData } from '../components/Datas';
import { TbBrandWhatsapp, TbMessage } from 'react-icons/tb';
import CampaignModal from '../components/Modals/AddCampagnModal';
import { FiEye } from 'react-icons/fi';

function Campaings() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState({});

  const closeModal = () => {
    setIsOpen(!isOpen);
    setData({});
  };

  const actions = [
    {
      title: 'View',
      icon: FiEye,
      onClick: (data) => {
        setIsOpen(true);
        setData(data);
      },
    },
    {
      title: 'Delete',
      icon: RiDeleteBinLine,
      onClick: () => {
        toast.error('This feature is not available yet');
      },
    },
  ];

  return (
    <Layout>
      {isOpen && (
        <CampaignModal isOpen={isOpen} closeModal={closeModal} data={data} />
      )}
      <div className="flex-btn flex-wrap gap-4 items-center">
        <h1 className="text-xl font-semibold">Campaings</h1>
        <div className="xs:w-56">
          <Button
            label="New Campaing"
            Icon={BiPlus}
            onClick={() => {
              closeModal();
            }}
          />
        </div>
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="grid lg:grid-cols-3 sm:grid-cols-2 my-8 gap-4"
      >
        {campaignData.map((item, index) => (
          <div
            key={index}
            className="bg-white border-[1px] border-border rounded-xl p-5"
          >
            <div className="grid grid-cols-12 gap-4 items-center border-b border-border pb-4">
              <div className="col-span-2">
                <div
                  className={`
                  ${item.type === 'sms' && 'bg-blue-500 text-blue-500'}
                  ${item.type === 'email' && 'bg-orange-500 text-orange-500'}
                  ${item.type === 'whatsapp' && 'bg-green-500 text-green-500'}
                  w-full h-12 text-lg rounded flex-colo bg-opacity-10`}
                >
                  {item.type === 'email' && <HiOutlineMail />}
                  {item.type === 'sms' && <TbMessage />}
                  {item.type === 'whatsapp' && <TbBrandWhatsapp />}
                </div>
              </div>
              <div className="col-span-8">
                <h1 className="text-sm font-light">{item.title}</h1>
                <p className="text-xs font-medium mt-1">{item.sendTo}</p>
              </div>
              <div className="col-span-2">
                <MenuSelect datas={actions} item={item}>
                  <div className="w-12 h-12 text-lg rounded hover:bg-subMain hover:text-subMain flex-colo hover:bg-opacity-10">
                    <BiDotsVerticalRounded />
                  </div>
                </MenuSelect>
              </div>
            </div>
            {/* message */}
            <div className="mt-4 flex flex-col gap-3">
              <h4 className="text-sm font-medium">Message</h4>
              <p className="text-xs leading-5 text-textGray">
                {item.action.message}....
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-dry text-textGray rounded-xl border py-2 px-4 border-border">
                  {item.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Campaings;
