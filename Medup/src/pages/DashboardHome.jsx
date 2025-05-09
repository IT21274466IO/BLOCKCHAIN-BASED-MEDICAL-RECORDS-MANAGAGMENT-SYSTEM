import {
  BsArrowDownLeft,
  BsArrowDownRight,
  BsArrowUpRight,
  BsCheckCircleFill,
  BsClockFill,
  BsXCircleFill,
} from "react-icons/bs";
import { DashboardBigChart, DashboardSmallChart } from "../components/Charts";
import {
  appointmentsData,
  dashboardCards,
  memberData,
  transactionData,
} from "../components/Datas";
import { Transactiontable } from "../components/Tables";
import { Link } from "react-router-dom";

export default function DashboardHome() {
  return (
    <>
      {/* boxes */}
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dashboardCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-md bg-opacity-10 ${card.color[1]} ${card.color[0]}`}
              >
                <card.icon />
              </div>
              <h2 className="text-sm font-semibold text-gray-700">
                {card.title}
              </h2>
            </div>
            <div className="grid grid-cols-8 gap-4 mt-4 bg-gray-50 py-5 px-6 rounded-lg">
              <div className="col-span-5">
                <DashboardSmallChart data={card.datas} colors={card.color[2]} />
              </div>
              <div className="col-span-3 flex flex-col justify-center">
                <h4 className="text-lg font-semibold text-gray-800">
                  {card.value} {card.id === 4 ? "$" : "+"}
                </h4>
                <p
                  className={`text-sm flex items-center gap-2 ${card.color[1]}`}
                >
                  {card.percent > 50 && <BsArrowUpRight />}
                  {card.percent > 30 && card.percent < 50 && (
                    <BsArrowDownRight />
                  )}
                  {card.percent < 30 && <BsArrowDownLeft />}
                  {card.percent}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* charts and recent data */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-8 gap-6 my-6">
        {/* Charts */}
        <div className="xl:col-span-6 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-gray-700">
                Earning Reports
              </h2>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                5.44%{" "}
                <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-xl">
                  +2.4%
                </span>
              </p>
            </div>
            <div className="mt-4">
              <DashboardBigChart />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-gray-700">
                Recent Transactions
              </h2>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                Today{" "}
                <span className="px-2 py-1 bg-[#14919B] text-white text-xs rounded-xl">
                  LKR 270000
                </span>
              </p>
            </div>
            <div className="mt-4 overflow-x-auto">
              <Transactiontable
                data={transactionData.slice(0, 5)}
                action={false}
              />
            </div>
          </div>
        </div>

        {/* right side panel */}
        {/* Side panel */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
              Recent Patients
            </h2>
            {memberData.slice(3, 8).map((member) => (
              <Link
                key={member.id}
                to={`/patients/preview/${member.id}`}
                className="flex justify-between items-center gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 rounded-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={member.image}
                    alt="member"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="text-xs font-semibold text-gray-800">
                      {member.title}
                    </h3>
                    <p className="text-xs text-gray-500">{member.phone}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400">2:00 PM</p>
              </Link>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm xl:mt-6">
            <h2 className="text-sm mb-4 font-medium">Today Appointments</h2>
            {appointmentsData.map((appointment) => (
              <div
                key={appointment.id}
                className="grid grid-cols-12 gap-2 items-center"
              >
                <p className="text-gray-500 text-[12px] col-span-3 font-light">
                  {appointment.time}
                </p>
                <div className="flex-colo relative col-span-2">
                  <hr className="w-[2px] h-20 bg-gray-300" />
                  <div
                    className={`w-5 h-5 flex-colo text-sm bg-opacity-10
                   ${
                     appointment.status === 'Pending' &&
                     'bg-white text-orange-500'
                   }
                  ${
                    appointment.status === 'Cancel' && 'bg-white text-red-500'
                  }
                  ${
                    appointment.status === 'Approved' &&
                    'bg-white text-green-500'
                  }
                   rounded-full absolute top-1/2 left-1/10 transform -translate-x-1/2 -translate-y-1/2`}
                  >
                    {appointment.status === 'Pending' && <BsClockFill />}
                    {appointment.status === 'Cancel' && <BsXCircleFill />}
                    {appointment.status === 'Approved' && <BsCheckCircleFill />}
                  </div>
                </div>
                <Link
                  to="/appointments"
                  className="flex flex-col gap-1 col-span-6"
                >
                  <h2 className="text-xs font-medium">
                    {appointment.user?.title}
                  </h2>
                  <p className="text-[12px] font-light text-textGray">
                    {appointment.from} - {appointment.to}
                  </p>
                </Link>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </>
  );
}
