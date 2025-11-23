import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutPage({ user, cart, onClearCart }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        address: '',
        city: '',
        pincode: '',
        paymentMethod: 'cod'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate form
        if (!formData.name || !formData.address || !formData.city || !formData.pincode) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/cart/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    cartItems: cart,
                    customerInfo: formData,
                    totalAmount: subtotal
                })
            });

            const data = await response.json();

            if (data.success) {
                onClearCart();
                navigate(`/order-confirmation/${data.orderId}`);
            } else {
                setError(data.message || 'Checkout failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error('Checkout error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                    <button
                        onClick={() => navigate('/products')}
                        className="btn-primary"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/cart')}
                        className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
                    >
                        ← Back to Cart
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="card-simple p-6" data-testid="checkout-form">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Shipping Information</h2>

                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input-field"
                                        data-testid="name-input"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="pincode" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Pincode
                                    </label>
                                    <input
                                        id="pincode"
                                        name="pincode"
                                        type="text"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        className="input-field"
                                        data-testid="pincode-input"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Address
                                </label>
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="Street address, apartment, suite, etc."
                                    data-testid="address-input"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                                    City
                                </label>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="input-field"
                                    data-testid="city-input"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="paymentMethod" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Payment Method
                                </label>
                                <select
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                    className="input-field"
                                    data-testid="payment-method-select"
                                >
                                    <option value="cod">Cash on Delivery</option>
                                    <option value="card">Credit/Debit Card</option>
                                    <option value="upi">UPI</option>
                                </select>
                            </div>

                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                data-testid="place-order-button"
                            >
                                {loading ? 'Processing...' : 'Place Order'}
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="card-simple p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            {item.name} × {item.quantity}
                                        </span>
                                        <span className="font-semibold text-gray-900">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-3 space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Total Items:</span>
                                    <span className="font-semibold">{totalItems}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total Amount:</span>
                                    <span data-testid="checkout-total">${subtotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
