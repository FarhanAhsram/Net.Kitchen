import { useEffect, useState } from "react";
import { HandHeart, Star, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import VisitorLayout from "../../components/layout/visitor/Layout";
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

export default function Home() {
  const [listFoods, setListFoods] = useState([]);

  const getFoods = async () => {
    try {
      const foodsData = await fetchGetFood();
      setListFoods(foodsData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <>
      <VisitorLayout>
        <div className="min-h-screen">
          <div className="grid md:grid-cols-12 gap-2 bg-[#77E4C8] px-10 h-[600px]">
            <div className="col-span-7 flex flex-col gap-6 m-auto p-4">
              <h1 className="text-6xl font-bold text-center md:text-left">
                Lorem ipsum dolor sit amet.
              </h1>
              <p className="text-center text-2xl md:text-left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                quia dolorem et est quaerat magnam eius ea debitis quibusdam
                unde, similique quo mollitia distinctio obcaecati ab eum
                voluptate iste veniam! similique quo mollitia distinctio
                obcaecati ab eum voluptate iste veniam!
              </p>
              <div className="mx-auto md:mx-0">
                <Button className="text-xl p-8">Get Started</Button>
              </div>
            </div>
            <div className="hidden lg:block col-span-5 m-auto">
              <img
                src="/images/landing-1.png"
                alt="heroIcon"
                className="w-5/6 m-auto"
              />
            </div>
          </div>

          <div className="grid p-6 bg-[#248891D7] text-white h-[900px] md:h-[500px]">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-4 gap-4 m-auto">
                <Utensils size={108} />
                <p className="text-center text-lg">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Voluptate autem neque optio, numquam minima at pariatur!
                  Quibusdam ducimus voluptate eos!
                </p>
              </div>
              <div className="flex flex-col items-center p-4 gap-4 m-auto">
                <HandHeart size={108} />
                <p className="text-center text-lg">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Voluptate autem neque optio, numquam minima at pariatur!
                  Quibusdam ducimus voluptate eos!
                </p>
              </div>
              <div className="flex flex-col items-center p-4 gap-4 m-auto">
                <Star size={108} />
                <p className="text-center text-lg">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Voluptate autem neque optio, numquam minima at pariatur!
                  Quibusdam ducimus voluptate eos!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#166686] text-white px-16 pt-12 pb-20">
            <div className="flex flex-col text-center gap-8 pb-12">
              <h1 className="text-5xl font-bold">Foods</h1>
              <p className="text-2xl">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Laudantium cupiditate nisi quis quisquam cum illo aliquam
                voluptates eveniet blanditiis nam!
              </p>
            </div>
            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {listFoods.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/4"
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
          </div>
        </div>
      </VisitorLayout>
    </>
  );
}
