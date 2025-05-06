import React from 'react';
import { InvoiceUsedTable } from '../Tables';
import { useNavigate } from 'react-router-dom';
import { invoicesData } from '../Datas';

function InvoiceUsed() {
  const navigate = useNavigate();
  // preview
  const preview = (id) => {
    navigate(`/invoices/preview/${id}`);
  };
  return (
    <div className="w-full">
      <h1 className="text-sm font-medium mb-6">Invoices</h1>
      <div className="w-full overflow-x-scroll">
        <InvoiceUsedTable
          data={invoicesData}
          functions={{
            preview: preview,
          }}
        />
      </div>
    </div>
  );
}

export default InvoiceUsed;
