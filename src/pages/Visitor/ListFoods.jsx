import VisitorLayout from "../../components/layout/visitor/Layout";
import { fetchGetFood } from "@/api/Food/fetchGetFood";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, ThumbsUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/Loading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ListFoods() {
  const [listFoods, setListFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("id");
  const [searchFood, setSearchFood] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);

  const getFoods = async () => {
    try {
      setIsLoading(true);
      const foodsData = await fetchGetFood();
      setListFoods(foodsData.data);
      setFilteredFoods(foodsData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  useEffect(() => {
    handleFilterAndSort();
  }, [listFoods, searchFood, sortBy]);

  const handleFilterAndSort = () => {
    let filtered = listFoods.filter((food) =>
      food.name.toLowerCase().includes(searchFood)
    );

    if (sortBy === "totalLikes") {
      filtered = filtered.sort((a, b) => b.totalLikes - a.totalLikes);
    } else if (sortBy === "rating") {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredFoods(filtered);
  };

  const handleSearch = (e) => {
    setSearchFood(e.target.value.toLowerCase());
  };

  return (
    <>
      <VisitorLayout>
        <div className="py-5 px-10">
          <div className="grid items-center gap-6 pt-4 pb-2">
            <h1 className="text-5xl text-center font-semibold font-cursive">
              LIST FOODS
            </h1>
            <div className="flex gap-2">
              <Input
                className="w-3/4"
                placeholder="Search food by entering its name..."
                value={searchFood}
                onChange={handleSearch}
              />
              <Select
                onValueChange={(value) => setSortBy(value)}
                value={sortBy}
              >
                <SelectTrigger className="w-1/4">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">None</SelectItem>
                  <SelectItem value="totalLikes">Most Liked</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {isLoading ? (
            <div className="mt-32">
              <Loading />
            </div>
          ) : (
            <div className="grid items-center gap-4 py-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredFoods.map((food) => (
                <Link key={food.id} to={`/detailfood/${food.id}`}>
                  <Card className="hover:shadow-2xl">
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
