import React from 'react';
import AppointmentList from '../components/AppointmentList';
import { ToastContainer } from 'react-toastify';

export default function Appointments() {
  return (
    <div className=" space-y-20">
      <AppointmentList />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}