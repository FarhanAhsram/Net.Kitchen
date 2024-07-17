import { fetchEditFood } from "@/api/Food/fetchEditFood";
import { fetchUploadImg } from "@/api/fetchUploadImg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";
/* eslint-disable react/prop-types */

export default function EditFood({
  handleModalEdit,
  editedFood,
  setEditedFood,
  getFoods,
}) {
  const handleEditFoodChange = (e) => {
    const { name, value } = e.target;
    setEditedFood({
      ...editedFood,
      [name]: value,
    });
  };

  const handleImageFood = (e) => {
    setEditedFood({
      ...editedFood,
      imageUrl: e.target.files[0],
    });
  };

  const handleEditFoodSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = editedFood.imageUrl;

      if (imageUrl instanceof File) {
        const formData = new FormData();
        formData.append("image", imageUrl);
        imageUrl = await fetchUploadImg(formData);
      }

      const id = editedFood.id;

      const ingredients = Array.isArray(editedFood.ingredients)
        ? editedFood.ingredients
        : editedFood.ingredients
            .split(",")
            .map((ingredient) => ingredient.trim());

      const formDataEdited = {
        ...editedFood,
        imageUrl: imageUrl,
        ingredients: ingredients,
      };

      const response = await fetchEditFood({
        id: id,
        foodData: formDataEdited,
      });
      if (response) {
        Swal.fire({
          title: "Food Edited Successfully",
          text: response.message,
          icon: "success",
          showConfirmButton: true,
        });
        getFoods();
        handleModalEdit();
      }
    } catch (error) {
      console.error("Failed to edit food:", error);
    }
  };

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-[#22252EAD] opacity-100 z-10">
      <div className="bg-[#FFFFFF] w-1/2 rounded-2xl p-7 max-md:w-3/4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Edit Food</h1>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            cursor={"pointer"}
            onClick={handleModalEdit}
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
          <form action="" onSubmit={handleEditFoodSubmit}>
            <div className="mb-4">
              <Label>
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                className="mt-2"
                placeholder="Name"
                value={editedFood.name}
                onChange={handleEditFoodChange}
              />
            </div>
            <div className="mb-4">
              <Label>
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                type="text"
                id="description"
                name="description"
                className="mt-2"
                placeholder="Description"
                value={editedFood.description}
                onChange={handleEditFoodChange}
              />
            </div>
            <div className="mb-4">
              <Label>
                Ingredients <span className="text-red-500">*</span>
              </Label>
              <Textarea
                type="text"
                id="ingredients"
                name="ingredients"
                className="mt-2"
                placeholder="Ingredients"
                value={
                  Array.isArray(editedFood.ingredients)
                    ? editedFood.ingredients.join(", ")
                    : editedFood.ingredients
                }
                onChange={handleEditFoodChange}
              />
            </div>
            <div className="mb-4">
              <Label>
                Image <span className="text-red-500">*</span>
              </Label>
              <img
                className="rounded-lg mx-auto w-24 h-24"
                src={editedFood.imageUrl}
                alt={editedFood.name}
              />
              <Input
                type="file"
                id="imageUrl"
                name="imageUrl"
                className="mt-2"
                placeholder="Image"
                onChange={handleImageFood}
              />
            </div>
            <div className="flex justify-end gap-6">
              <Button variant="ghost" onClick={handleModalEdit}>
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
