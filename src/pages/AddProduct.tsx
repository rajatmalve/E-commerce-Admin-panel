import axios from "axios";
import { useEffect, useState } from "react"


const AddProduct = ({ editingProduct = { mrp: "0", sellingPrice: "0" }, setShowAddModal }) => {
    const [productDetails, setProductDetails] = useState({
        name: "",
        description: "",
        price: "",
        mrp: "",
        categoryId: ""
    });
    const [category, setCategory] = useState([]);
    const [files, setFiles] = useState([])


    const handleImagesSelected = async (e) => {
        setFiles([...files, ...e.target.files])
    };


    async function addProduct() {
        try {
            //validation

            const formData = new FormData();
            formData.append("productDetails", JSON.stringify(productDetails))
            files.forEach((ele) => {
                formData.append("images", ele)
            })

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/create-product`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("pochoToken")}`
                }
            })
            if (response.data.status === "SUCCESS") {
                setShowAddModal(false);
                alert(response.data.message)
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    async function getCategories() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/get-all-categories`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("pochoToken")}`
                }
            })
            if (response.data.status === "SUCCESS") {
                setCategory(response.data.category)
            } else {
                setCategory([])
            }
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h5 className="text-xl font-semibold text-gray-900">
                        {editingProduct ? 'Edit Product' : 'Add New Product'}
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
                                    onChange={(e) => setProductDetails(pre => ({ ...pre, name: e.target.value }))}
                                    value={productDetails?.name}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select onChange={(e) => setProductDetails(pre => ({ ...pre, categoryId: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                                    <option value={""}>Select Category</option>
                                    {
                                        category?.map((ele) => (
                                            <option value={ele.id} key={ele.id}>{ele?.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">MRP (₹)</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="0"
                                    onChange={(e) => setProductDetails(pre => ({ ...pre, mrp: e.target.value }))}
                                    value={productDetails.mrp}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price (₹)</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="0"
                                    onChange={(e) => setProductDetails(pre => ({ ...pre, price: e.target.value }))}
                                    value={productDetails.price}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    rows={3}
                                    placeholder="Enter product description"
                                    onChange={(e) => setProductDetails(pre => ({ ...pre, description: e.target.value }))}
                                    value={productDetails.description}
                                ></textarea>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                                <input
                                    type="file"
                                    className=" px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImagesSelected}
                                />
                                {files.length > 0 && (
                                    <div className="flex mt-4 space-y-4">
                                        {files.map((set, i) => (
                                            <div key={set.fileName} className="border border-gray-200 rounded-lg p-3 max-w-[200px] mr-2">

                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="font-medium text-gray-900 text-sm">{set.fileName}</div>
                                                    <button
                                                        type="button"
                                                        className="text-red-600 text-xs hover:text-red-800"
                                                        onClick={() => setFiles(files?.filter((ele, index) => index !== i))}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {(() => {
                                                        return (
                                                            <div className="text-center">
                                                                <div className="text-xs text-gray-500 mb-1">{set?.fileName}</div>
                                                                <img src={URL.createObjectURL(set)} alt={set.fileName} className="w-full h-28 object-cover rounded" />
                                                            </div>
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* {selectedImageSets.length > 0 && (
                      <div className="mt-6">
                        <h6 className="text-sm font-semibold text-gray-900 mb-3">Assign Images to Slots</h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border border-gray-200 rounded-lg p-3">
                            <div className="text-sm font-medium text-gray-700 mb-2">Thumbnail (64x64)</div>
                            <select
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                              value={imageAssignments.thumbnail?.fileName || ''}
                              onChange={(e) => setAssignment('thumbnail', e.target.value)}
                            >
                              <option value="" disabled>Select image</option>
                              {selectedImageSets.map(s => (
                                <option key={s.fileName} value={s.fileName}>{s.fileName}</option>
                              ))}
                            </select>
                            {imageAssignments.thumbnail?.url && (
                              <img src={imageAssignments.thumbnail.url} alt="thumbnail-preview" className="mt-3 w-16 h-16 object-cover rounded" />
                            )}
                          </div>
                         
                        </div>
                      </div>
                    )} */}
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
                    <button className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors" onClick={addProduct}>
                        {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
