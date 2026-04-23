import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Shield } from 'lucide-react';

export const SecurityComponent: React.FC = () => {
  const [userRole, setUserRole] = useState<'investor' | 'entrepreneur'>('investor');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpStep, setOtpStep] = useState(0);
  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);

  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const strength = calculatePasswordStrength(password);

  const getStrengthLabel = (s: number) => {
    if (s <= 1) return 'Very Weak';
    if (s <= 2) return 'Weak';
    if (s <= 3) return 'Fair';
    if (s <= 4) return 'Good';
    if (s <= 5) return 'Strong';
    return 'Very Strong';
  };

  const getStrengthColor = (s: number) => {
    if (s <= 1) return 'bg-red-500';
    if (s <= 2) return 'bg-orange-500';
    if (s <= 3) return 'bg-yellow-500';
    if (s <= 4) return 'bg-blue-500';
    if (s <= 5) return 'bg-green-500';
    return 'bg-green-600';
  };

  const getStrengthTextColor = (s: number) => {
    if (s <= 1) return 'text-red-600';
    if (s <= 2) return 'text-orange-600';
    if (s <= 3) return 'text-yellow-600';
    if (s <= 4) return 'text-blue-600';
    if (s <= 5) return 'text-green-600';
    return 'text-green-700';
  };

  const handleSend2FA = () => {
    setOtpStep(1);
    setShowOtpModal(true);
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setOtpStep(2);
      setOtp('');
      setTimeout(() => {
        setShowOtpModal(false);
        setOtpStep(0);
      }, 2000);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Security & Account</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Password & 2FA */}
          <div className="space-y-6">
            {/* Password Strength Meter */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6" /> Password Strength
              </h2>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter Password
              </label>
              <div className="relative mb-4">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type a password"
                  className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Strength Meter */}
              {password && (
                <div className="space-y-3">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all ${getStrengthColor(strength)}`}
                      style={{ width: `${(strength / 6) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-semibold ${getStrengthTextColor(strength)}`}>
                      {getStrengthLabel(strength)}
                    </span>
                    <span className="text-xs text-gray-600">{strength}/6</span>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2">
                      {password.length >= 8 ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-700">At least 8 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/[A-Z]/.test(password) ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-700">One uppercase letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/[0-9]/.test(password) ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-700">One number</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/[^a-zA-Z0-9]/.test(password) ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-700">One special character (!@#$%)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2FA Setup */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" /> Two-Factor Authentication
              </h2>

              <p className="text-gray-600 text-sm mb-4">
                Add an extra layer of security to your account
              </p>

              {otpStep === 0 && (
                <div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Not enabled:</strong> Your account doesn't have 2FA enabled yet
                    </p>
                  </div>
                  <button
                    onClick={handleSend2FA}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
                  >
                    Enable 2FA
                  </button>
                </div>
              )}

              {otpStep === 2 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    <span>
                      <strong>2FA Enabled!</strong> Your account is now more secure
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Role-Based Dashboard */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Account Role & Dashboard
            </h2>

            {/* Role Toggle */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Current Role: <span className="text-indigo-600 capitalize">{userRole}</span>
              </p>

              <div className="flex gap-2">
                {(['investor', 'entrepreneur'] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => setUserRole(role)}
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition capitalize ${
                      userRole === role
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Role-Based Dashboard Preview */}
            {userRole === 'investor' && (
              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h3 className="font-bold text-lg text-blue-900 mb-4">
                  👨‍💼 Investor Dashboard
                </h3>
                <ul className="space-y-3 text-sm text-blue-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Browse entrepreneurs
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Review pitch decks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Schedule meetings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Fund deals
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Track investments
                  </li>
                </ul>
              </div>
            )}

            {userRole === 'entrepreneur' && (
              <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                <h3 className="font-bold text-lg text-green-900 mb-4">
                  🚀 Entrepreneur Dashboard
                </h3>
                <ul className="space-y-3 text-sm text-green-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Browse investors
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Post opportunities
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Schedule pitches
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Receive funding
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Manage deals
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && otpStep === 1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Enter OTP</h3>
            <p className="text-gray-600 mb-4">
              We've sent a 6-digit code to your registered email
            </p>

            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className="w-full border-2 border-gray-300 rounded px-4 py-3 text-center text-2xl font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />

            <button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify OTP
            </button>

            <p className="text-gray-600 text-sm text-center mt-4">
              Didn't receive? <span className="text-indigo-600 cursor-pointer hover:underline">Resend</span>
            </p>
          </div>
        </div>
      )}

      {/* OTP Success Modal */}
      {showOtpModal && otpStep === 2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-600 mb-2">Success!</h3>
            <p className="text-gray-600">2FA has been enabled on your account</p>
          </div>
        </div>
      )}
    </div>
  );
};