import React from 'react';
import { useLocation, Link } from 'react-router-dom';

interface AnalyticsLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: 'Overview', icon: '⊞', path: '/analytics' },
  { label: 'Users', icon: '👤', path: '/analytics/users' },
  { label: 'Messages', icon: '💬', path: '/analytics/messages' },
  { label: 'Calls', icon: '📞', path: '/analytics/calls' },
  { label: 'Groups', icon: '👥', path: '/analytics/groups' },
  { label: 'Security', icon: '🔒', path: '/analytics/security' },
];

const AnalyticsLayout: React.FC<AnalyticsLayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/analytics') return location.pathname === '/analytics';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col py-6 px-3 shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 mb-8">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            Z
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm leading-tight">Analytics</p>
            <p className="text-xs text-gray-500">Zalo Enterprise</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Settings */}
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <span className="text-base">⚙️</span>
          Settings
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AnalyticsLayout;
