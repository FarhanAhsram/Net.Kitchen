import VisitorLayout from "../../components/layout/visitor/Layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddRating from "../../components/modal/AddRating";
import GetRating from "../../components/modal/GetRating";
import { fetchGetIdFood } from "@/api/Food/fetchGetIdFood";
import { fetchUnlikeFood } from "@/api/Like/fetchUnlikeFood";
import { fetchLikeFood } from "@/api/Like/fetchLikeFood";

export default function DetailFood() {
  const { id } = useParams();
  const [detailFood, setDetailFood] = useState({});

  const [liked, setLiked] = useState(false);

  const [isModalGetRatingOpen, setIsModalGetRatingOpen] = useState(false);
  const [isModalAddRatingOpen, setIsModalAddRatingOpen] = useState(false);

  const handleModalGetRating = () => {
    setIsModalGetRatingOpen(!isModalGetRatingOpen);
  };

  const handleModalAddRating = () => {
    setIsModalAddRatingOpen(!isModalAddRatingOpen);
  };

  const getFoods = async () => {
    try {
      const foodsData = await fetchGetIdFood(id);
      setDetailFood(foodsData.data);
      setLiked(foodsData.data.isLike);
      // console.log(foodsData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    const foodId = id;

    if (liked) {
      await fetchUnlikeFood({ foodId });
      getFoods();
    } else {
      await fetchLikeFood({ foodId });
      getFoods();
    }
    setLiked(!liked);
  };

  useEffect(() => {
    getFoods();
  }, [id]);

  // console.log(detailFood);

  return (
    <>
      <VisitorLayout>
        <div className="container p-7">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
            <div className="col-span-12 lg:col-span-5 flex justify-center items-center">
              <img
                src={detailFood.imageUrl}
                alt={detailFood.name}
                className="rounded-xl aspect-square w-full h-96"
              />
            </div>
            <div className="col-span-12 lg:col-span-7">
              <div>
                <h1 className="text-4xl font-semibold font-cursive">
                  {detailFood.name &&
                    detailFood.name
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                </h1>
                <div className="my-4">
                  <h1 className="text-xl font-medium">Description</h1>
                  <p className="text-lg">{detailFood.description}</p>
                </div>
              </div>
              <div className="">
                <p className="text-xl font-medium">Ingredients</p>
                <ul className="list-disc pl-5 text-md">
                  {detailFood.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              {/* <div className="grid grid-cols-2 my-4">
                <div className="flex items-center gap-4 text-2xl">
                  <ThumbsUp size={32} />
                  <span>{detailFood.totalLikes}</span>
                </div>
                <div className="flex items-center gap-4 text-2xl">
                  <Star size={32} />
                  <span>{detailFood.rating}</span>
                </div>
              </div> */}
              <div className="grid grid-cols-2 items-center">
                <ThumbsUp
                  fill={liked ? "red" : "none"}
                  size={52}
                  onClick={handleLike}
                  cursor={"pointer"}
                  className="my-5"
                />
                <div className="flex gap-2">
                  <Button onClick={handleModalGetRating}>See All Rating</Button>
                  <Button onClick={handleModalAddRating}>Add Rating</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VisitorLayout>

      {isModalGetRatingOpen && (
        <GetRating handleModalGetRating={handleModalGetRating} id={id} />
      )}
      {isModalAddRatingOpen && (
        <AddRating handleModalAddRating={handleModalAddRating} id={id} />
      )}
    </>
  );
}
