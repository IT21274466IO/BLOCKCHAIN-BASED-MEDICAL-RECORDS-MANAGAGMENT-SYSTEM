import React from 'react';
import Layout from '../../Layout';
import { patientTab } from '../../components/Datas';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import MedicalRecord from './MedicalRecord';
import AppointmentsUsed from '../../components/UsedComp/AppointmentsUsed';
import InvoiceUsed from '../../components/UsedComp/InvoiceUsed';
import PaymentsUsed from '../../components/UsedComp/PaymentUsed';
import PersonalInfo from '../../components/UsedComp/PersonalInfo';
import PatientImages from './PatientImages';
import HealthInfomation from './HealthInfomation';
import DentalChart from './DentalChart';

function PatientProfile() {
  const [activeTab, setActiveTab] = React.useState(1);

  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return <MedicalRecord />;
      case 2:
        return <AppointmentsUsed doctor={false} />;
      case 3:
        return <InvoiceUsed />;
      case 4:
        return <PaymentsUsed doctor={false} />;
      case 5:
        return <PatientImages />;
      case 6:
        return <DentalChart />;
      case 7:
        return <PersonalInfo titles={false} />;
      case 8:
        return <HealthInfomation />;
      default:
        return;
    }
  };

  return (
    <Layout>
      <div className="flex items-center gap-4">
        <Link
          to="/patients"
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-xl font-semibold">Lahiru Indusara</h1>
      </div>
      <div className=" grid grid-cols-12 gap-6 my-8 items-start">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
        >
          <img
            src="/images/layya.jpg"
            alt="setting"
            className="w-40 h-40 rounded-full object-cover border border-dashed border-subMain"
          />
          <div className="gap-2 flex-colo">
            <h2 className="text-sm font-semibold">Lahiru Indusara</h2>
            <p className="text-xs text-textGray">it20602000@my.sliit.lk</p>
            <p className="text-xs">+254 712 345 678</p>
          </div>
          {/* tabs */}
          <div className="flex-colo gap-3 px-2 xl:px-12 w-full">
            {patientTab.map((tab, index) => (
              <button
                onClick={() => setActiveTab(tab.id)}
                key={index}
                className={`
                ${
                  activeTab === tab.id
                    ? 'bg-text text-subMain'
                    : 'bg-dry text-main hover:bg-text hover:text-subMain'
                }
                text-xs gap-4 flex items-center w-full p-4 rounded`}
              >
                <tab.icon className="text-lg" /> {tab.title}
              </button>
            ))}
          </div>
        </div>
        {/* tab panel */}
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6"
        >
          {tabPanel()}
        </div>
      </div>
    </Layout>
  );
}

export default PatientProfile;
