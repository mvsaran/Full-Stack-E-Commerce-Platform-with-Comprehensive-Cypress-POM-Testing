function ProductCard({ product, onAddToCart }) {
    return (
        <div className="card overflow-hidden" data-testid="product-card">
            <div className="h-48 overflow-hidden bg-gray-100">
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
            </div>

            <div className="p-5">
                <div className="mb-2">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {product.category}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2" data-testid="product-name">
                    {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-2xl font-bold text-gray-900" data-testid="product-price">
                            ${product.price.toFixed(2)}
                        </span>
                        <p className="text-xs text-gray-500">
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </p>
                    </div>

                    <button
                        onClick={() => onAddToCart(product)}
                        disabled={product.stock === 0}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${product.stock > 0
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        data-testid="add-to-cart-button"
                    >
                        {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
