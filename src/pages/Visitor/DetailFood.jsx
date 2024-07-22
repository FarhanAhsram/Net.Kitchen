import VisitorLayout from "../../components/layout/visitor/Layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, StarHalf, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddRating from "../../components/modal/AddRating";
import GetRating from "../../components/modal/GetRating";
import { fetchGetIdFood } from "@/api/Food/fetchGetIdFood";
import { fetchUnlikeFood } from "@/api/Like/fetchUnlikeFood";
import { fetchLikeFood } from "@/api/Like/fetchLikeFood";
import Loading from "@/components/Loading";

export default function DetailFood() {
  const { id } = useParams();
  const [detailFood, setDetailFood] = useState({});
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
      const foodsData = await fetchGetIdFood(id);
      setDetailFood(foodsData.data);
      setLiked(foodsData.data.isLike);
      // console.log(foodsData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <Star key={index} fill="yellow" size={32} />
          ))}
        {halfStar && <StarHalf fill="yellow" size={32} />}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <Star key={index + fullStars + 1} fill="none" size={32} />
          ))}
      </>
    );
  };

  return (
    <>
      <VisitorLayout>
        <div className="container p-7">
          {isLoading ? (
            <div className="mt-48">
              <Loading />
            </div>
          ) : (
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
                  <div className="flex justify-between">
                    <h1 className="text-4xl font-semibold font-cursive">
                      {detailFood.name &&
                        detailFood.name
                          .toLowerCase()
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                    </h1>
                    <div className="flex items-center gap-2 py-2">
                      {renderStars(detailFood.rating)}
                    </div>
                  </div>
                  <div className="my-4">
                    <h1 className="text-2xl font-medium">Description</h1>
                    <p className="text-lg">{detailFood.description}</p>
                  </div>
                </div>
                <div className="">
                  <p className="text-2xl font-medium">Ingredients</p>
                  <ul className="list-disc pl-5 text-md">
                    {detailFood.ingredients?.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center mt-10">
                  <ThumbsUp
                    fill={liked ? "red" : "none"}
                    size={52}
                    onClick={handleLike}
                    cursor={"pointer"}
                    className="my-5"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleModalGetRating}>
                      See All Rating
                    </Button>
                    <Button onClick={handleModalAddRating}>Add Rating</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </VisitorLayout>

      {isModalGetRatingOpen && (
        <GetRating handleModalGetRating={handleModalGetRating} id={id} />
      )}
      {isModalAddRatingOpen && (
        <AddRating
          handleModalAddRating={handleModalAddRating}
          id={id}
          renderStars={renderStars}
        />
      )}
    </>
  );
}
