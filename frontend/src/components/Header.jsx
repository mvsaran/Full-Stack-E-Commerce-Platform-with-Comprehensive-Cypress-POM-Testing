import { Link } from 'react-router-dom';

function Header({ user, cartCount, onLogout }) {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/products">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        🛍️ ShopHub
                    </h1>
                </Link>

                <div className="flex items-center gap-6">
                    <span className="text-gray-700" data-testid="user-name">
                        Hello, <span className="font-semibold">{user?.name}</span>
                    </span>

                    <Link to="/cart" className="relative">
                        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            {cartCount > 0 && (
                                <span
                                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                                    data-testid="cart-count"
                                >
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </Link>

                    <button
                        onClick={onLogout}
                        className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                        data-testid="logout-button"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
