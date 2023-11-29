import { AiFillStar } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";

const RatingFilter = () => {
  const [params, setParams] = useSearchParams();
  const rating = params.get("rating") ?? 0;

  return (
    <div>
      <h3 className="text-lg">Star rating</h3>
      <div className="flex">
        {[...Array(5)].map((_rating, index) => (
          <AiFillStar
            key={index}
            size={24}
            className={`${
              index + 1 <= +rating ? "fill-yellow-500" : "fill-neutral-500"
            } transition-colors duration-500`}
            onClick={() => {
              if (+rating != index + 1) {
                params.set("rating", (index + 1).toString());
                setParams(params, { replace: true });
              } else {
                params.delete("rating");
                setParams(params, { replace: true });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
