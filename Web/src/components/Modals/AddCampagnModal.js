import React, { useEffect } from 'react';
import Modal from './Modal';
import { TbBrandWhatsapp } from 'react-icons/tb';
import { MdOutlineTextsms } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import EmailComp from '../Campaign/EmailComp';
import WhatsappComp from '../Campaign/Whatsapp';
import SmsComp from '../Campaign/SmsComp';

function CampaignModal({ closeModal, isOpen, data }) {
  const [indexs, setIndexs] = React.useState(0);

  // change tab
  const changeTab = (value) => {
    setIndexs(value);
  };

  const tabs = [
    {
      title: 'Email',
      value: 'email',
      icon: TbBrandWhatsapp,
    },
    {
      title: 'Whatsapp',
      value: 'whatsapp',
      icon: HiOutlineMail,
    },

    {
      title: 'SMS',
      value: 'sms',
      icon: MdOutlineTextsms,
    },
  ];

  // edit
  useEffect(() => {
    if (data?.id) {
      if (data?.type === 'email') {
        setIndexs(0);
      } else if (data?.type === 'whatsapp') {
        setIndexs(1);
      } else if (data?.type === 'sms') {
        setIndexs(2);
      }
    }
  }, [data]);

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={data?.id ? 'View Campaign' : 'Create Campaign'}
      width={'max-w-3xl'}
    >
      <div className="flex-colo gap-6">
        {/* radio */}
        {!data?.id && (
          <div className="grid sm:grid-cols-3 gap-4 w-full bg-dry rounded-md sm:rounded-full overflow-hidden">
            {tabs.map((item, index) => (
              <button
                onClick={() => changeTab(index)}
                key={index}
                className={`flex gap-4 items-center p-2 rounded-full 
              ${
                indexs === 0 && item.value === 'email'
                  ? 'bg-subMain text-white'
                  : indexs === 1 && item.value === 'whatsapp'
                  ? 'bg-subMain text-white'
                  : indexs === 2 && item.value === 'sms'
                  ? 'bg-subMain text-white'
                  : 'text-black'
              }`}
              >
                <div
                  className={`
              ${
                indexs === 0 && item.value === 'email'
                  ? 'bg-white text-black'
                  : indexs === 1 && item.value === 'whatsapp'
                  ? 'bg-white text-black'
                  : indexs === 2 && item.value === 'sms'
                  ? 'bg-white text-black'
                  : 'bg-white'
              } w-10 h-10 text-md rounded-full flex-colo`}
                >
                  <item.icon />
                </div>
                <h5 className="text-xs font-medium ">{item.title}</h5>
              </button>
            ))}
          </div>
        )}

        {/* compo */}
        {indexs === 0 && <EmailComp data={data} />}
        {indexs === 2 && <SmsComp data={data} />}
        {indexs === 1 && <WhatsappComp data={data} />}
      </div>
    </Modal>
  );
}

export default CampaignModal;
