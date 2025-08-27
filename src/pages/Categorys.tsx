import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBox, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Loader from "./Loader";


const CategoriesTab: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

const CategoriesTab: React.FC = () => {
  const [categories, setCategories] = useState([]);


  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loader, setLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);

  // Delete modal & loader states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoader, setDeleteLoader] = useState(false);


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

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleSave = async () => {
    try {
      //validation 
      if (!name.trim()) {
        alert("Please enter a category name");
        return;
      }

      if (!description.trim()) {
        alert("Please enter a description");
        return;
      }

      setLoader(true)
      if (editMode && currentId !== null) {
        const serverResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/update-category`,
          { categoryId: currentId, name, description },


          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("pochoToken")}`
            }
          }
        );
        const data = serverResponse?.data;
        if (data.status === "SUCCESS") {
          await getCategoryList()
          setModalOpen(false);
          alert(data.message)
        } else if (data.status === "JWT_INVALID") {
          alert(data.message);
          // redirect to login
        } else {
          alert(data.message)
        }

      } else {
        // api call
        const serverResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/create-category`,
          { name, description },

          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("pochoToken")}`
            }
          }
        );
        const data = serverResponse?.data;
        if (data.status === "SUCCESS") {
          alert(data.message)
          await getCategoryList()

          setModalOpen(false);
        } else if (data.status === "JWT_INVALID") {
          alert(data.message);
          // redirect to login
        } else {
          alert(data.message)
        }

      }


    } catch (error) {

    } finally {
      setLoader(false)

    }
  };

  // Confirm delete + API call
  const confirmDelete = async () => {
    if (!deleteId) return;
    const token = localStorage.getItem("pochoToken");
    if (!token) {
      alert("Not authenticated. Please login again.");
      setDeleteModalOpen(false);
      setDeleteId(null);
      return;
    }

    try {
      setDeleteLoader(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/delete-category`,
        { categoryId: deleteId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );


      if (response?.data?.status === "SUCCESS") {
        // optimistic update:
        setCategories(prev => prev.filter(cat => cat.id !== deleteId));
        alert(response.data.message || "Category deleted");
        // OR use: await getCategoryList(true);
      } else {
        alert(response?.data?.message || "Failed to delete category");
      }
    } catch (err: any) {
      console.error("Delete error:", err);
      alert(err?.response?.data?.message || err.message || "Network error");
    } finally {
      setDeleteLoader(false);
      setDeleteModalOpen(false);
      setDeleteId(null);
    }
  };


  async function getCategoryList() {
    try {

      if (!isRefresh) setPageLoader(true);
      const token = localStorage.getItem("pochoToken");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/get-category-list`,
        { page: 1, searchString: "" },
        {
          headers: {
            "Content-Type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("pochoToken")}`
          },

      
        }
      })
      if (response.data.status === "SUCCESS") {

        setCategories(response?.data?.category || []);
      } else {
        setCategories(response?.data?.category)
      } else if (response.data.status === "JWT_INVALID") {

        alert(response.data.message);
        // redirect to login
      } else {
        alert(response.data.message)
      }


    } catch (error) {
      alert(error.message)

    } finally {
      setLoader(false)
    }

  }

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <>
      {pageLoader ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader p-6"></div>
        </div>

      ) : (
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Categories</h2>
              <p className="text-gray-600 text-base sm:text-lg">Manage product categories and attributes</p>
            </div>
            <button onClick={openAddModal} className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <i className="fas fa-plus"></i><span>Add Category</span>
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white shadow-md p-4 rounded-lg flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl text-primary-500"><FaBox /></div>
                  <div>
                    <h3 className="text-lg font-semibold">{cat?.name}</h3>
                    <p className="text-gray-500 text-sm">{cat?.description}</p>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button onClick={() => openEditModal(cat)} className="text-primary-500 text-xl hover:text-primary-600 transition" aria-label={`Edit ${cat.name}`}>
                    <FaEdit />
                  </button>
                  <button onClick={() => openDeleteModal(cat.id)} disabled={deleteLoader} className="text-red-500 text-xl hover:text-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed" aria-label={`Delete ${cat.name}`}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Modal */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                <h3 className="text-xl font-bold mb-4">{editMode ? "Edit Category" : "Add Category"}</h3>
                <input type="text" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-3 px-3 py-2 border rounded" />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mb-4 px-3 py-2 border rounded" />
                <div className="flex justify-end gap-3">
                  <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition">Cancel</button>
                  <button onClick={handleSave} className="px-4 py-2 rounded bg-primary-500 text-white hover:bg-primary-600 transition">{loader ? <Loader /> : "Save"}</button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {deleteModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-500">Confirm Delete</h3>
                <p className="mb-2">Are you sure you want to delete this category?</p>
                {deleteId && <p className="mb-4 text-sm text-gray-600">ID: {deleteId}</p>}
                <div className="flex justify-end gap-3">
                  <button onClick={() => { setDeleteModalOpen(false); setDeleteId(null); }} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition">Cancel</button>
                  <button onClick={confirmDelete} disabled={deleteLoader} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition">
                    {deleteLoader ? <Loader /> : "Delete"}
                  </button>
                </div>
              </div>

    getCategoryList()
  }, [])

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
        {categories.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg font-medium py-10">
            🚫 No categories found. Please add one!
          </div>
        ) : (
          categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white shadow-md p-4 rounded-lg flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl text-primary-500"><FaBox /></div>
                <div>
                  <h3 className="text-lg font-semibold">{cat?.name}</h3>
                  <p className="text-gray-500 text-sm">{cat?.description}</p>
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
          ))
        )}
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
                {loader ? < Loader /> : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesTab;
