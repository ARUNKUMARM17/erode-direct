// import { doc, getDoc } from "firebase/firestore";
// import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
// import { Link, useParams } from "react-router-dom";
// import { formatPrice } from "../../utils/formatPrice";
// import Loader from "../loader/Loader";
// import ReviewComponent from "../review/ReviewComponent";
// // Custom Hook
// import useFetchCollection from "../../hooks/useFetchCollection";
// //Lazy Load
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";
// // Firebase
// import { useEffect, useState } from "react";
// import { db } from "../../firebase/config";
// // Redux
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, decreaseCart, calculateTotalQuantity } from "../../redux/slice/cartSlice";

// const ProductDetails = () => {
// 	// get cart items from redux store
// 	const { cartItems } = useSelector((store) => store.cart);
// 	const [product, setProduct] = useState({});
// 	const [isLoading, setIsLoading] = useState(false);
// 	const { id } = useParams();
// 	const dispatch = useDispatch();

// 	//! fetch Review Collection
// 	const { data } = useFetchCollection("reviews");

// 	// find the review which matches the current product
// 	const filteredReview = data.filter((item) => item.productId === id);

// 	//! fetch single product Document from products collection
// 	async function getSingleDocument() {
// 		setIsLoading(true);
// 		const docRef = doc(db, "products", id);
// 		const docSnap = await getDoc(docRef);
// 		if (docSnap.exists()) {
// 			setProduct(docSnap.data());
// 			setIsLoading(false);
// 		} else {
// 			console.log("No such document!");
// 			setIsLoading(false);
// 		}
// 	}
// 	// Fetching single document from firestore on initial component mount
// 	useEffect(() => {
// 		getSingleDocument();
// 	}, []);

// 	// Add to cart
// 	function add2CartFunction(product) {
// 		dispatch(addToCart({ ...product, id }));
// 		dispatch(calculateTotalQuantity());
// 	}
// 	// Decrease Qty
// 	function decreaseQty(product) {
// 		dispatch(decreaseCart({ ...product, id }));
// 		dispatch(calculateTotalQuantity());
// 	}
// 	// Check if the item is already present in the cart or not
// 	let currentItem = cartItems.find((item) => item.id === id);

// 	return (
// 		<>
// 			{isLoading && <Loader />}
// 			{/* <Breadcrumbs type={product.name} /> */}
// 			<section className="w-full mx-auto p-4 md:p-10 lg:w-9/12 md:px-6 ">
// 				<h1 className="text-2xl font-semibold">Product Details </h1>
// 				<Link to="/all" className="link ">
// 					&larr; Back to All Products
// 				</Link>
// 				<article className="flex flex-col md:flex-row items-start justify-between py-4 gap-x-4">
// 					<div className=" w-full md:w-1/3 flex items-center justify-center border-2">
// 						<LazyLoadImage
// 							src={product.imageURL}
// 							alt={product.name}
// 							className="w-96 h-96 object-contain "
// 							placeholderSrc="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
// 							effect="blur"
// 						/>
// 					</div>
// 					<div className="flex-1">
// 						<h1 className="text-3xl  mb-2">{product.name}</h1>
// 						<h2 className="text-primary  px-2 py-2 max-w-max  font-bold text-lg md:text-2xl mb-2">
// 							{formatPrice(product.price)}
// 						</h2>
// 						<p className="text-gray-500 mb-2">{product.description}</p>
// 						<p className="font-semibold mb-2">
// 							SKU : <span className="font-light">{id}</span>
// 						</p>
// 						<p className="font-semibold mb-2">
// 							Brand : <span className="font-light">{product.brand}</span>
// 						</p>
// 						{/* Button Group */}
// 						{cartItems.includes(currentItem) && (
// 							<div className="btn-group items-center mb-2">
// 								<button
// 									className="btn btn-sm btn-outline"
// 									onClick={() => decreaseQty(product)}
// 								>
// 									{" "}
// 									-
// 								</button>
// 								<button className="btn btn-lg btn-ghost disabled">
// 									{currentItem.qty}
// 								</button>
// 								<button
// 									className="btn btn-sm btn-outline"
// 									onClick={() => add2CartFunction(product)}
// 								>
// 									+
// 								</button>
// 							</div>
// 						)}

