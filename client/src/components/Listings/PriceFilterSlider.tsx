import { useEffect, useState } from "react";
import { SetURLSearchParams } from "react-router-dom";
import ReactSlider from "react-slider";
import "./slider.css";
import { useDebounce } from "../../utils/hooks";

interface PriceButtonProps {
  onClick: () => void;
  text: string;
}

const PriceSetButton = ({ onClick, text }: PriceButtonProps) => {
  return (
    <button className="bg-black/5 px-2 py-1 rounded-full" onClick={onClick}>
      {text}
    </button>
  );
};

interface SearchParamsProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

const PriceFilterSlider = ({
  searchParams,
  setSearchParams,
}: SearchParamsProps) => {
  const min = searchParams.get("from") ?? 200;
  const max = searchParams.get("to") ?? 750;
  const [priceFilter, setPriceFilter] = useState([+min, +max]);
  const debouncedPriceFilter = useDebounce(priceFilter);

  function offset(value: number) {
    return (value / 2000) * 208 - 18 - (14 * value) / 2000;
  }

  useEffect(() => {
    console.log("set price");
    setSearchParams((previous) => {
      previous.set("from", priceFilter[0].toString());
      previous.set("to", priceFilter[1].toString());
      console.log(...previous);
      return previous;
    });
  }, [debouncedPriceFilter, searchParams]);

  return (
    <>
      <h3 className="text-lg">Price range</h3>
      <div className="flex flex-col gap-4 px-4">
        <div className="flex text-white relative h-6">
          <div
            className="bg-blue-700 text-center absolute p-0.5 w-12 rounded"
            style={{ left: `${offset(priceFilter[0])}px` }}
          >
            {priceFilter[0]}
          </div>
          <div
            className="bg-blue-700 text-center absolute p-0.5 w-12 rounded"
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
          minDistance={550}
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
          onClick={() => setPriceFilter([0, 200])}
          text="Under 200$"
        />
        <PriceSetButton
          onClick={() => setPriceFilter([0, 450])}
          text="Under 450$"
        />
        <PriceSetButton
          onClick={() => setPriceFilter([450, 1200])}
          text="450$ - 1200$"
        />
        <PriceSetButton
          onClick={() => setPriceFilter([1200, 2000])}
          text="Above 1200$"
        />
      </div>
    </>
  );
};

export default PriceFilterSlider;
