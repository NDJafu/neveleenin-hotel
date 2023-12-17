import { useState } from "react";
import {
  IoCaretBackCircleOutline,
  IoCaretForwardCircleOutline,
} from "react-icons/io5";

const NumberInput = ({
  value,
  setValue,
}: {
  value: any;
  setValue: (value?: any) => void;
}) => {
  return (
    <div className="flex justify-between items-center w-1/3">
      <button
        onClick={() => {
          if (value == 0) return;
          setValue(value - 1);
        }}
      >
        <IoCaretBackCircleOutline size={32} />
      </button>
      {value}
      <button onClick={() => setValue(value + 1)}>
        <IoCaretForwardCircleOutline size={32} />
      </button>
    </div>
  );
};

const GuestOptions = ({
  value,
  setValue,
  close,
}: {
  value: any;
  setValue: (value?: any) => void;
  close: () => void;
}) => {
  const [rooms, setRooms] = useState(value.rooms);
  const [adults, setAdults] = useState(value.adults);
  const [childrens, setChildrens] = useState(value.childrens);

  function submitChanges() {
    if (rooms == 0 || adults == 0) {
      alert("Invalid selection!");
      return;
    }
    setValue({ rooms, adults, childrens });
    close();
  }

  return (
    <div className="flex flex-col gap-4 text-black text-lg">
      <div className="flex justify-between">
        <p>Room</p>
        <NumberInput value={rooms} setValue={setRooms} />
      </div>
      <div className="flex justify-between">
        <p>Adults</p>
        <NumberInput value={adults} setValue={setAdults} />
      </div>
      <div className="flex justify-between">
        <p>Childrens</p>
        <NumberInput value={childrens} setValue={setChildrens} />
      </div>
      <button
        className="w-fit self-end my-3 px-6 py-2 bg-blue-100 text-blue-900 rounded-full"
        onClick={submitChanges}
      >
        Done
      </button>
    </div>
  );
};

export default GuestOptions;
