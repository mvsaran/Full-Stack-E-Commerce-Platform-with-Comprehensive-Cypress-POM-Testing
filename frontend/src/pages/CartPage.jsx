import { useNavigate } from 'react-router-dom';

function CartPage({ cart, onUpdateQuantity, onRemoveFromCart }) {
    const navigate = useNavigate();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleCheckout = () => {
        if (cart.length > 0) {
            navigate('/checkout');
        }
    };

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/products')}
                        className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
                    >
                        ← Back to Products
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div className="card-simple p-16 text-center">
                        <div className="text-6xl mb-4">🛒</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                        <p className="text-gray-600 mb-6">Add some products to get started!</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="btn-primary"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="card-simple divide-y">
                                {cart.map(item => (
                                    <div key={item.id} className="p-6 flex gap-4" data-testid="cart-item">
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />

                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-800" data-testid="cart-item-name">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                ${item.price.toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-end justify-between">
                                            <button
                                                onClick={() => onRemoveFromCart(item.id)}
                                                className="text-red-600 hover:text-red-700 text-sm font-semibold"
                                                data-testid="remove-item-button"
                                            >
                                                Remove
                                            </button>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold"
                                                    data-testid="decrease-quantity"
                                                >
                                                    -
                                                </button>
                                                <span className="w-12 text-center font-semibold" data-testid="item-quantity">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold"
                                                    data-testid="increase-quantity"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <p className="text-lg font-bold text-gray-900" data-testid="item-total">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="card-simple p-6 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Total Items:</span>
                                        <span className="font-semibold" data-testid="total-items">{totalItems}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal:</span>
                                        <span className="font-semibold" data-testid="subtotal">
                                            ${subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                                        <span>Total:</span>
                                        <span data-testid="total">${subtotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full btn-primary"
                                    data-testid="proceed-to-checkout"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartPage;