// 						<div>
// 							<button
// 								className="btn btn-primary btn-active"
// 								onClick={() => add2CartFunction(product)}
// 							>
// 								Add to Cart
// 							</button>
// 						</div>
// 					</div>
// 				</article>
// 				<section className="rounded-md shadow-lg">
// 					<div className=" w-full ">
// 						<h1 className="text-lg md:text-2xl font-semibold mt-2 p-2">Reviews</h1>
// 					</div>
// 					{!filteredReview.length ? (
// 						<p className="p-4">
// 							<Link to={`/review-product/${id}`} className="link link-primary ">
// 								Be the first one to review this product
// 							</Link>
// 						</p>
// 					) : (
// 						<div className="flex flex-col gap-4 p-2 ">
// 							{filteredReview.map((review, index) => {
// 								return <ReviewComponent review={review} key={index} />;
// 							})}
// 						</div>
// 					)}
// 				</section>
// 			</section>
// 		</>
// 	);
// };

// export default ProductDetails;
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import Loader from "../loader/Loader";
import ReviewComponent from "../review/ReviewComponent";
// Custom Hook
import useFetchCollection from "../../hooks/useFetchCollection";
//Lazy Load
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// Firebase
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCart, calculateTotalQuantity } from "../../redux/slice/cartSlice";

const ProductDetails = () => {
  // get cart items from redux store
  const { cartItems } = useSelector((store) => store.cart);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  //! fetch Review Collection
  const { data } = useFetchCollection("reviews");

  // find the review which matches the current product
  const filteredReview = data.filter((item) => item.productId === id);

  //! fetch single product Document from products collection
  async function getSingleDocument() {
    setIsLoading(true);
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProduct(docSnap.data());
      setIsLoading(false);
    } else {
      console.log("No such document!");
      setIsLoading(false);
    }
  }
  
  // Fetching single document from firestore on initial component mount
  useEffect(() => {
    getSingleDocument();
  }, []);

  // Add to cart
  function add2CartFunction(product) {
    dispatch(addToCart({ ...product, id }));
    dispatch(calculateTotalQuantity());
  }
  
  // Decrease Qty
  function decreaseQty(product) {
    dispatch(decreaseCart({ ...product, id }));
    dispatch(calculateTotalQuantity());
  }
  
  // Check if the item is already present in the cart or not
  let currentItem = cartItems.find((item) => item.id === id);

  return (
    <>
      {isLoading && <Loader />}
      
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb & Back button */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Details</h1>
            <Link to="/all" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to All Products
            </Link>
          </div>
          
          {/* Product details card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              {/* Image column - fixed width on larger screens */}
              <div className="md:w-2/5 lg:w-1/3 p-4 bg-white flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
                <LazyLoadImage
                  src={product.imageURL}
                  alt={product.name}
                  className="w-full h-80 md:h-96 object-contain"
                  placeholderSrc="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
                  effect="blur"
                />
              </div>
              
              {/* Details column - takes remaining space */}
              <div className="p-6 md:p-8 md:w-3/5 lg:w-2/3">
                <div className="flex flex-col h-full">
                  {/* Product info */}
                  <div className="flex-grow">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                    <p className="text-2xl font-bold text-blue-600 mb-4">{formatPrice(product.price)}</p>
                    
                    {/* Product description in scrollable container if too long */}
                    <div className="mb-6 max-h-40 md:max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <p className="text-gray-700">
                        <span className="font-medium">SKU:</span> <span className="text-gray-500">{id}</span>
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Brand:</span> <span className="text-gray-500">{product.brand}</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="pt-4 border-t border-gray-200">
                    {cartItems.includes(currentItem) ? (
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="inline-flex items-center rounded-md border border-gray-300">
                          <button 
                            className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-l-md text-xl font-medium"
                            onClick={() => decreaseQty(product)}
                          >
                            −
                          </button>
                          <span className="px-4 py-1 bg-white text-gray-700 font-medium">
                            {currentItem.qty}
                          </span>
                          <button 
                            className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-r-md text-xl font-medium"
                            onClick={() => add2CartFunction(product)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => add2CartFunction(product)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews section */}
          <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
            </div>
            
            <div className="p-6">
              {!filteredReview.length ? (
                <div className="py-4 text-center">
                  <p className="text-gray-500 mb-4">No reviews yet for this product.</p>
                  <Link 
                    to={`/review-product/${id}`} 
                    className="inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Be the first to write a review
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredReview.map((review, index) => (
                    <ReviewComponent review={review} key={index} />
                  ))}
                  
                  <div className="pt-4 text-center">
                    <Link 
                      to={`/review-product/${id}`} 
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Write a review
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;