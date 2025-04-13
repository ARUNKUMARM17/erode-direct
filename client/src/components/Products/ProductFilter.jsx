// import { useEffect, useState } from "react";
// //  Utilities
// import { getUniqueValues } from "../../utils/uniqueValues";
// //Redux
// import { useDispatch, useSelector } from "react-redux";
// import { filterByCategory, filterByBrand, filterByprice } from "../../redux/slice/filterSlice";
// import { formatPrice } from "../../utils/formatPrice";

// const ProductFilter = () => {
// 	const { products } = useSelector((store) => store.product);
// 	const { minPrice, maxPrice } = useSelector((store) => store.product);
// 	const dispatch = useDispatch();

// 	const [category, setCategory] = useState("All");
// 	const [brand, setBrand] = useState("All");
// 	const [price, setPrice] = useState(maxPrice);

// 	// Getting new Category and  brand Array
// 	const allCategories = getUniqueValues(products, "category");
// 	const allBrands = getUniqueValues(products, "brand");
// 	//! Categi
// 	const filterProducts = (c) => {
// 		setCategory(c);
// 		dispatch(filterByCategory({ products, category: c }));
// 	};
// 	//! Brand
// 	useEffect(() => {
// 		dispatch(filterByBrand({ products, brand }));
// 	}, [dispatch, products, brand]);

// 	//!Price
// 	useEffect(() => {
// 		dispatch(filterByprice({ products, price }));
// 	}, [dispatch, products, price]);

// 	function clearFilter() {
// 		setCategory("All");
// 		setBrand("All");
// 		setPrice(maxPrice);
// 	}

// 	return (
// 		<div className="flex flex-col gap-y-5">
// 			{/* Categories */}
// 			<div>
// 				<h1 className="font-bold">CATEGORIES</h1>
// 				<div className="flex flex-col gap-y-2 items-start">
// 					{allCategories.map((c, index) => {
// 						return (
// 							<button
// 								key={index}
// 								type="button"
// 								className={`w-full text-left ${
// 									category === c
// 										? "border-l-4 border-primary px-2 font-semibold"
// 										: null
// 								}`}
// 								onClick={() => filterProducts(c)}
// 							>
// 								{c}
// 							</button>
// 						);
// 					})}
// 				</div>
// 			</div>
// 			{/* Brand */}
// 			<div>
// 				<h1 className="font-bold">BRAND</h1>
// 				<select
// 					className="select select-bordered w-full"
// 					name="brand"
// 					onChange={(e) => setBrand(e.target.value)}
// 				>
// 					{allBrands.map((b, index) => {
// 						return (
// 							<option key={index} value={b}>
// 								{b}
// 							</option>
// 						);
// 					})}
// 				</select>
// 			</div>
// 			{/* Price */}
// 			<div>
// 				<h1 className="font-bold">PRICE</h1>
// 				<p>{formatPrice(price)}</p>
// 				<input
// 					className="range range-primary"
// 					type="range"
// 					value={price}
// 					min={minPrice}
// 					max={maxPrice}
// 					onChange={(e) => setPrice(e.target.value)}
// 				/>
// 			</div>
// 			<div>
// 				<button className="btn btn-error" onClick={clearFilter}>
// 					Clear Filters
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default ProductFilter;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, filterByBrand, filterByprice } from "../../redux/slice/filterSlice";
import { formatPrice } from "../../utils/formatPrice";
import { getUniqueValues } from "../../utils/uniqueValues";
import { Filter, X, ChevronDown } from "lucide-react";

const ProductFilter = () => {
  const { products } = useSelector((store) => store.product);
  const { minPrice, maxPrice } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(maxPrice);
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  // Getting new Category and brand Array
  const allCategories = getUniqueValues(products, "category");
  const allBrands = getUniqueValues(products, "brand");

  // Category filter
  const filterProducts = (c) => {
    setCategory(c);
    dispatch(filterByCategory({ products, category: c }));
  };

  // Brand filter
  useEffect(() => {
    dispatch(filterByBrand({ products, brand }));
  }, [dispatch, products, brand]);

  // Price filter
  useEffect(() => {
    dispatch(filterByprice({ products, price }));
  }, [dispatch, products, price]);

  function clearFilter() {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Filter className="text-indigo-600" size={20} />
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        </div>
        <button 
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          className="text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <ChevronDown 
            size={20} 
            className={`transform transition-transform ${isFilterVisible ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>

      {isFilterVisible && (
        <div className="space-y-8">
          {/* Categories */}
          <div className="border-b pb-6">
            <h3 className="font-semibold text-gray-700 mb-4 uppercase text-sm tracking-wider">Categories</h3>
            <div className="flex flex-col gap-y-2 items-start">
              {allCategories.map((c, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                    category === c
                      ? "bg-indigo-50 text-indigo-700 font-medium border-l-4 border-indigo-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => filterProducts(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="border-b pb-6">
            <h3 className="font-semibold text-gray-700 mb-4 uppercase text-sm tracking-wider">Brand</h3>
            <div className="relative">
              <select
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                name="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                {allBrands.map((b, index) => (
                  <option key={index} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown size={18} className="text-gray-500" />
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="border-b pb-6">
            <h3 className="font-semibold text-gray-700 mb-4 uppercase text-sm tracking-wider">Price</h3>
            <p className="text-indigo-600 font-medium mb-2">{formatPrice(price)}</p>
            <input
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              type="range"
              value={price}
              min={minPrice}
              max={maxPrice}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((price - minPrice) / (maxPrice - minPrice)) * 100}%, #e5e7eb ${((price - minPrice) / (maxPrice - minPrice)) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>{formatPrice(minPrice)}</span>
              <span>{formatPrice(maxPrice)}</span>
            </div>
          </div>

          {/* Clear Button */}
          <div className="pt-2">
            <button 
              className="flex items-center justify-center w-full gap-2 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg hover:from-red-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
              onClick={clearFilter}
            >
              <X size={16} />
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;