import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/admin/Layout";
import { fetchGetFood } from "@/api/Food/fetchGetFood";
import { fetchGetUser } from "@/api/User/fetchGetUser";

export default function Dashboard() {
  const [listFoods, setListFoods] = useState([]);
  const [listUsers, setListUsers] = useState([]);

  const getFoods = async () => {
    try {
      const foodsData = await fetchGetFood();
      setListFoods(foodsData.data);
      // console.log(foodsData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const usersData = await fetchGetUser();
      setListUsers(usersData.data);
      // console.log(foodsData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFoods();
    getUsers();
  }, []);

  return (
    <>
      <AdminLayout>
        <div className="grid grid-cols-2 items-center gap-4 max-md:grid-cols-1">
          <div className="border rounded-lg bg-gray-200 h-[400px] p-10">
            <div className="flex justify-center items-center mb-20">
              <h1 className="text-6xl font-semibold">Total Users</h1>
            </div>
            <div className="flex justify-center items-center">
              <h1 className="text-9xl">{listUsers.length}</h1>
            </div>
          </div>
          <div className="border rounded-lg bg-gray-200 h-[400px] p-10">
            <div className="flex justify-center items-center mb-20">
              <h1 className="text-6xl font-semibold">Total Foods</h1>
            </div>
            <div className="flex justify-center items-center">
              <h1 className="text-9xl">{listFoods.length}</h1>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
