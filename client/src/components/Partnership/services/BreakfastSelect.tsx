import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import {
  addService,
  removeService,
} from "../../../features/partnership/partnershipSlice";

const BreakfastSelect = () => {
  const dispatch = useAppDispatch();
  const services = useAppSelector((state) => state.partnership.services);

  return (
    <div className="w-4/5 bg-white text-black/70 flex flex-col p-4 gap-4 rounded-xl text-neutral-500">
      <h2 className="text-xl text-neutral-700">Breakfast</h2>
      <label>Is breakfast available to guests?</label>
      <select
        className="px-6 py-3 border border-neutral-300 rounded-lg outline-none w-1/2 text-neutral-700"
        value={services.includes("657dcde5b7656691f01f51b6") ? "yes" : "no"}
        onChange={(e) => {
          if (e.target.value == "yes") {
            dispatch(addService("657dcde5b7656691f01f51b6"));
          } else {
            dispatch(removeService("657dcde5b7656691f01f51b6"));
          }
        }}
      >
        <option value={"no"}>No</option>
        <option value={"yes"}>Yes</option>
      </select>
    </div>
  );
};

export default BreakfastSelect;
