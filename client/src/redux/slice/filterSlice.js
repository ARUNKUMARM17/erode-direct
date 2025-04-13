// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
// 	filteredProducts: [],
// };

// const filterSlice = createSlice({
// 	name: "filter",
// 	initialState,
// 	reducers: {
// 		filterBySearch(state, action) {
// 			const { products, search } = action.payload;
// 			const tempProducts = products.filter(
// 				(item) =>
// 					item.name.toLowerCase().includes(search.toLowerCase()) ||
// 					item.category.toLowerCase().includes(search.toLowerCase()) ||
// 					item.brand.toLowerCase().includes(search.toLowerCase())
// 			);
// 			state.filteredProducts = tempProducts;
// 		},
// 		sortProducts(state, action) {
// 			const { products, sort } = action.payload;
// 			let tempProducts = [];
// 			let newProductsArray = [...products]; //! do not mutate the products array
// 			if (sort === "latest") {
// 				tempProducts = products;
// 			}
// 			if (sort === "lowest-price") {
// 				tempProducts = newProductsArray.sort((a, b) => a.price - b.price);
// 			}
// 			if (sort === "highest-price") {
// 				tempProducts = newProductsArray.sort((a, b) => b.price - a.price);
// 			}
// 			if (sort === "a2z") {
// 				tempProducts = newProductsArray.sort((a, b) => a.name.localeCompare(b.name));
// 			}
// 			if (sort === "z2a") {
// 				tempProducts = newProductsArray.sort((a, b) => b.name.localeCompare(a.name));
// 			}

// 			state.filteredProducts = tempProducts;
// 		},
// 		filterByCategory(state, action) {
// 			const { products, category } = action.payload;
// 			let tempProducts = [];
// 			let newProductsArray = [...products]; //! do not mutate the products array
// 			if (category === "All") {
// 				tempProducts = newProductsArray;
// 			} else {
// 				tempProducts = newProductsArray.filter((item) => item.category === category);
// 			}
// 			state.filteredProducts = tempProducts;
// 		},
// 		filterByBrand(state, action) {
// 			const { products, brand } = action.payload;
// 			let tempProducts = [];
// 			let newProductsArray = [...products]; //! do not mutate the products array
// 			if (brand === "all") {
// 				tempProducts = newProductsArray;
// 			} else {
// 				tempProducts = newProductsArray.filter((item) => item.brand === brand);
// 			}
// 			state.filteredProducts = tempProducts;
// 		},
// 		filterByprice(state, action) {
// 			const { products, price } = action.payload;
// 			let tempProducts = [];
// 			let newProductsArray = [...products];
// 			tempProducts = newProductsArray.filter((item) => item.price <= price);
// 			state.filteredProducts = tempProducts;
// 		},
// 	},
// });

// export const { filterBySearch, sortProducts, filterByCategory, filterByBrand, filterByprice } =
// 	filterSlice.actions;

// export default filterSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  filteredProducts: [],
  filters: {
    search: "",
    category: "All",
    brand: "All", // This can now be either "All" or an array of selected brands
    price: 10000, // Default to a high value - this should be set to maxPrice when the app initializes
    sort: "latest"
  }
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters(state, action) {
      // Update specific filter value
      state.filters = { ...state.filters, ...action.payload };
    },
    
    updateFilteredProducts(state, action) {
      const { products } = action.payload;
      let tempProducts = [...products];
      const { search, category, brand, price, sort } = state.filters;
      
      // Apply search filter
      if (search) {
        tempProducts = tempProducts.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase()) ||
            item.brand.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      // Apply category filter
      if (category !== "All") {
        tempProducts = tempProducts.filter((item) => item.category === category);
      }
      
      // Apply brand filter - now supports multiple brand selection
      if (brand !== "All") {
        if (Array.isArray(brand)) {
          // If brand is an array, show products that match any of the selected brands
          tempProducts = tempProducts.filter((item) => brand.includes(item.brand));
        } else {
          // For backward compatibility - if brand is a string
          tempProducts = tempProducts.filter((item) => item.brand === brand);
        }
      }
      
      // Apply price filter
      if (price > 0) {
        tempProducts = tempProducts.filter((item) => item.price <= price);
      }
      
      // Apply sorting
      if (sort === "lowest-price") {
        tempProducts = [...tempProducts].sort((a, b) => a.price - b.price);
      } else if (sort === "highest-price") {
        tempProducts = [...tempProducts].sort((a, b) => b.price - a.price);
      } else if (sort === "a2z") {
        tempProducts = [...tempProducts].sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === "z2a") {
        tempProducts = [...tempProducts].sort((a, b) => b.name.localeCompare(a.name));
      }
      // "latest" sorting is assumed to be the default order of products
      
      state.filteredProducts = tempProducts;
    },
    
    clearFilters(state, action) {
      const maxPrice = action.payload?.maxPrice || state.filters.price;
      state.filters = {
        search: "",
        category: "All",
        brand: "All",
        price: maxPrice,
        sort: "latest"
      };
    },
    
    // For compatibility with any existing code that might use these functions
    // These are just wrappers around the new functions
    filterBySearch(state, action) {
      const { search } = action.payload;
      state.filters.search = search;
    },
    
    sortProducts(state, action) {
      const { sort } = action.payload;
      state.filters.sort = sort;
    },
    
    filterByCategory(state, action) {
      const { category } = action.payload;
      state.filters.category = category;
    },
    
    filterByBrand(state, action) {
      const { brand } = action.payload;
      state.filters.brand = brand;
    },
    
    filterByprice(state, action) {
      const { price } = action.payload;
      state.filters.price = price;
    }
  },
});
export const { 
  setFilters, 
  updateFilteredProducts, 
  clearFilters,
  filterBySearch,
  sortProducts,
  filterByCategory,
  filterByBrand,
  filterByprice
} = filterSlice.actions;
export default filterSlice.reducer;