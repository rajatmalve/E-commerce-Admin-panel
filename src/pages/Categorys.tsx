import React, { useState } from "react";
import { FaBox, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface Category {
  id: number;
  name: string;
  icon: JSX.Element;
  description?: string;
}

const CategoriesTab: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "", icon: <FaBox />, description: "Mobile, Laptop, TV" },
    { id: 2, name: "Fashion", icon: <FaBox />, description: "Clothes & Accessories" },
    { id: 3, name: "Beauty", icon: <FaBox />, description: "Cosmetics & Skincare" },
  ]);

  const addCategory = () => {
    const newCategory: Category = {
      id: categories.length + 1,
      name: `New Category ${categories.length + 1}`,
      icon: <FaBox />,
      description: "Description here",
    };
    setCategories([...categories, newCategory]);
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          onClick={addCategory}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white shadow p-4 rounded-lg flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl text-blue-500">{cat.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{cat.name}</h3>
                <p className="text-gray-500 text-sm">{cat.description}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button className="text-yellow-500 text-xl">
                <FaEdit />
              </button>
              <button
                onClick={() => deleteCategory(cat.id)}
                className="text-red-500 text-xl"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesTab;
