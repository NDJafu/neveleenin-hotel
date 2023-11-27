import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { SetURLSearchParams } from "react-router-dom";

interface SearchParamsProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

const RatingFilter = ({ searchParams, setSearchParams }: SearchParamsProps) => {
  const defaultRating = searchParams.get("rating") ?? 0;
  const [ratingFilter, setRatingFilter] = useState(+defaultRating);

  useEffect(() => {
    setSearchParams((previous) => {
      previous.set("rating", ratingFilter.toString());
      return previous;
    });
  }, [ratingFilter, searchParams]);

  return (
    <div>
      <h3 className="text-lg">Star rating</h3>
      <div className="flex">
        {[...Array(5)].map((_rating, index) => (
          <AiFillStar
            key={index}
            size={24}
            className={
              index + 1 <= ratingFilter ? "fill-yellow-500" : "fill-neutral-500"
            }
            onClick={() =>
              setRatingFilter(ratingFilter != index + 1 ? index + 1 : 0)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
