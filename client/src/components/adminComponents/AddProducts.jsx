// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import Loader from "../loader/Loader";
// import { useNavigate, useParams } from "react-router-dom";
// import { categories } from "../../utils/adminProductCategories";
// import { defaultValues } from "../../utils/adminAddProductDefaultValues";
// import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
// import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
// import { storage, db } from "../../firebase/config";
// import { useSelector } from "react-redux";

// //! Handle Input Changes
// const AddProducts = () => {
//   const navigate = useNavigate();
//   const { id: paramsId } = useParams();
//   const { products: reduxProducts } = useSelector((store) => store.product);
//   const productEdit = reduxProducts.find((item) => item.id === paramsId);
//   const [product, setProduct] = useState(() => {
//     return detectForm(paramsId, defaultValues, productEdit);
//   });
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   //! Check for Add or Edit
//   function detectForm(paramsId, func1, func2) {
//     if (paramsId === "ADD") return func1;
//     return func2;
//   }

//   function handleInputChange(e) {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   }
//   //! File Upload to FireStorage
//   function handleImageChange(e) {
//     const file = e.target.files[0];
//     const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         toast.error(error.code, error.message);
//       },
//       () => {
//         // Handle successful uploads on complete
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setProduct({ ...product, imageURL: downloadURL });
//           toast.success("File Uploaded Successfully");
//         });
//       }
//     );
//   }
//   //! Add Product to Firebase
//   async function addProduct(e) {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const docRef = await addDoc(collection(db, "products"), {
//         name: product.name,
//         imageURL: product.imageURL,
//         price: Number(product.price),
//         category: product.category,
//         brand: product.brand,
//         description: product.description,
//         createdAt: Timestamp.now().toDate(),
//       });
//       setUploadProgress(0);
//       setProduct(defaultValues);
//       setIsLoading(false);
//       toast.success("Product added to Database Successfully");
//       navigate("/admin/all-products");
//     } catch (error) {
//       console.log(error.message);
//       toast.error("Something Went Wrong , Check Console");
//       setIsLoading(false);
//     }
//   }
//   //! Edit Product
//   async function editProduct(e) {
//     e.preventDefault();
//     setIsLoading(true);
//     // Check if the image is updated
//     if (product.imageURL !== productEdit.imageURL) {
//       // deleting image from database storage
//       const storageRef = ref(storage, productEdit.imageURL);
//       await deleteObject(storageRef);
//     }
//     try {
//       await setDoc(doc(db, "products", paramsId), {
//         name: product.name,
//         imageURL: product.imageURL,
//         price: Number(product.price),
//         category: product.category,
//         brand: product.brand,
//         description: product.description,
//         // Preserving created at
//         createdAt: productEdit.createdAt,
//         editedAt: Timestamp.now().toDate(),
//       });
//       setUploadProgress(0);
//       setProduct(defaultValues);
//       setIsLoading(false);
//       toast.success("Product Updated Successfully");
//       navigate("/admin/all-products");
//     } catch (error) {
//       console.log(error.message);
//       toast.error("Something Went Wrong , Check Console");
//       setIsLoading(false);
//     }
//   }

//   //! Disable button until everything added to input fields
//   const AllFieldsRequired =
//     Boolean(product.brand) &&
//     Boolean(product.category) &&
//     Boolean(product.description) &&
//     Boolean(product.imageURL) &&
//     Boolean(product.name) &&
//     Boolean(product.name);

//   return (
//     <>
//       {isLoading && <Loader />}

//       <main className="h-full border-r-2 p-1">
//         <h1 className="text-xl md:text-3xl font-semibold pb-3">
//           {detectForm(paramsId, "Add New Product", "Edit Product")}
//         </h1>
//         <form className="form-control" onSubmit={detectForm(paramsId, addProduct, editProduct)}>
//           <div className="py-2">
//             <label className="label-text font-bold mb-2 block text-lg">Product Name:</label>
//             <input
//               className="input input-bordered max-w-lg w-full border-2"
//               type="text"
//               placeholder="Product Name"
//               required
//               name="name"
//               value={product.name}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="py-2">
//             <label className="label-text font-bold mb-2 block text-lg">Product Price: </label>
//             <input
//               className="input input-bordered max-w-lg w-full border-2"
//               type="number"
//               placeholder="Product Price"
//               required
//               name="price"
//               value={product.price}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="py-2">
//             <label className="label-text font-bold mb-2 block text-lg">Product Category:</label>
//             <select
//               className="select select-bordered w-full max-w-lg"
//               required
//               name="category"
//               value={product.category}
//               onChange={handleInputChange}
//             >
//               <option disabled value="">
//                 -- Choose a Product Category --
//               </option>
//               {categories.map((c) => {
//                 return (
//                   <option key={c.id} value={c.name}>
//                     {c.name}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>
//           <div className="py-2">
//             <label className="label-text font-bold mb-2 block text-lg">Product Brand: </label>
//             <input
//               className="input input-bordered max-w-lg w-full border-2"
//               type="text"
//               placeholder="Product Brand"
//               required
//               name="brand"
//               value={product.brand}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="py-2">
//             <label className="label-text font-bold mb-2 block text-lg">Product Description: </label>
//             <textarea
//               className="textarea textarea-bordered h-32 max-w-lg w-full"
//               type="text"
//               placeholder="Product Description"
//               required
//               name="description"
//               value={product.description}
//               onChange={handleInputChange}
//             ></textarea>
//           </div>
//           <div>
//             <label className="label-text font-bold mb-2 block text-lg">Product Image: </label>
//             <div className="border-2 rounded-sm  max-w-xl w-full px-4 pb-2">
//               <div>
//                 <progress
//                   className="progress progress-primary w-44 md:w-72 xl:w-full"
//                   value={uploadProgress}
//                   max="100"
//                 ></progress>
//               </div>
//               <input
//                 className="max-w-lg w-full"
//                 accept="image/all"
//                 type="file"
//                 placeholder="IMAGE URL"
//                 name="image"
//                 onChange={handleImageChange}
//               />
//               {product.imageURL === "" ? null : (
//                 <input
//                   className="input input-sm input-bordered max-w-lg w-full my-2"
//                   type="text"
//                   value={product.imageURL}
//                   required
//                   placeholder="Image URL"
//                   disabled
//                 />
//               )}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary text-lg max-w-[200px]  mt-2"
//             disabled={!AllFieldsRequired}
//           >
//             {detectForm(paramsId, "Add Product", "Update Product")}
//           </button>
//         </form>
//       </main>
//     </>
//   );
// };

