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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AdminLayout from "../../components/layout/admin/Layout";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddFood from "../../components/modal/AddFood";
import EditFood from "../../components/modal/EditFood";
import { fetchGetFood } from "@/api/Food/fetchGetFood";
import { fetchDelFood } from "@/api/Food/fetchDelFood";
import Loading from "@/components/Loading";

export default function ManageFoods() {
  const [listFoods, setListFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [editedFood, setEditedFood] = useState({
    name: "",
    description: "",
    ingredients: [],
    imageUrl: null,
  });
  const [searchFood, setSearchFood] = useState("");
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      setFilteredFoods(foodsData.data);
      // console.log(foodsData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchFood(searchValue);
    setFilteredFoods(
      listFoods.filter((food) => food.name.toLowerCase().includes(searchValue))
    );
    setCurrentPage(1);
  };

  const indexOfLastFood = currentPage * itemsPerPage;
  const indexOfFirstFood = indexOfLastFood - itemsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood);

  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  const renderPaginationItems = () => {
    const paginationItems = [];

    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page++) {
        paginationItems.push(
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      paginationItems.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            isActive={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 4) {
        paginationItems.push(<PaginationEllipsis key="start-ellipsis" />);
      }

      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      for (let page = startPage; page <= endPage; page++) {
        paginationItems.push(
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 3) {
        paginationItems.push(<PaginationEllipsis key="end-ellipsis" />);
      }

      paginationItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            isActive={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return paginationItems;
  };

  return (
    <div>
      <AdminLayout>
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Search food by entering its name..."
            className="border-2 border-[#77E4C8]"
            value={searchFood}
            onChange={handleSearch}
          />
          <Button variant="primary" onClick={handleModalAdd}>
            Add Food
          </Button>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="rounded-tl-md text-black">No.</TableHead>
                <TableHead className="text-black">Food Image</TableHead>
                <TableHead className="text-black">Name</TableHead>
                <TableHead className="text-black">Description</TableHead>
                <TableHead
                  colSpan={3}
                  className="text-center rounded-tr-md text-black"
                >
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
                      className="w-28 rounded-full aspect-square"
                    />
                  </TableCell>
                  <TableCell>
                    {data.name
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </TableCell>
                  <TableCell>
                    {data.description.charAt(0).toUpperCase() +
                      data.description.slice(1)}
                  </TableCell>
                  <TableCell className="">
                    <Pencil
                      size={24}
                      className="mx-auto"
                      cursor={"pointer"}
                      onClick={() => handleModalEdit(data)}
                    />
                  </TableCell>
                  <TableCell className="">
                    <Trash2
                      size={24}
                      className="mx-auto"
                      cursor={"pointer"}
                      onClick={() => handleDeleteFood(data.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

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
            {renderPaginationItems()}
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

      {isModalAddOpen && (
        <AddFood handleModalAdd={handleModalAdd} getFoods={getFoods} />
      )}

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
