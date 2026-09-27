import React, { useState } from 'react';
import { X, UserCircle, KeyRound, Shield, AlertCircle } from 'lucide-react';
import { api, setAuthToken } from '../services/api';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('surveyor@cadastral.gov.in');
  const [password, setPassword] = useState('Password@123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setIsLoading(true);
      const res = await api.login({ email, password });
      setAuthToken(res.data.token);
      onLoginSuccess(res.data.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('Password@123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-850">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-cadastral-950 border border-cadastral-700/50 text-cadastral-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-100">Official Cadastral Portal Login</h3>
              <p className="text-[11px] text-slate-400">Role-Based Access Control Authentication</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {error && (
            <div className="p-2.5 rounded bg-rose-950/60 border border-rose-800/60 text-rose-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-slate-300 font-medium mb-1">Official Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-slate-100 focus:ring-1 focus:ring-cadastral-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-slate-100 focus:ring-1 focus:ring-cadastral-500 focus:outline-none"
            />
          </div>

          {/* Quick Switch Profiles for Demonstration */}
          <div className="p-3 bg-slate-800/40 border border-slate-700/50 rounded-lg space-y-2">
            <div className="text-[10px] uppercase font-semibold text-slate-400">Quick Switch Demo Accounts:</div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('surveyor@cadastral.gov.in')}
                className="p-1.5 text-[11px] bg-slate-800 hover:bg-slate-700 text-blue-300 rounded border border-slate-700 text-left truncate"
              >
                Surveyor (Rajesh)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@cadastral.gov.in')}
                className="p-1.5 text-[11px] bg-slate-800 hover:bg-slate-700 text-purple-300 rounded border border-slate-700 text-left truncate"
              >
                Director Admin (Arvind)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('analyst@cadastral.gov.in')}
                className="p-1.5 text-[11px] bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded border border-slate-700 text-left truncate"
              >
                GIS Lead (Priya)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('field@cadastral.gov.in')}
                className="p-1.5 text-[11px] bg-slate-800 hover:bg-slate-700 text-amber-300 rounded border border-slate-700 text-left truncate"
              >
                Field Officer (Vikram)
              </button>
            </div>
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-1.5 rounded-md bg-cadastral-600 hover:bg-cadastral-500 text-white font-medium shadow transition-colors"
            >
              {isLoading ? 'Signing in...' : 'Authenticate Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
