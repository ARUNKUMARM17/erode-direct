import React, { useEffect, useState } from "react";
import { Breadcrumbs, ProductFilter, ProductList } from "../../components";
import Loader from "../../components/loader/Loader";

// custom Hook
import useFetchCollection from "../../hooks/useFetchCollection";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { storeProducts, getPriceRange } from "../../redux/slice/productSlice";

const Allproducts = () => {
	const { data, isLoading } = useFetchCollection("products");
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(storeProducts({ products: data }));
		dispatch(getPriceRange({ products: data }));
	}, [dispatch, data]);

	const { products } = useSelector((store) => store.product);

	return (
		<>
			{isLoading && <Loader />}
			<main className="w-full">
				<Breadcrumbs />
				<section className="w-full mx-auto p-4 md:p-10 lg:w-9/12 md:px-6 flex h-full">
					<aside className="hidden sm:block sm:w-64 mx-2 ">
						<ProductFilter />
					</aside>
					<article className="flex-1">
						<ProductList products={products} />
					</article>
				</section>
			</main>
		</>
	);
};

export default Allproducts;
// import React, { useEffect, useState } from "react";
// import { Breadcrumbs, ProductFilter, ProductList } from "../../components";
// import Loader from "../../components/loader/Loader";
// import useFetchCollection from "../../hooks/useFetchCollection";
// import { useSelector, useDispatch } from "react-redux";
// import { storeProducts, getPriceRange } from "../../redux/slice/productSlice";
// import { Filter } from "lucide-react";

// const Allproducts = () => {
//   const { data, isLoading } = useFetchCollection("products");
//   const dispatch = useDispatch();
//   const [showMobileFilter, setShowMobileFilter] = useState(false);

//   useEffect(() => {
//     dispatch(storeProducts({ products: data }));
//     dispatch(getPriceRange({ products: data }));
//   }, [dispatch, data]);

//   const { products } = useSelector((store) => store.product);

//   return (
//     <>
//       {isLoading && <Loader />}
//       <main className="min-h-screen bg-gray-100">
//         <div className="bg-white shadow">
//           <div className="max-w-screen-xl mx-auto px-4 py-4">
//             <Breadcrumbs />
//           </div>
//         </div>

//         <section className="max-w-screen-xl mx-auto px-4 py-8">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
//             <button
//               className="md:hidden flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md font-medium"
//               onClick={() => setShowMobileFilter(!showMobileFilter)}
//             >
//               <Filter size={18} />
//               Filters
//             </button>
//           </div>

//           <div className="flex flex-col md:flex-row gap-8">
//             {/* Mobile Filter Drawer */}
//             {showMobileFilter && (
//               <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
//                 <div className="w-3/4 sm:w-1/2 bg-white h-full overflow-y-auto p-6 shadow-lg animate-slide-in-right">
//                   <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-xl font-semibold">Filters</h2>
//                     <button
//                       className="p-2 rounded hover:bg-gray-200"
//                       onClick={() => setShowMobileFilter(false)}
//                     >
//                       ✕
//                     </button>
//                   </div>
//                   <ProductFilter />
//                 </div>
//               </div>
//             )}

//             {/* Desktop Filter Sidebar */}
//             <aside className="hidden md:block w-full md:w-1/4 lg:w-1/5">
//               <div className="sticky top-24">
//                 <ProductFilter />
//               </div>
//             </aside>

//             {/* Products Content */}
//             <article className="w-full md:w-3/4 lg:w-4/5">
//               <div className="bg-white p-4 md:p-6 rounded-md shadow mb-6">
//                 <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//                   <p className="text-gray-700 text-sm md:text-base">
//                     Showing <span className="font-semibold">{products.length}</span> products
//                   </p>
//                   <div className="flex items-center gap-2">
//                     <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
//                     <select
//                       id="sort"
//                       className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
//                     >
//                       <option value="featured">Featured</option>
//                       <option value="price-low">Price: Low to High</option>
//                       <option value="price-high">Price: High to Low</option>
//                       <option value="newest">Newest First</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Products List */}
//               <div className="transition-all duration-300">
//                 <ProductList products={products} />
//               </div>

//               {/* No Products Found */}
//               {products.length === 0 && !isLoading && (
//                 <div className="bg-white p-12 rounded-md shadow text-center">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
//                   <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
//                 </div>
//               )}
//             </article>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

// export default Allproducts;
