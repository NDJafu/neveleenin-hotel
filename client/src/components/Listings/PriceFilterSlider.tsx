import { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import "./slider.css";
import { useDebounce } from "../../utils/hooks";
import { useSearchParams } from "react-router-dom";

interface PriceButtonProps {
  onClick: () => void;
  text: string;
  active: boolean;
}

const PriceSetButton = ({ onClick, text, active }: PriceButtonProps) => {
  return (
    <button
      className={`${
        active ? "bg-blue-700 text-white" : "bg-black/5"
      } px-2 py-1 rounded-full`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const PriceFilterSlider = () => {
  const [params, setParams] = useSearchParams();
  const min = params.get("from") ?? 0;
  const max = params.get("to") ?? 500;
  const [priceFilter, setPriceFilter] = useState([+min, +max]);
  const debouncedPriceFilter = useDebounce(priceFilter);

  function offset(value: number) {
    return (value / 2000) * 208 - 18 - (14 * value) / 2000;
  }

  const isSamePrice = (range: number[]) => {
    return priceFilter[0] == range[0] && priceFilter[1] == range[1];
  };

  useEffect(() => {
    if (priceFilter[0] == 0) {
      params.delete("from");
      setParams(params, { replace: true });
      params.set("to", priceFilter[1].toString());
      setParams(params, { replace: true });
    } else {
      params.set("from", priceFilter[0].toString());
      setParams(params, { replace: true });
      params.set("to", priceFilter[1].toString());
      setParams(params, { replace: true });
    }
  }, [debouncedPriceFilter]);

  return (
    <>
      <h3 className="text-lg">Price range</h3>
      <div className="flex flex-col gap-4 px-4">
        <div className="flex text-white relative h-6">
          <div
            className={`${
              priceFilter[1] < 550 ? "hidden" : ""
            } bg-blue-700 text-center absolute p-0.5 w-12 rounded`}
            style={{ left: `${offset(priceFilter[0])}px` }}
          >
            {priceFilter[0]}
          </div>
          <div
            className={`${
              priceFilter[0] > 1450 ? "hidden" : ""
            } bg-blue-700 text-center absolute p-0.5 w-12 rounded`}
            style={{ left: `${offset(priceFilter[1])}px` }}
          >
            {priceFilter[1]}
          </div>
        </div>
        <ReactSlider
          className="slider bg-blue-100 h-1 flex items-center rounded-full"
          min={0}
          max={2000}
          step={50}
          value={priceFilter}
          onChange={setPriceFilter}
          thumbClassName="bg-white w-4 h-4 rounded-full outline-none drop-shadow cursor-grab"
          minDistance={200}
        />
        <div className="text-black/20">
          <div className="flex justify-between px-2">
            {[...Array(11)].map((_value, index) => (
              <div key={index} className="h-1.5 w-0.5 bg-black/20"></div>
            ))}
          </div>
          <div className="flex justify-between px-1">
            <span>0$</span>
            <span>2000$</span>
          </div>
        </div>
      </div>
      <div className="flex text-neutral-500 flex-wrap gap-2">
        <PriceSetButton
          active={isSamePrice([0, 200])}
          onClick={() => setPriceFilter([0, 200])}
          text="Under 200$"
        />
        <PriceSetButton
          active={isSamePrice([0, 450])}
          onClick={() => setPriceFilter([0, 450])}
          text="Under 450$"
        />
        <PriceSetButton
          active={isSamePrice([450, 1200])}
          onClick={() => setPriceFilter([450, 1200])}
          text="450$ - 1200$"
        />
        <PriceSetButton
          active={isSamePrice([1200, 2000])}
          onClick={() => setPriceFilter([1200, 2000])}
          text="Above 1200$"
        />
      </div>
    </>
  );
};

export default PriceFilterSlider;
