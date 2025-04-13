import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
import { formatPrice } from "../../utils/formatPrice";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Search } from "../../components";
import useFetchCollection from "../../hooks/useFetchCollection";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { storeProducts } from "../../redux/slice/productSlice";
import { filterBySearch } from "../../redux/slice/filterSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ViewProducts = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  //! Fetching Products from collection using Custom Hook
  const { data, isLoading } = useFetchCollection("products");
  const { filteredProducts } = useSelector((store) => store.filter);
  const { products } = useSelector((store) => store.product);

  useEffect(() => {
    dispatch(storeProducts({ products: data }));
  }, [dispatch, data]);

  //! Search
  useEffect(() => {
    dispatch(filterBySearch({ products: data, search }));
  }, [dispatch, data, search]);

  //! Delete single product
  const deleteSingleProduct = async (id, imageURL) => {
    try {
      // deleting a document from product collection
      await deleteDoc(doc(db, "products", id));
      // deleting image from database storage
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.info("Product deleted successfully");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };
  return (
    <>
      {<main className="w-full h-[75vh] overflow-y-auto py-4 px-2 md:px-6 bg-white rounded-lg shadow-inner">
  {isLoading && <Loader />}

  <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
    All Products
  </h1>

  {products.length > 0 && (
    <div className="mb-4 text-gray-600">
      <span className="text-lg font-semibold">{filteredProducts.length}</span>{" "}
      products found
    </div>
  )}

  <Search value={search} onChange={(e) => setSearch(e.target.value)} />

  {filteredProducts.length === 0 ? (
    <h1 className="text-2xl md:text-4xl font-bold text-red-500 mt-6 text-center">
      NO PRODUCTS FOUND
    </h1>
  ) : (
    <div className="overflow-x-auto mt-4 rounded-xl shadow-md">
      <table className="table w-full">
        {/* Table Head */}
        <thead className="bg-gray-200 text-gray-800">
          <tr>
            <th className="text-base font-semibold">#</th>
            <th className="text-base font-semibold">Image</th>
            <th className="text-base font-semibold">Name</th>
            <th className="text-base font-semibold">Category</th>
            <th className="text-base font-semibold">Price</th>
            <th className="text-base font-semibold">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {filteredProducts?.map((p, index) => {
            const { id, name, category, price, imageURL } = p;
            return (
              <tr key={id} className="hover:bg-gray-100 transition-all duration-200">
                <td>{index + 1}</td>
                <td>
                  <LazyLoadImage
                    src={
                      imageURL ||
                      "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
                    }
                    alt={name}
                    className="w-12 h-12 object-cover rounded-lg"
                    placeholderSrc="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
                    effect="blur"
                  />
                </td>
                <td className="max-w-xs text-sm font-medium text-gray-800 truncate" title={name}>
                  {name}
                </td>
                <td className="text-sm text-gray-600">{category}</td>
                <td className="text-sm text-gray-700 font-semibold">
                  {formatPrice(price)}
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <Link to={`/admin/add-product/${id}`}>
                      <BiEdit size={20} className="text-blue-600 hover:text-blue-800" />
                    </Link>
                    <button
                      onClick={() => deleteSingleProduct(id, imageURL)}
                      className="focus:outline-none"
                    >
                      <BiTrash size={20} className="text-red-600 hover:text-red-800" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )}
</main>
}
    </>
  );
};

export default ViewProducts;
