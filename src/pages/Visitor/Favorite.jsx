import VisitorLayout from "../../components/layout/visitor/Layout";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { fetchLikedFood } from "@/api/Food/fetchLikedFood";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, ThumbsUp } from "lucide-react";

export default function Favorite() {
  const [favoriteFoods, setFavoriteFoods] = useState([]);

  const getLikedFoods = async () => {
    try {
      const foodsData = await fetchLikedFood();
      setFavoriteFoods(foodsData.data);
      // console.log(foodsData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLikedFoods();
  }, []);

  return (
    <>
      <VisitorLayout>
        <div className="py-5 px-10">
          {/* <div className="flex justify-between">
            <div className="">
              <h1 className="text-3xl font-semibold">FAVORITES</h1>
            </div>
            <div className="">
              <Input className="" placeholder="Search" />
            </div>
          </div> */}
          <div className="flex justify-center items-center py-4">
            <h1 className="text-5xl font-semibold font-cursive">
              FAVORITES FOODS
            </h1>
          </div>
          <div className="grid items-center gap-4 py-5 sm:grid-cols-2 lg:grid-cols-4">
            {favoriteFoods.map((food) => (
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
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </CardTitle>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <ThumbsUp size={36} color="red" />
                    <span className="text-lg">{food.totalLikes}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Star size={36} color="yellow" />
                    <span className="text-lg">{food.rating}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </VisitorLayout>
    </>
  );
}
