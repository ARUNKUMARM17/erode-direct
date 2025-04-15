
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, updateFilteredProducts, clearFilters } from "../../redux/slice/filterSlice";
import { formatPrice } from "../../utils/formatPrice";
import { getUniqueValues } from "../../utils/uniqueValues";
import { Filter, X, ChevronDown } from "lucide-react";

const ProductFilter = () => {
  const { products, minPrice: globalMinPrice, maxPrice: globalMaxPrice } = useSelector((store) => store.product);
  const { filters } = useSelector((store) => store.filter);
  const dispatch = useDispatch();

  const { category, brand, price, sort } = filters;
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState([]);
  
  // Dynamic price range states
  const [dynamicMinPrice, setDynamicMinPrice] = useState(globalMinPrice);
  const [dynamicMaxPrice, setDynamicMaxPrice] = useState(globalMaxPrice);
  const [userSetPrice, setUserSetPrice] = useState(false);
  
  // Getting unique categories
  const allCategories = getUniqueValues(products, "category");
  
  // Get filtered products based on current category and brand selections
  const getFilteredProductsForPriceRange = () => {
    let filteredProducts = [...products];
    
    // Apply category filter
    if (category !== "All") {
      filteredProducts = filteredProducts.filter(item => item.category === category);
    }
    
    // Apply brand filter
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter(item => selectedBrands.includes(item.brand));
    }
    
    return filteredProducts;
  };
  
  // Get brands based on selected category
  const getCategoryBrands = () => {
    if (category === "All") {
      return getUniqueValues(products, "brand");
    } else {
      const filteredProducts = products.filter(product => product.category === category);
      return getUniqueValues(filteredProducts, "brand");
    }
  };
  
  const categoryBrands = getCategoryBrands();
  
  // Initialize selected brands when category changes
  useEffect(() => {
    // Convert brand filter value to array if it's not already
    if (typeof brand === 'string' && brand !== "All") {
      setSelectedBrands([brand]);
    } else if (Array.isArray(brand)) {
      setSelectedBrands(brand);
    } else {
      setSelectedBrands([]);
    }
  }, [brand, category]);

  // Update price range when category or brand changes
  useEffect(() => {
    // Only update price range if the user hasn't manually adjusted it
    // or if the category/brand has changed
    const filteredProducts = getFilteredProductsForPriceRange();
    
    if (filteredProducts.length > 0) {
      // Find the min and max prices in the filtered products
      const prices = filteredProducts.map(product => product.price);
      const newMinPrice = Math.min(...prices);
      const newMaxPrice = Math.max(...prices);
      
      setDynamicMinPrice(newMinPrice);
      setDynamicMaxPrice(newMaxPrice);
      
      // Update the price filter if user hasn't set it manually
      // or if the current price is outside the new range
      if (!userSetPrice || price < newMinPrice || price > newMaxPrice) {
        dispatch(setFilters({ price: newMaxPrice }));
        setUserSetPrice(false);
      }
    } else {
      // If no products match the filters, reset to global values
      setDynamicMinPrice(globalMinPrice);
      setDynamicMaxPrice(globalMaxPrice);
      
      if (!userSetPrice) {
        dispatch(setFilters({ price: globalMaxPrice }));
      }
    }
  }, [category, selectedBrands, globalMinPrice, globalMaxPrice]);

  // Update filtered products whenever filters or products change
  useEffect(() => {
    dispatch(updateFilteredProducts({ products }));
  }, [dispatch, products, filters]);

  // Filter by category
  const handleCategoryChange = (c) => {
    // Reset brand selection when category changes
    dispatch(setFilters({ 
      category: c,
      brand: "All" 
    }));
    setSelectedBrands([]);
    setUserSetPrice(false);
  };

  // Handle brand checkbox change
  const handleBrandChange = (brandName) => {
    let updatedBrands;
    
    if (selectedBrands.includes(brandName)) {
      // Remove the brand if it's already selected
      updatedBrands = selectedBrands.filter(b => b !== brandName);
    } else {
      // Add the brand if it's not selected
      updatedBrands = [...selectedBrands, brandName];
    }
    
    setSelectedBrands(updatedBrands);
    
    // Update the filter with the new brands array
    // If no brands are selected, set to "All"
    dispatch(setFilters({ 
      brand: updatedBrands.length > 0 ? updatedBrands : "All" 
    }));
    
    setUserSetPrice(false);
  };

  // Filter by price
  const handlePriceChange = (e) => {
    setUserSetPrice(true);
    dispatch(setFilters({ price: Number(e.target.value) }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    dispatch(clearFilters({ maxPrice: globalMaxPrice }));
    setSelectedBrands([]);
    setUserSetPrice(false);
  };

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
              <button
                type="button"
                className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                  category === "All"
                    ? "bg-indigo-50 text-indigo-700 font-medium border-l-4 border-indigo-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => handleCategoryChange("All")}
              >
                All
              </button>
              {allCategories.filter(c => c !== "All").map((c, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                    category === c
                      ? "bg-indigo-50 text-indigo-700 font-medium border-l-4 border-indigo-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => handleCategoryChange(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Brand - Now with checkboxes */}
          <div className="border-b pb-6">
            <h3 className="font-semibold text-gray-700 mb-4 uppercase text-sm tracking-wider">Brand</h3>
            <div className="flex flex-col gap-y-2 max-h-60 overflow-y-auto">
              {categoryBrands.map((brandName, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brandName)}
                    onChange={() => handleBrandChange(brandName)}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="text-gray-700">{brandName}</span>
                </label>
              ))}
              {categoryBrands.length === 0 && (
                <p className="text-gray-500 italic">No brands available for this category</p>
              )}
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
              min={dynamicMinPrice}
              max={dynamicMaxPrice}
              onChange={handlePriceChange}
              style={{
                background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((price - dynamicMinPrice) / (dynamicMaxPrice - dynamicMinPrice)) * 100}%, #e5e7eb ${((price - dynamicMinPrice) / (dynamicMaxPrice - dynamicMinPrice)) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>{formatPrice(dynamicMinPrice)}</span>
              <span>{formatPrice(dynamicMaxPrice)}</span>
            </div>
          </div>

          {/* Clear Button */}
          <div className="pt-2">
            <button 
              className="flex items-center justify-center w-full gap-2 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg hover:from-red-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
              onClick={handleClearFilters}
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