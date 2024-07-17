import AdminLayout from "../../components/layout/admin/Layout";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import AddFood from "../../components/modal/AddFood";
import EditFood from "../../components/modal/EditFood";
import { fetchGetFood } from "@/api/Food/fetchGetFood";
import { fetchDelFood } from "@/api/Food/fetchDelFood";
import { Pencil, Trash2 } from "lucide-react";

export default function ManageFoods() {
  const [listFoods, setListFoods] = useState([]);
  const [editedFood, setEditedFood] = useState({
    name: "",
    description: "",
    ingredients: [],
    imageUrl: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const handleModalAdd = () => {
    setIsModalAddOpen(!isModalAddOpen);
  };

  const handleModalEdit = (foodData) => {
    setEditedFood(foodData);
    setIsModalEditOpen(!isModalEditOpen);
  };

  const handleDeleteFood = (id) => {
    Swal.fire({
      title: "Delete Food?",
      text: "You cannot change this action again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        fetchDelFood(id)
          .then((data) => {
            Swal.fire({
              title: "Food Deleted Successfully",
              text: data.message,
              icon: "success",
              confirmButtonText: "OK",
            });
            getFoods();
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              title: "Failed to Delete Food",
              text: error.message,
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  const getFoods = async () => {
    try {
      const foodsData = await fetchGetFood();
      setListFoods(foodsData.data);
      // console.log(foodsData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  const indexOfLastFood = currentPage * itemsPerPage;
  const indexOfFirstFood = indexOfLastFood - itemsPerPage;
  const currentFoods = listFoods.slice(indexOfFirstFood, indexOfLastFood);

  const totalPages = Math.ceil(listFoods.length / itemsPerPage);

  return (
    <div>
      <AdminLayout>
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-medium">Foods</h1>
          <Button onClick={handleModalAdd}>Add Food</Button>
        </div>
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Food Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead colSpan={3} className="text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentFoods.map((data, index) => (
              <TableRow key={data.id}>
                <TableCell>{indexOfFirstFood + index + 1}</TableCell>
                <TableCell>
                  <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="w-40 rounded-full"
                  />
                </TableCell>
                <TableCell>
                  {data.name
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </TableCell>
                <TableCell>
                  {data.description.charAt(0).toUpperCase() +
                    data.description.slice(1)}
                </TableCell>
                <TableCell className="">
                  <Pencil
                    className="h-5 w-5 mx-auto"
                    cursor={"pointer"}
                    onClick={() => handleModalEdit(data)}
                  />
                </TableCell>
                <TableCell className="">
                  <Trash2
                    className="h-5 w-5 mx-auto"
                    onClick={() => handleDeleteFood(data.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination className="flex justify-end mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                  className={page === currentPage ? "active" : "active"}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </AdminLayout>

      {/* Modal Add Food */}
      {isModalAddOpen && (
        <AddFood handleModalAdd={handleModalAdd} getFoods={getFoods} />
      )}
      {/* Modal Edit Food */}
      {isModalEditOpen && (
        <EditFood
          handleModalEdit={handleModalEdit}
          editedFood={editedFood}
          setEditedFood={setEditedFood}
          getFoods={getFoods}
        />
      )}
    </div>
  );
}
