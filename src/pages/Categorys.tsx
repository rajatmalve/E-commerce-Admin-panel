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
    { id: 1, name: "Electronics", icon: <FaBox />, description: "Mobile, Laptop, TV" },
    { id: 2, name: "Fashion", icon: <FaBox />, description: "Clothes & Accessories" },
    { id: 3, name: "Beauty", icon: <FaBox />, description: "Cosmetics & Skincare" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const openAddModal = () => {
    setEditMode(false);
    setName("");
    setDescription("");
    setModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditMode(true);
    setCurrentId(cat.id);
    setName(cat.name);
    setDescription(cat.description || "");
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editMode && currentId !== null) {
      setCategories(
        categories.map((cat) =>
          cat.id === currentId ? { ...cat, name, description } : cat
        )
      );
    } else {
      const newCategory: Category = {
        id: categories.length > 0 ? categories[categories.length - 1].id + 1 : 1,
        name,
        icon: <FaBox />,
        description,
      };
      setCategories([...categories, newCategory]);
    }
    setModalOpen(false);
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Categories</h2>
          <p className="text-gray-600 text-base sm:text-lg">Manage product categories and attributes</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
           <i className="fas fa-plus"></i>
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white shadow-md p-4 rounded-lg flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl text-primary-500">{cat.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{cat.name}</h3>
                <p className="text-gray-500 text-sm">{cat.description}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => openEditModal(cat)}
                className="text-primary-500 text-xl hover:text-primary-600 transition"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteCategory(cat.id)}
                className="text-red-500 text-xl hover:text-red-600 transition"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              {editMode ? "Edit Category" : "Add Category"}
            </h3>
            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-primary-500 text-white hover:bg-primary-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesTab;
