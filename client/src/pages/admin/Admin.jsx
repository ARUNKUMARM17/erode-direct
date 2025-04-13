// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import {
// 	AddProducts,
// 	AdminHome,
// 	AdminOrderDetails,
// 	AdminSidebar,
// 	Orders,
// 	ViewProducts,
// } from "../../components";

// const Admin = () => {
// 	return (
// 		<>
// 			<div className=" bg-base-200 ">
// 				<div className="w-full lg:w-9/12 mx-auto h-[91vh] flex bg-base-100  ">
// 					<div className="w-24 md:w-96 border-x-2">
// 						<AdminSidebar />
// 					</div>
// 					<div className="flex-1 sm:p-4">
// 						<Routes>
// 							<Route path="home" element={<AdminHome />} />
// 							<Route path="all-products" element={<ViewProducts />} />
// 							<Route path="add-product/:id" element={<AddProducts />} />
// 							<Route path="orders" element={<Orders />} />
// 							<Route path="order-details/:id" element={<AdminOrderDetails />} />
// 						</Routes>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default Admin;
import React from "react";
import { Route, Routes } from "react-router-dom";
import {
	AddProducts,
	AdminHome,
	AdminOrderDetails,
	AdminSidebar,
	Orders,
	ViewProducts,
} from "../../components";

const Admin = () => {
	return (
		<div className="w-full h-screen flex bg-gradient-to-r from-gray-100 to-gray-300 m-4 text-gray-800">
			{/* Sidebar */}
			<aside className="w-24 md:w-72 lg:w-80 xl:w-96 bg-white shadow-lg border-r border-gray-200 overflow-y-auto">
				<AdminSidebar />
			</aside>

			{/* Main Content */}
			<main className="flex-1 h-full overflow-y-auto px-6 py-4 bg-white rounded-tl-3xl shadow-inner">
				<Routes>
					<Route path="home" element={<AdminHome />} />
					<Route path="all-products" element={<ViewProducts />} />
					<Route path="add-product/:id" element={<AddProducts />} />
					<Route path="orders" element={<Orders />} />
					<Route path="order-details/:id" element={<AdminOrderDetails />} />
				</Routes>
			</main>
		</div>
	);
};

export default Admin;
