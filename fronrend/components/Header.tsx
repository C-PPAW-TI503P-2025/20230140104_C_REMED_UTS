'use client';

interface User {
  id: number;
  role: 'admin' | 'user' | 'guest';
}

interface HeaderProps {
  user?: User | null;
  onLogout?: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">📚</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Library System</h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8">
              <a href="/" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
                Beranda
              </a>
            </nav>
            
            {user && (
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <p className="text-slate-900 font-semibold">User ID: {user.id}</p>
                  <p className="text-slate-600 text-xs capitalize">{user.role}</p>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                  >
                    Keluar
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
