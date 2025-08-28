import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const AddProduct = ({ editingProduct = { mrp: "0", sellingPrice: "0" }, setShowAddModal }) => {
    const [productDetails, setProductDetails] = useState({
        name: "",
        description: "",
        price: "",
        mrp: "",
        categoryId: ""
    });
    const [category, setCategory] = useState([]);
    const [files, setFiles] = useState<File[]>([]);
    const [loader, setLoader] = useState(false);
    const [pageLoader, setPageLoader] = useState(false);


    const handleImagesSelected = (e) => {
        if (e.target.files) {
            setFiles((prev) => [...prev, ...Array.from(e.target.files as File[])]);
        }
    };

    const removeImage = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    async function addProduct() {

        // validation

        try {
            const formData = new FormData();
            formData.append("productDetails", JSON.stringify(productDetails));
            files.forEach((ele) => {
                formData.append("images", ele);
            });

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/admin/create-product`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem("pochoToken")}`
                    }
                }
            );
            if (response.data.status === "SUCCESS") {
                setShowAddModal(false);
                alert(response.data.message);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async function getCategories() {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/admin/get-all-categories`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("pochoToken")}`
                    }
                }
            );
            if (response.data.status === "SUCCESS") {
                setCategory(response.data.category);
            } else {
                setCategory([]);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);



    async function getCategoryList(isRefresh = false) {
    try {
      if (!isRefresh) setPageLoader(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/get-category-list`,
        { page: 1, searchString: "" },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("pochoToken")}`,
          },
        }
      );
      if (response?.data?.status === "SUCCESS") {
        setCategories(response?.data?.category || []);
      } else if (response.data.status === "JWT_INVALID") {

        toast.error(response.data.message);
        // redirect to login
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      if (!isRefresh) setPageLoader(false);
    }
  }

  useEffect(() => {
    getCategoryList();
  }, []);

    return (

        
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h5 className="text-xl font-semibold text-gray-900">
                        {editingProduct ? "Edit Product" : "Add New Product"}
                    </h5>
                    <button
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                        onClick={() => setShowAddModal(false)}
                    >
                        ×
                    </button>
                </div>
                <div className="p-6">
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="Enter product name"
                                    onChange={(e) => setProductDetails((pre) => ({ ...pre, name: e.target.value }))}
                                    value={productDetails?.name}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    onChange={(e) =>
                                        setProductDetails((pre) => ({ ...pre, categoryId: e.target.value }))
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    <option value={""}>Select Category</option>
                                    {category?.map((ele) => (
                                        <option value={ele.id} key={ele.id}>
                                            {ele?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">MRP (₹)</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="0"
                                    onChange={(e) => setProductDetails((pre) => ({ ...pre, mrp: e.target.value }))}
                                    value={productDetails.mrp}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price (₹)</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="0"
                                    onChange={(e) => setProductDetails((pre) => ({ ...pre, price: e.target.value }))}
                                    value={productDetails.price}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    rows={3}
                                    placeholder="Enter product description"
                                    onChange={(e) =>
                                        setProductDetails((pre) => ({ ...pre, description: e.target.value }))
                                    }
                                    value={productDetails.description}
                                ></textarea>
                            </div>

                            {/* ✅ Updated Image Upload Section */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                                <div className="flex flex-wrap gap-4">
                                    {files.map((file, index) => (
                                        <div
                                            key={index}
                                            className="relative w-28 h-28 border rounded-lg overflow-hidden flex items-center justify-center"
                                        >
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-red-600"
                                                onClick={() => removeImage(index)}
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    ))}

                                    <label className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
                                        <span className="text-gray-400 text-sm">+ Add</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={handleImagesSelected}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                    <button
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowAddModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                        onClick={addProduct}
                    >
                        {editingProduct ? "Update Product" : "Add Product"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;