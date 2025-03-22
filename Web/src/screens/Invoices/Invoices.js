import React from 'react';
import Layout from '../../Layout';
import { Button } from '../../components/Form';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { InvoiceTable } from '../../components/Tables';
import { invoicesData } from '../../components/Datas';
import { BiPlus } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function Invoices() {
  return (
    <Layout>
      {/* add button */}
      <Link
        to="/invoices/create"
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </Link>
      {/*  */}
      <h1 className="text-xl font-semibold">Invoices</h1>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        {/* datas */}

        <div className="grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 gap-2">
          <div className="md:col-span-5 grid lg:grid-cols-4 items-center gap-6">
            <input
              type="text"
              placeholder='Search "patient name"'
              className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
            />
          </div>

          {/* export */}
          <Button
            label="Export"
            Icon={MdOutlineCloudDownload}
            onClick={() => {
              toast.error('Exporting is not available yet');
            }}
          />
        </div>
        <div className="mt-8 w-full overflow-x-scroll">
          <InvoiceTable data={invoicesData} />
        </div>
      </div>
    </Layout>
  );
}

export default Invoices;
