import React, { useState } from 'react';
import Modal from './Modal';
import { BiPlus } from 'react-icons/bi';
import PatientMedicineServiceModal from './PatientMedicineServiceModal';
import { Button, Input } from '../Form';

function AddItemModal({ closeModal, isOpen }) {
  const [open, setOpen] = useState(false);

  const summery = [
    {
      title: 'Service Name',
      value: 'Paracetamol',
      color: false,
    },
    {
      title: 'Item Price',
      value: `$ 5500`,
      color: false,
    },
    {
      title: 'Quantity',
      value: 6,
      color: false,
    },
    {
      title: 'Total',
      value: `$ 33000`,
      color: true,
    },
  ];

  return (
    <>
      {open && (
        <PatientMedicineServiceModal
          closeModal={() => setOpen(!open)}
          isOpen={open}
          patient={false}
        />
      )}
      <Modal
        closeModal={closeModal}
        isOpen={isOpen}
        title="Add Item"
        width={'max-w-xl'}
      >
        <div className="flex-colo gap-6">
          {/* title */}
          <div className="flex flex-col gap-4 w-full">
            <p className="text-black text-sm">Service</p>
            <button
              onClick={() => setOpen(!open)}
              className=" text-subMain flex-rows gap-2 rounded-lg border border-subMain border-dashed py-4 w-full text-sm"
            >
              <BiPlus /> Add Item
            </button>
          </div>
          {/* quantity */}
          <Input label="Quantity" color={true} type={'number'} />
          {/* summery */}
          <div className="flex flex-col gap-4 w-full">
            <p className="text-black text-sm">Summary</p>
            <div className="flex flex-col gap-4">
              {summery.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center"
                >
                  <p className="text-xs text-textGray">{item.title}</p>
                  <p
                    className={
                      item.color
                        ? 'text-xs text-subMain bg-subMain bg-opacity-10 font-semibold py-1 px-4 rounded-full'
                        : 'text-sm font-medium text-textGray'
                    }
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* button */}
          <Button onClick={closeModal} label="Add" Icon={BiPlus} />
        </div>
      </Modal>
    </>
  );
}

export default AddItemModal;
