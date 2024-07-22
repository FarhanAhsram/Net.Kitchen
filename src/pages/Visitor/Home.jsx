import VisitorLayout from "../../components/layout/visitor/Layout";
import { useEffect, useState } from "react";
import { Star, ThumbsUp, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { fetchGetFood } from "@/api/Food/fetchGetFood";
import { Link } from "react-router-dom";
import Loading from "@/components/Loading";

export default function Home() {
  const [listFoods, setListFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFoods = async () => {
    try {
      setIsLoading(true);
      const foodsData = await fetchGetFood();
      setListFoods(foodsData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <>
      <VisitorLayout>
        <div className="min-h-screen">
          <div className="grid md:grid-cols-12 gap-2 bg-[#77E4C8] p-10 h-fit lg:py-0">
            <div className="col-span-7 flex flex-col gap-10 m-auto p-4">
              <h1 className="text-6xl text-center font-cursive md:text-left">
                Discover Delicious Delights
              </h1>
              <p className="text-center text-2xl md:text-left">
                Explore our wide variety of delicious foods, each crafted with
                care and passion. Whether you&apos;re in the mood for something
                savory or sweet, our catalog has something for everyone. Dive in
                and find your new favorite dish today!
              </p>
              <div className="mx-auto md:mx-0">
                <Link to="/listfoods">
                  <Button className="text-xl p-8">Get Started</Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block col-span-5 m-auto">
              <img src="/images/Hero1.webp" alt="heroIcon" className="m-auto" />
            </div>
          </div>

          <div className="grid p-8 bg-[#248891D7] text-white h-fit lg:py-24 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-4 gap-8 m-auto">
                <Utensils size={108} />
                <p className="text-center text-xl">
                  Our culinary experts curate only the finest dishes, ensuring
                  that each bite is an experience to remember. Discover the joy
                  of eating well with our extensive selection.
                </p>
              </div>
              <div className="flex flex-col items-center p-4 gap-8 m-auto">
                <ThumbsUp size={108} />
                <p className="text-center text-xl">
                  Mark your favorite dishes with a thumbs up and easily find
                  them all in one place. Our system lets you keep track of the
                  meals you love, so you can enjoy them again and again.
                </p>
              </div>
              <div className="flex flex-col items-center p-4 gap-8 m-auto">
                <Star size={108} fill="white" className="half-filled" />
                <p className="text-center text-xl">
                  Rate and review your favorite dishes, and see what others have
                  to say. Our platform lets you share your thoughts and browse
                  through the history of reviews from fellow food lovers.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#166686] text-white px-16 pt-12 pb-20 h-fit">
            <div className="flex flex-col text-center gap-8 pb-12">
              <h1 className="text-5xl font-bold">Explore Our Menu</h1>
              <p className="text-2xl">
                Dive into our catalog and discover a world of flavors. From
                appetizers to desserts, we have everything you need to satisfy
                your cravings. Bon appétit!
              </p>
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                  {listFoods.map((item, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/5"
                    >
                      <Link to={`/detailfood/${item.id}`}>
                        <Card className="flex justify-center items-center">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="rounded-lg aspect-square w-full"
                          />
                        </Card>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
          </div>
        </div>
      </VisitorLayout>
    </>
  );
}
