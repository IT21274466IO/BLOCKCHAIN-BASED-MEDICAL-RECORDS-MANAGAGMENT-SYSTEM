import React, { useState } from 'react';
import Modal from './Modal';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import PatientMedicineServiceModal from './PatientMedicineServiceModal';
import { Button, Checkbox, Input, Select } from '../Form';
import { sortsDatas } from '../Datas';

function MedicineDosageModal({ closeModal, isOpen }) {
  const [open, setOpen] = useState(false);
  const [instraction, setInstraction] = useState(sortsDatas.instractions[0]);
  const [dosage, setDosage] = useState(
    sortsDatas.dosage.map((item) => {
      return {
        name: item.value,
        checked: false,
      };
    })
  );
  // on change dosage
  const onChangeDosage = (e) => {
    const { name, checked } = e.target;
    const newDosage = dosage.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          checked: checked,
        };
      }
      return item;
    });
    setDosage(newDosage);
  };

  const summery = [
    {
      title: 'Service Name',
      value: 'Paracetamol',
      color: false,
    },
    {
      title: 'Item Price',
      value: `$5500`,
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
            <p className="text-black text-sm">Choose Medicine</p>
            <button
              onClick={() => setOpen(!open)}
              className=" text-subMain flex-rows gap-2 rounded-lg border border-subMain border-dashed py-4 w-full text-sm"
            >
              <BiPlus /> Add Item
            </button>
          </div>
          {/* quantity */}
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Instruction</p>
            <Select
              selectedPerson={instraction}
              setSelectedPerson={setInstraction}
              datas={sortsDatas.instractions}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {instraction.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          <Input label="Quantity" color={true} type={'number'} />
          {/* dosage */}
          <Input label="Dosage Quantity" color={true} type={'number'} />
          <div className="flex w-full flex-col gap-4">
            <p className="text-black text-sm">Dosage</p>
            <div className="grid xs:grid-cols-3 gap-6 pb-6">
              {sortsDatas?.dosage?.map((item) => (
                <Checkbox
                  label={item.name}
                  checked={dosage?.find((i) => i.name === item.value)?.checked}
                  onChange={onChangeDosage}
                  name={item.value}
                  key={item.id}
                />
              ))}
            </div>
          </div>

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

export default MedicineDosageModal;
