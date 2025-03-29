import React from 'react';
import { Button, Input, Select, Textarea } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import Uploder from '../Uploader';
import { toast } from 'react-hot-toast';

const sendToData = [
  {
    id: 1,
    name: 'All Patients',
    value: 'all',
  },
  {
    id: 2,
    name: 'NHCF Patients',
    value: 'nhcf',
  },
  {
    id: 3,
    name: 'Britam Patients',
    value: 'britam',
  },
];

function EmailComp({ data }) {
  const [sendTo, setSendTo] = React.useState(sendToData[0].name);
  const [image, setImage] = React.useState(null);

  // useEffect
  React.useEffect(() => {
    if (data?.id) {
      setSendTo(data.sendTo);
      setImage(data.image);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-4 w-full mt-6">
      {/* title */}
      <Input
        label="Campaign Title"
        color={true}
        placeholder={data?.id && data?.title}
      />
      {/* send to */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col w-full gap-3">
          <p className="text-sm">Send To</p>
          <Select
            selectedPerson={sendTo}
            setSelectedPerson={setSendTo}
            datas={sendToData}
          >
            <div className="h-14 w-full text-xs text-main rounded-md bg-white border border-border px-4 flex items-center justify-between">
              <p>{sendTo}</p>
              <BiChevronDown className="text-xl" />
            </div>
          </Select>
        </div>
        {/* subject */}
        <Input
          label="Email subject"
          color={true}
          placeholder={data?.id && data?.action?.subject}
        />
      </div>
      {/* headers */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Header"
          color={true}
          placeholder={data?.id && data?.action?.header}
        />
        <Input
          label="Sub-header"
          color={true}
          placeholder={data?.id && data?.action?.subHeader}
        />
      </div>
      {/* message */}
      <Textarea
        label="Message"
        placeholder={
          data?.id ? data?.action?.message : 'Dear Delight patient ....'
        }
        color={true}
        rows={5}
      />

      {/* uploader */}
      <div className="flex gap-3 flex-col col-span-6">
        <p className="text-sm">Image (option)</p>
        <Uploder />
      </div>
      {/* button */}
      {!data?.id && (
        <Button
          label={'Send Campaign'}
          onClick={() => {
            toast.error('This feature is not available yet');
          }}
        />
      )}
    </div>
  );
}

export default EmailComp;
