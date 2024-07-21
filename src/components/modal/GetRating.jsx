/* eslint-disable react/prop-types */

import { fetchGetRating } from "@/api/Rating/fetchGetRating";
import { useEffect, useState } from "react";

export default function GetRating({ handleModalGetRating, id }) {
  const [rating, setRating] = useState([]);

  const getRating = async () => {
    try {
      const ratingData = await fetchGetRating(id);
      setRating(ratingData.data);
      console.log(ratingData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRating();
  }, []);

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-[#22252EAD] opacity-100 z-10">
      <div className="bg-[#FFFFFF] w-1/2 rounded-2xl p-7 max-md:w-3/4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Rating and Review</h1>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            cursor={"pointer"}
            onClick={handleModalGetRating}
          >
            <path
              d="M12.657 1.34333L1.34326 12.657M12.657 12.657L1.34326 1.34326"
              stroke="#26355D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <hr className="border-2 border-[#EDEEEF] my-4" />

        <div className="">
          {rating.map((getRate) => (
            <div key={getRate.id} className="rounded-xl bg-white pb-4">
              <h1 className="font-bold text-lg">{getRate.user.name}</h1>
              <h1>Rating: {getRate.rating}</h1>
              <h1>Review: {getRate.review}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
