"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Monitor, Lock, User } from "lucide-react";

export default function LoginPage() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("authenticated!");
    if (auth === "true") {
      router.push("/home");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validUsername = process.env.NEXT_PUBLIC_LOGIN_USERNAME;
    const validPassword = process.env.NEXT_PUBLIC_LOGIN_PASSWORD;

    if (username === validUsername && password === validPassword) {
      localStorage.setItem("authenticated!", "true");
      router.push("/home");
    } else {
      alert("Incorrect username or password!");
    }

    setLoading(false);
  };

  useEffect(() => {
    console.log("ENV username:", process.env.NEXT_PUBLIC_LOGIN_USERNAME);
    console.log("ENV password:", process.env.NEXT_PUBLIC_LOGIN_PASSWORD);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm mb-4">
            <Monitor className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold text-slate-200 mb-2">UpTime</h1>
          <p className="text-slate-400">Service Monitoring System</p>
        </div>

        <div className="bg-slate-900/80 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm">
          {!showLoginForm ? (
            <div className="p-8 text-center">
              <p className="text-slate-400 mb-8">
                Monitor your services in real time with our advanced uptime
                platform.
              </p>
              <button
                onClick={() => setShowLoginForm(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-slate-200">Login</h2>
                <button
                  onClick={() => setShowLoginForm(false)}
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    User
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-blue-500/25 disabled:shadow-none flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-transparent border-t-white border-r-white/50 mr-2"></div>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
