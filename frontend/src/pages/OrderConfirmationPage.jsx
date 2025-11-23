import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function OrderConfirmationPage() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    const fetchOrder = async () => {
        try {
            const response = await fetch(`/api/orders/${orderId}`);
            const data = await response.json();
            if (data.success) {
                setOrder(data.order);
            }
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-500 text-lg">Loading order details...</div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Order not found</h2>
                    <button onClick={() => navigate('/products')} className="btn-primary">
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="card-simple p-8 text-center">
                        <div className="mb-6">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-10 h-10 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h1
                                className="text-3xl font-bold text-gray-800 mb-2"
                                data-testid="success-message"
                            >
                                Order Placed Successfully! 🎉
                            </h1>
                            <p className="text-gray-600">Thank you for your purchase</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <div className="grid grid-cols-2 gap-4 text-left">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Order ID</p>
                                    <p className="text-lg font-bold text-gray-900" data-testid="order-id">
                                        #{order.id}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                                    <p className="text-lg font-bold text-gray-900" data-testid="order-total">
                                        ${order.total_amount.toFixed(2)}
                                    </p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-600 mb-1">Order Date</p>
                                    <p className="text-lg font-semibold text-gray-900" data-testid="order-date">
                                        {new Date(order.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {order.items && order.items.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
                                <div className="space-y-3">
                                    {order.items.map(item => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                                        >
                                            <img
                                                src={item.image_url}
                                                alt={item.product_name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1 text-left">
                                                <p className="font-semibold text-gray-800">{item.product_name}</p>
                                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                            </div>
                                            <p className="font-bold text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => navigate('/products')}
                            className="btn-primary"
                            data-testid="continue-shopping-button"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderConfirmationPage;
