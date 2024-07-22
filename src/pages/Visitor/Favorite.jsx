import VisitorLayout from "../../components/layout/visitor/Layout";
import { useEffect, useState } from "react";
import { fetchLikedFood } from "@/api/Food/fetchLikedFood";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, ThumbsUp } from "lucide-react";
import Loading from "@/components/Loading";
import { Link } from "react-router-dom";

export default function Favorite() {
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getLikedFoods = async () => {
    try {
      setIsLoading(true);
      const foodsData = await fetchLikedFood();
      setFavoriteFoods(foodsData.data);
      // console.log(foodsData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLikedFoods();
  }, []);

  return (
    <>
      <VisitorLayout>
        <div className="py-5 px-10">
          <div className="flex justify-center items-center py-4">
            <h1 className="text-5xl font-semibold font-cursive">
              FAVORITES FOODS
            </h1>
          </div>
          {isLoading ? (
            <div className="mt-32">
              <Loading />
            </div>
          ) : (
            <div className="grid items-center gap-4 py-5 sm:grid-cols-2 lg:grid-cols-4">
              {favoriteFoods.map((food) => (
                <Link key={food.id} to={`/detailfood/${food.id}`}>
                  <Card className="hover:shadow-2xl" key={food.id}>
                    <CardHeader className="flex justify-center items-center">
                      <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="rounded-xl aspect-square w-full"
                      />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <CardTitle>
                        {food.name
                          .toLowerCase()
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </CardTitle>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex gap-3 items-center font-cursive">
                        <ThumbsUp size={36} fill="red" />
                        <span className="text-4xl">{food.totalLikes}</span>
                      </div>
                      <div className="flex gap-3 items-center font-cursive">
                        <Star size={40} fill="yellow" />
                        <span className="text-4xl">{food.rating}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </VisitorLayout>
    </>
  );
}
