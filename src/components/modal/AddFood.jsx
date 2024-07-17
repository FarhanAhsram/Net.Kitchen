import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fetchAddFood } from "@/api/Food/fetchAddFood";
import { fetchUploadImg } from "@/api/fetchUploadImg";
import { useState } from "react";
import Swal from "sweetalert2";
/* eslint-disable react/prop-types */

export default function AddFood({ handleModalAdd, getFoods }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    ingredients: [],
    imageUrl: null,
  });

  const handleCreateFoodChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "ingredients" ? value.split(",") : value,
    });
  };

  const handleImageFood = (e) => {
    setForm({
      ...form,
      imageUrl: e.target.files[0],
    });
  };

  const handleCreateFoodSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", form.imageUrl);

      const imageUrl = await fetchUploadImg(formData);

      const formDataWithImage = {
        ...form,
        imageUrl: imageUrl,
      };

      const response = await fetchAddFood(formDataWithImage);
      Swal.fire({
        title: "Food Created Successfully",
        text: response.message,
        icon: "success",
        showConfirmButton: true,
      });
      handleModalAdd();
      getFoods();
    } catch (error) {
      console.error("Failed to create food:", error);
    }
  };

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-[#22252EAD] opacity-100 z-10">
      <div className="bg-[#FFFFFF] w-1/2 rounded-2xl p-7 max-md:w-3/4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Add Food</h1>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            cursor={"pointer"}
            onClick={handleModalAdd}
          >
            <path
              d="M12.657 1.34333L1.34326 12.657M12.657 12.657L1.34326 1.34326"
              stroke="#26355D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <hr className="border-2 border-[#EDEEEF] my-4" />

        <div>
          <form action="" onSubmit={handleCreateFoodSubmit}>
            <div className="mb-4">
              <Label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                className="mt-2"
                placeholder="Name"
                required
                onChange={handleCreateFoodChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                type="text"
                id="description"
                name="description"
                className="mt-2"
                placeholder="Description"
                required
                onChange={handleCreateFoodChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="ingredients">
                Ingredients <span className="text-red-500">*</span>
              </Label>
              <Textarea
                type="text"
                id="ingredients"
                name="ingredients"
                className="mt-2"
                placeholder="Ingredients"
                required
                onChange={handleCreateFoodChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="imageUrl">
                Image <span className="text-red-500">*</span>
              </Label>
              <Input
                type="file"
                id="imageUrl"
                name="imageUrl"
                className="mt-2"
                placeholder="Image"
                required
                onChange={handleImageFood}
              />
            </div>
            <div className="flex justify-end gap-6">
              <Button variant="ghost" onClick={handleModalAdd}>
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
