/* eslint-disable react/prop-types */

import { fetchAddRating } from "@/api/Rating/fetchAddRating";
import { fetchGetRating } from "@/api/Rating/fetchGetRating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AddRating({ handleModalAddRating, id, renderStars }) {
  const [rating, setRating] = useState([]);
  const [form, setForm] = useState({
    rating: "",
    review: "",
  });

  const handleAddRatingChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "rating" ? parseFloat(value) : value,
    }));
  };

  const handleAddRatingSubmit = async (e) => {
    e.preventDefault();

    try {
      const ratingData = form;

      const response = await fetchAddRating({ id, ratingData });
      Swal.fire({
        title: "Food Rating Added",
        text: response.message,
        icon: "success",
        showConfirmButton: true,
      });
      handleModalAddRating();
      getRating();
      renderStars();
    } catch (error) {
      console.error(error);
    }
  };

  const getRating = async () => {
    try {
      const ratingData = await fetchGetRating(id);
      console.log(rating);
      setRating(ratingData.data);
      //   console.log(ratingData.data);
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
            onClick={handleModalAddRating}
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

        <div>
          <form action="" onSubmit={handleAddRatingSubmit}>
            <div className="mb-4">
              <Label htmlFor="name">
                Rating <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                id="rating"
                name="rating"
                className="mt-2"
                placeholder="Rating"
                required
                min="0"
                max="5"
                onChange={handleAddRatingChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="name">
                Review <span className="text-red-500">*</span>
              </Label>
              <Textarea
                type="text"
                id="review"
                name="review"
                className="mt-2"
                placeholder="Review"
                required
                onChange={handleAddRatingChange}
              />
            </div>
            <div className="flex justify-end gap-6">
              <Button variant="ghost" onClick={handleModalAddRating}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
