import { BsBuildings, BsChevronDoubleUp } from "react-icons/bs";

const DashboardPage = () => {
  return (
    <section className="flex flex-wrap gap-2.5">
      <div className="bg-white rounded-xl px-6 py-5 text-neutral-700 flex flex-col gap-2.5">
        Active users (last 24 hours)
        <p className="text-2xl text-neutral-900 font-bold">
          886 <span className="text-base text-green-700">+16% (98)</span>
        </p>
      </div>
      <div className="bg-white rounded-xl px-6 py-5 text-neutral-700 flex flex-col gap-2.5">
        Rooms booked this month
        <p className="text-2xl text-neutral-900 font-bold">
          12,096 <span className="text-base text-red-500">-2% (126)</span>
        </p>
      </div>
      <div className="bg-white rounded-xl px-6 py-5 text-neutral-700 flex gap-2.5 items-center">
        <BsBuildings size={32} />
        <div className="flex flex-col gap-2.5">
          Number of hotels
          <p className="text-2xl text-neutral-900 font-bold">852</p>
        </div>
      </div>
      <div className="bg-white rounded-xl px-6 py-5 text-neutral-700 flex flex-col gap-2.5">
        Total earnings
        <p className="text-2xl text-neutral-900 font-bold">
          $125,045.92{" "}
          <span className="text-base text-green-700">+89% ($3,988)</span>
        </p>
      </div>
      <div className="bg-white rounded-xl px-6 py-5 text-neutral-700 flex flex-col gap-2.5">
        Pending member registrations
        <p className="text-2xl text-yellow-500 font-bold">11</p>
      </div>
      <div className="bg-white rounded-xl px-6 py-5 text-neutral-700 flex flex-col gap-2.5 w-1/5">
        <p>User statistics</p>
        <p className="text-sm">Weekly users</p>
        <p className="text-2xl text-neutral-900 font-bold">1,277</p>
        <p className="text-sm">Monthly users</p>
        <p className="text-2xl text-neutral-900 font-bold">13,642</p>
        <p className="text-sm">Trends</p>
        <BsChevronDoubleUp size={20} className="fill-green-700" />
      </div>
      <div className="bg-white rounded-xl px-6 py-5 text-neutral-700 flex flex-col gap-2.5 flex-1">
        <p>Top 5 popular hotels</p>
        <div className="flex justify-between text-neutral-500">
          <span>#</span>
          <span>Name</span>
          <span>Popularity</span>
        </div>
        <div className="flex justify-between text-neutral-900">
          <span>1</span>
          <span>Crazy? I was crazy once</span>
          <span>89%</span>
        </div>
        <div className="flex justify-between text-neutral-900">
          <span>2</span>
          <span>They lock me in a room</span>
          <span>84%</span>
        </div>
        <div className="flex justify-between text-neutral-900">
          <span>3</span>
          <span>A rubber room</span>
          <span>79%</span>
        </div>
        <div className="flex justify-between text-neutral-900">
          <span>4</span>
          <span>A rubber room with rats</span>
          <span>72%</span>
        </div>
        <div className="flex justify-between text-neutral-900">
          <span>5</span>
          <span>And rats make me crazy</span>
          <span>67%</span>
        </div>
      </div>
      <div className="bg-white rounded-xl px-6 py-5 text-neutral-700 flex flex-col gap-2.5">
        <p>User platform statistics</p>
        <div className="flex flex-grow justify-between">
          <div className="bg-gradient-to-b from-[#F56B6B] via-[#A86BF5] via-25% to-[#6B79F5] w-8 rounded" />
          <div className="flex flex-col text-sm gap-4 justify-center">
            <span className="flex items-center gap-2">
              <div className="rounded bg-[#F56B6B] w-4 h-4" /> Others
            </span>
            <span className="flex items-center gap-2">
              <div className="rounded bg-[#A86BF5] w-4 h-4" /> Web
            </span>
            <span className="flex items-center gap-2">
              <div className="rounded bg-[#6B79F5] w-4 h-4" /> Mobile
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
