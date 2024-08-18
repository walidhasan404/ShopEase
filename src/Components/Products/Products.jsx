import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const productsPerPage = 10;

    useEffect(() => {
        const queryParams = new URLSearchParams({
            page: currentPage,
            limit: productsPerPage,
            searchQuery,
            selectedBrand,
            selectedCategory,
            selectedPriceRange
        }).toString();
    
        fetch(`http://localhost:3000/products?${queryParams}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                setTotalPages(data.totalPages);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, [currentPage, searchQuery, selectedBrand, selectedCategory, selectedPriceRange]);
    

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1);
    };

    const handlePriceRangeChange = (event) => {
        setSelectedPriceRange(event.target.value);
        setCurrentPage(1);
    };

    const filteredProducts = products
        .filter((product) => product.productName.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((product) => {
            if (selectedBrand === '') return true;
            return product.brandName.toLowerCase() === selectedBrand.toLowerCase();
        })
        .filter((product) => {
            if (selectedCategory === '') return true;
            return product.category.toLowerCase() === selectedCategory.toLowerCase();
        })
        .filter((product) => {
            if (selectedPriceRange === '') return true;
            const priceTag = product.price;
            if (selectedPriceRange === '0-500') return priceTag >= 0 && priceTag <= 500;
            if (selectedPriceRange === '501-1000') return priceTag >= 501 && priceTag <= 1000;
            if (selectedPriceRange === '1001-1500') return priceTag >= 1001 && priceTag <= 1500;
            if (selectedPriceRange === '1501-2000') return priceTag >= 1501 && priceTag <= 2000;
            if (selectedPriceRange === '2000+') return priceTag > 2000;
            return true;
        });

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <h3 className="text-center mb-6 font-bold text-2xl">All Products</h3>
            <div className='px-6 flex lg:justify-between gap-4'>
                <div className='flex gap-1'>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search for products..."
                        className="input input-bordered w-full max-w-xs mb-2"
                    />
                    <button className='btn'><BiSearch /></button>
                </div>
                <div className='flex gap-2'>
                    <select value={selectedBrand} onChange={handleBrandChange} className="select select-bordered">
                        <option value="">All Brands</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Apple">Apple</option>
                        <option value="Xiaomi">Xiaomi</option>
                        <option value="Microsoft">Microsoft</option>
                        <option value="Dell">Dell</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Google">Google</option>
                    </select>
                    <select value={selectedCategory} onChange={handleCategoryChange} className="select select-bordered">
                        <option value="">All Categories</option>
                        <option value="Smartphones">Smartphones</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Tablets">Tablets</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Wearables">Wearables</option>
                        <option value="Desktops">Desktops</option>
                        <option value="Outdoor & Sports">Sports</option>
                    </select>
                    <select value={selectedPriceRange} onChange={handlePriceRangeChange} className="select select-bordered">
                        <option value="">All Price Ranges</option>
                        <option value="0-500">$0 - $500</option>
                        <option value="501-1000">$501 - $1000</option>
                        <option value="1001-1500">$1001 - $1500</option>
                        <option value="1501-2000">$1501 - $2000</option>
                        <option value="2000+">$2000+</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="card bg-base-100 w-96 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                className="rounded-xl"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{product.productName}</h2>
                            <p>{product.description}</p>
                            <p className="text-lg font-bold">${product.price}</p>
                            <p>Category: {product.category}</p>
                            <p>Rating: {product.ratings}⭐</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <nav>
                    <ul className="pagination text-lg flex gap-3 lg:gap-6">
                        <li>
                            <button
                                onClick={handlePreviousPage}
                                className="page-link btn btn-primary"
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleNextPage}
                                className="page-link btn btn-primary"
                                disabled={currentPage >= totalPages}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Products;
