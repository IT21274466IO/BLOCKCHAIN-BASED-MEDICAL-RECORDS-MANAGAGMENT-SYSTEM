import React, { useState } from 'react';
import Modal from './Modal';
import { shareData } from '../Datas';
import { RadioGroup } from '@headlessui/react';
import { Button } from '../Form';
import { toast } from 'react-hot-toast';

function ShareModal({ closeModal, isOpen }) {
  const [selected, setSelected] = useState();
  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title="Share with patient via"
      width={'max-w-xl'}
    >
      <div className="flex-colo gap-6">
        {/* data */}
        <div className="w-full">
          <RadioGroup value={selected} onChange={setSelected}>
            <div className="space-y-2">
              {shareData.map((user) => (
                <RadioGroup.Option
                  key={user.id}
                  value={user}
                  className={({ active, checked }) =>
                    `
                    ${active ? 'border-subMain bg-subMain text-white' : ''}
                    rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white`
                  }
                >
                  {({ active, checked }) => (
                    <div className="flex  gap-6 items-center">
                      <div className="w-12 h-12 bg-text rounded-full flex-colo">
                        <user.icon className="text-subMain text-xl" />
                      </div>
                      <div>
                        <h6 className="text-sm">{user.title}</h6>
                        <p
                          className={`${
                            active && 'text-white'
                          } text-xs group-hover:text-white text-textGray mt-1`}
                        >
                          {user.description}
                        </p>
                      </div>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        {/* button */}

        <Button
          onClick={() => {
            toast.error('This feature is not available yet');
            closeModal();
          }}
          label="Send"
        />
      </div>
    </Modal>
  );
}

export default ShareModal;