// export default AddProducts;
import React, { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { categories } from "../../utils/adminProductCategories";
import { defaultValues } from "../../utils/adminAddProductDefaultValues";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
import { storage, db } from "../../firebase/config";
import { useSelector } from "react-redux";

//! Handle Input Changes
const AddProducts = () => {
  const navigate = useNavigate();
  const { id: paramsId } = useParams();
  const { products: reduxProducts } = useSelector((store) => store.product);
  const productEdit = reduxProducts.find((item) => item.id === paramsId);

  const [product, setProduct] = useState(() => {
    return detectForm(paramsId, defaultValues, productEdit);
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [useImageURL, setUseImageURL] = useState(false);

  //! Check for Add or Edit
  function detectForm(paramsId, func1, func2) {
    if (paramsId === "ADD") return func1;
    return func2;
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  //! File Upload to FireStorage
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.code, error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("File Uploaded Successfully");
        });
      }
    );
  }

  //! Add Product
  async function addProduct(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, "products"), {
        ...product,
        price: Number(product.price),
        // offeredPrice: Number(product.offeredPrice),
        createdAt: Timestamp.now().toDate(),
      });
      setProduct(defaultValues);
      setUploadProgress(0);
      setIsLoading(false);
      toast.success("Product added successfully");
      navigate("/admin/all-products");
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  }

  //! Edit Product
  async function editProduct(e) {
    e.preventDefault();
    setIsLoading(true);
    if (product.imageURL !== productEdit.imageURL && !useImageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      await deleteObject(storageRef);
    }
    try {
      await setDoc(doc(db, "products", paramsId), {
        ...product,
        price: Number(product.price),
        // offeredPrice: Number(product.offeredPrice),
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setProduct(defaultValues);
      setUploadProgress(0);
      setIsLoading(false);
      toast.success("Product updated successfully");
      navigate("/admin/all-products");
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  }

  const AllFieldsRequired =
    product.name &&
    product.price &&
    // product.offeredPrice &&
    product.category &&
    product.brand &&
    product.description &&
    product.imageURL;

  return (
    <>
      {isLoading && <Loader />}
      <main className="h-full border-r-2 p-1">
        <h1 className="text-xl md:text-3xl font-semibold pb-3">
          {detectForm(paramsId, "Add New Product", "Edit Product")}
        </h1>
        <form className="form-control" onSubmit={detectForm(paramsId, addProduct, editProduct)}>
          {/* Name */}
          <div className="py-2">
            <label className="label-text font-bold block text-lg">Product Name:</label>
            <input
              className="input input-bordered max-w-lg w-full border-2"
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Price */}
          <div className="py-2">
            <label className="label-text font-bold block text-lg">Price:</label>
            <input
              className="input input-bordered max-w-lg w-full border-2"
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Offered Price */}
          

          {/* Category */}
          <div className="py-2">
            <label className="label-text font-bold block text-lg">Category:</label>
            <select
              className="select select-bordered max-w-lg w-full"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              required
            >
              <option disabled value="">
                -- Select a Category --
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div className="py-2">
            <label className="label-text font-bold block text-lg">Brand:</label>
            <input
              className="input input-bordered max-w-lg w-full border-2"
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Description */}
          <div className="py-2">
            <label className="label-text font-bold block text-lg">Description:</label>
            <textarea
              className="textarea textarea-bordered max-w-lg w-full h-32"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          {/* Image Upload Option Toggle */}
          <div className="py-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useImageURL}
                onChange={() => setUseImageURL((prev) => !prev)}
              />
              Use Image URL instead of Upload
            </label>
          </div>

          {/* Image Section */}
          <div className="py-2">
            <label className="label-text font-bold block text-lg">Product Image:</label>
            <div className="border-2 rounded-sm max-w-xl w-full p-3">
              {useImageURL ? (
                <input
                  className="input input-bordered max-w-lg w-full"
                  type="text"
                  name="imageURL"
                  value={product.imageURL}
                  onChange={handleInputChange}
                  placeholder="Enter Image URL"
                  required
                />
              ) : (
                <>
                  <progress
                    className="progress progress-primary w-full mb-2"
                    value={uploadProgress}
                    max="100"
                  ></progress>
                  <input
                    className="max-w-lg w-full"
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                  />
                </>
              )}
              {product.imageURL && (
                <img
                  src={product.imageURL}
                  alt="preview"
                  className="mt-2 w-40 h-40 object-cover rounded"
                />
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary text-lg max-w-[200px] mt-4"
            disabled={!AllFieldsRequired}
          >
            {detectForm(paramsId, "Add Product", "Update Product")}
          </button>
        </form>
      </main>
    </>
  );
};

export default AddProducts;
