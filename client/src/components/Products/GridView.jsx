// import React from "react";
// import { Link } from "react-router-dom";
// import { formatPrice } from "../../utils/formatPrice";
// import { FcSearch } from "react-icons/fc";
// //  lazy load
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";
// // redux
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/slice/cartSlice";

// const GridView = ({ products }) => {
// 	const dispatch = useDispatch();
// 	if (!products.length) {
// 		return <h1 className="text-3xl font-bold">No Products Found</h1>;
// 	}

// 	function add2CartFunction(product) {
// 		dispatch(addToCart(product));
// 	}

// 	return (
// 		<div className=" flex flex-wrap gap-y-5 py-10 ">
// 			{products.map((product) => {
// 				const { id, imageURL, name, price } = product;
// 				return (
// 					<div key={id} className="mx-auto ">
// 						<div className="group">
// 							<div className="card w-72 shadow-md relative hover:scale-105 duration-300 items-center">
// 								<LazyLoadImage
// 									src={imageURL}
// 									alt={name}
// 									className="h-60 object-contain rounded-md"
// 									placeholderSrc="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
// 									effect="blur"
// 								/>
// 								<div className=" absolute top-0 right-0">
// 									<span className="badge badge-primary">Free Delivery</span>
// 								</div>
// 								<div className="my-4 items-center text-center">
// 									<h1 className="font-semibold py-2">{name}</h1>
// 									<p className="py-2 text-lg">{formatPrice(price)}</p>
// 								</div>
// 								<div className="absolute top-0 right-0 h-full w-full group-hover:bg-[rgba(0,0,0,0.5)] duration-300"></div>
// 								<Link to={`/product-details/${id}`}>
// 									<button className="absolute top-1/3 left-[45%] hidden group-hover:block transition-all ease-in duration-300">
// 										<FcSearch size={32} />
// 									</button>
// 								</Link>
// 								<button
// 									className="absolute bottom-1/3 left-[30%] btn btn-sm btn-primary hidden group-hover:block transition-all ease-in duration-300"
// 									onClick={() => add2CartFunction(product)}
// 								>
// 									Add to Cart
// 								</button>
// 							</div>
// 						</div>
// 					</div>
// 				);
// 			})}
// 		</div>
// 	);
// };

// export default React.memo(GridView);
// import React from "react";
// import { Link } from "react-router-dom";
// import { formatPrice } from "../../utils/formatPrice";
// import { FcSearch } from "react-icons/fc";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/slice/cartSlice";

// const GridView = ({ products }) => {
// 	const dispatch = useDispatch();

// 	if (!products.length) {
// 		return <h1 className="text-3xl font-bold text-center">No Products Found</h1>;
// 	}

// 	const add2CartFunction = (product) => {
// 		dispatch(addToCart(product));
// 	};

// 	return (
// 		<div className="py-10 px-4 sm:px-8 lg:px-16">
// 			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
// 				{products.map((product) => {
// 					const { id, imageURL, name, price } = product;
// 					return (
// 						<div
// 							key={id}
// 							className="bg-white shadow-lg rounded-2xl overflow-hidden relative hover:scale-[1.02] transition-transform duration-300"
// 						>
// 							<div className="relative">
// 								<LazyLoadImage
// 									src={imageURL}
// 									alt={name}
// 									className="w-full h-60 object-contain bg-gray-50"
// 									placeholderSrc="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
// 									effect="blur"
// 								/>
// 								<span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded shadow">
// 									Free Delivery
// 								</span>

// 								{/* Overlay */}
// 								<div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
// 									<Link to={`/product-details/${id}`}>
// 										<FcSearch size={32} className="hover:scale-110 transition" />
// 									</Link>
// 									<button
// 										className="btn btn-sm btn-primary shadow-md"
// 										onClick={() => add2CartFunction(product)}
// 									>
// 										Add to Cart
// 									</button>
// 								</div>
// 							</div>

// 							<div className="p-4 text-center">
// 								<h2 className="font-semibold text-lg line-clamp-1">{name}</h2>
// 								<p className="text-gray-600 mt-1 text-base">{formatPrice(price)}</p>
// 							</div>
// 						</div>
// 					);
// 				})}
// 			</div>
// 		</div>
// 	);
// };

// export default React.memo(GridView);
import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import { FcSearch } from "react-icons/fc";
// lazy load
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// redux
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";

const GridView = ({ products }) => {
  const dispatch = useDispatch();
  
  if (!products.length) {
    return (
      <div className="flex justify-center items-center py-16">
        <h1 className="text-3xl font-bold text-gray-700">No Products Found</h1>
      </div>
    );
  }

  function add2CartFunction(product) {
    dispatch(addToCart(product));
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-10">
      {products.map((product) => {
        const { id, imageURL, name, price } = product;
        return (
          <div key={id} className="flex justify-center">
            <div className="group w-full max-w-xs bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <LazyLoadImage
                  src={imageURL}
                  alt={name}
                  className="h-60 w-full object-contain p-4"
                  placeholderSrc="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
                  effect="blur"
                />
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">Free Delivery</span>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-300">
                  <div className="flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/product-details/${id}`} className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                        <FcSearch size={24} />
                      </button>
                    </Link>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      onClick={() => add2CartFunction(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 text-center">
                <h3 className="text-lg font-medium text-gray-800 truncate">{name}</h3>
                <p className="mt-2 text-lg font-semibold text-blue-600">{formatPrice(price)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(GridView);