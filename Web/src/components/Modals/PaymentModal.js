import React, { useState } from 'react';
import Modal from './Modal';
import { Button, Select } from '../Form';
import { sortsDatas } from '../Datas';
import { BiChevronDown } from 'react-icons/bi';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { toast } from 'react-hot-toast';

function PaymentModal({ closeModal, isOpen, slug }) {
  const [currency, setCurrency] = useState(sortsDatas.status[0]);
  const [payment, setPayment] = useState(sortsDatas.method[0]);
  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title="Generate Payment"
      width={'max-w-xl'}
    >
      <div className="flex-colo gap-6 pb-8 ">
        <div className="w-full">
          <p className="text-sm mb-3">Status</p>
          <Select
            selectedPerson={currency}
            setSelectedPerson={setCurrency}
            datas={sortsDatas?.status}
          >
            <div className="h-14 w-full text-xs text-main rounded-md border border-border px-4 flex items-center justify-between">
              <p>{currency?.name}</p>
              <BiChevronDown className="text-xl" />
            </div>
          </Select>
        </div>
        {/* card */}
        <div className="w-full">
          <p className="text-sm mb-3">Payment Method</p>
          <Select
            selectedPerson={payment}
            setSelectedPerson={setPayment}
            datas={sortsDatas?.method}
          >
            <div className="h-14 w-full text-xs text-main rounded-md border border-border px-4 flex items-center justify-between">
              <p>{payment?.name}</p>
              <BiChevronDown className="text-xl" />
            </div>
          </Select>
        </div>
        {/* button */}
        <Button
          label="Generate"
          Icon={CgSpinnerTwoAlt}
          onClick={() => {
            toast.error('This feature is not available yet');
          }}
        />
      </div>
    </Modal>
  );
}

export default PaymentModal;
