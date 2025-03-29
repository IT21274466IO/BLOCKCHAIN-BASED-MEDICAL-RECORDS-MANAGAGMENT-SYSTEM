import React, { useEffect, useState } from 'react';
import { Checkbox } from './Form';

function Access({ setAccess }) {
  const thclass = 'text-start text-xs font-medium py-3 px-2 whitespace-nowrap';
  const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';
  const [parientAccess, setParientAccess] = useState({
    read: false,
    create: false,
    delete: false,
    edit: false,
  });
  const [appointmentAccess, setAppointmentAccess] = useState({
    read: false,
    create: false,
    delete: false,
    edit: false,
  });
  const [invoicesAccess, setInvoicesAccess] = useState({
    read: false,
    create: false,
    delete: false,
    edit: false,
  });
  const [paymentsAccess, setPaymentsAccess] = useState({
    read: false,
    create: false,
    delete: false,
    edit: false,
  });

  // on change patient
  const onChangePatient = (e) => {
    setParientAccess({ ...parientAccess, [e.target.name]: e.target.checked });
  };
  // on change appointment
  const onChangeAppointment = (e) => {
    setAppointmentAccess({
      ...appointmentAccess,
      [e.target.name]: e.target.checked,
    });
  };

  // on change invoices
  const onChangeInvoices = (e) => {
    setInvoicesAccess({ ...invoicesAccess, [e.target.name]: e.target.checked });
  };

  // on change payments
  const onChangePayments = (e) => {
    setPaymentsAccess({ ...paymentsAccess, [e.target.name]: e.target.checked });
  };

  const datas = [
    {
      id: 1,
      name: 'Parient',
      access: parientAccess,
      onChange: onChangePatient,
    },
    {
      id: 2,
      name: 'Appointment',
      access: appointmentAccess,
      onChange: onChangeAppointment,
    },
    {
      id: 3,
      name: 'Invoices',
      access: invoicesAccess,
      onChange: onChangeInvoices,
    },
    {
      id: 4,
      name: 'Payments',
      access: paymentsAccess,
      onChange: onChangePayments,
    },
  ];

  // send access to parent component
  useEffect(() => {
    setAccess({
      parientAccess,
      appointmentAccess,
      invoicesAccess,
      paymentsAccess,
    });
  }, [
    parientAccess,
    appointmentAccess,
    invoicesAccess,
    paymentsAccess,
    setAccess,
  ]);

  return (
    <div className="w-full">
      <h1 className="text-black text-sm mb-3">Access</h1>
      <div className="w-full overflow-x-scroll">
        <table className="table-auto w-full">
          <thead className="bg-dry rounded-md overflow-hidden">
            <tr>
              <th className={thclass}></th>
              <th className={thclass}>Read</th>
              <th className={thclass}>Edit</th>
              <th className={thclass}>Create</th>
              <th className={thclass}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border hover:bg-greyed transitions"
              >
                <td className={`font-light text-xs ${tdclass}`}>{item.name}</td>
                <td className={tdclass}>
                  <Checkbox
                    name="read"
                    checked={item.access.read}
                    onChange={item.onChange}
                  />
                </td>
                <td className={tdclass}>
                  <Checkbox
                    name="edit"
                    checked={item.access.edit}
                    onChange={item.onChange}
                  />
                </td>
                <td className={tdclass}>
                  <Checkbox
                    name="create"
                    checked={item.access.create}
                    onChange={item.onChange}
                  />
                </td>
                <td className={tdclass}>
                  <Checkbox
                    name="delete"
                    checked={item.access.delete}
                    onChange={item.onChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Access;
