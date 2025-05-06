import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { Button, Input, Select, Textarea } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { sortsDatas } from '../Datas';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

function AddEditMedicineModal({ closeModal, isOpen, datas }) {
  const [measures, setMeasures] = useState(sortsDatas.measure[0]);

  useEffect(() => {
    if (datas?.name) {
      setMeasures({
        id: datas.measure,
        name: datas.measure,
      });
    }
  }, [datas]);

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.name ? 'Edit Medicine' : 'New Medicine'}
      width={'max-w-3xl'}
    >
      <div className="flex-colo gap-6">
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input
            label="Medicine Name"
            color={true}
            placeholder={datas?.name && datas.name}
          />
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Measure</p>
            <Select
              selectedPerson={measures}
              setSelectedPerson={setMeasures}
              datas={sortsDatas.measure}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {measures?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input
            label="Price (LKR)"
            type="number"
            color={true}
            placeholder={datas?.price ? datas.price : 0}
          />
          <Input
            label="Instock"
            type="number"
            color={true}
            placeholder={datas?.stock ? datas.stock : 0}
          />
        </div>

        {/* des */}
        <Textarea
          label="Description"
          placeholder="Write description here..."
          color={true}
          rows={5}
        />
        {/* buttones */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            {datas?.name ? 'Discard' : 'Cancel'}
          </button>
          <Button
            label="Save"
            Icon={HiOutlineCheckCircle}
            onClick={() => {
              toast.error('This feature is not available yet');
            }}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddEditMedicineModal;
