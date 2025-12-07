import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { currentUser, loading } = useAuth();

  const isActive = (path) => router.pathname === path;

  return (
    <>
      {/* Top Bar - Mobile Only Logo */}
      <div className="fixed top-0 left-0 right-0 z-40 px-6 py-4 bg-gradient-to-b from-dark-bg/90 to-transparent pointer-events-none md:hidden">
        <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">
          SEDLČANY<span className="text-accent-primary">GO</span>
        </span>
      </div>

      {/* Bottom Navigation - Mobile First */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 md:top-0 md:bottom-auto md:bg-dark-glass md:border-b md:border-dark-border">
        <div className="mx-auto max-w-lg md:max-w-6xl">
          <div className="glass rounded-2xl md:rounded-none md:bg-transparent md:border-none px-6 py-3 md:px-0 flex justify-around md:justify-between items-center shadow-glass relative overflow-hidden">

            {/* Desktop Logo */}
            <div className="hidden md:block text-xl font-bold tracking-tight text-white">
              SEDLČANY<span className="text-accent-primary">GO</span>
            </div>

            <div className="flex items-center space-x-0 md:space-x-8 w-full md:w-auto justify-around md:justify-end">
              <Link href="/">
                <div className={`relative flex flex-col items-center group cursor-pointer ${isActive('/') ? 'text-accent-primary' : 'text-gray-400'}`}>
                  <div className="p-2 rounded-xl transition-all duration-300 group-hover:bg-white/5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-medium mt-1">Trasy</span>
                  {isActive('/') && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-2 w-1 h-1 bg-accent-primary rounded-full"
                    />
                  )}
                </div>
              </Link>

              {/* Profile/Auth Links */}
              {loading ? null : currentUser ? (
                <Link href="/profile">
                  <div className={`relative flex flex-col items-center group cursor-pointer ${isActive('/profile') ? 'text-accent-primary' : 'text-gray-400'}`}>
                    <div className="p-2 rounded-xl transition-all duration-300 group-hover:bg-white/5">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium mt-1">Profil</span>
                    {isActive('/profile') && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute -bottom-2 w-1 h-1 bg-accent-primary rounded-full"
                      />
                    )}
                  </div>
                </Link>
              ) : (
                <Link href="/login">
                  <div className={`relative flex flex-col items-center group cursor-pointer ${isActive('/login') ? 'text-accent-primary' : 'text-gray-400'}`}>
                    <div className="p-2 rounded-xl transition-all duration-300 group-hover:bg-white/5">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium mt-1">Přihlásit</span>
                  </div>
                </Link>
              )}

            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
