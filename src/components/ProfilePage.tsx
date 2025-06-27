import React, { useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import { User, Mail, Phone, Gift, Edit, Check, X, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout, updateProfile } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [editedName, setEditedName] = useState(user?.username || "");
  const [editedPhone, setEditedPhone] = useState(user?.phone || undefined);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  if (!user) {
    return (
      <div className="text-center py-12">
        Please log in to view your profile
      </div>
    );
  }

  const handleNameEdit = () => {
    if (isEditingName) {
      updateProfile({ username: editedName });
    }
    setIsEditingName(!isEditingName);
  };

  const handlePhoneEdit = () => {
    if (isEditingPhone) {
      updateProfile({ phone: editedPhone });
    } else {
      setEditedPhone(user.phone);
    }
    setIsEditingPhone(!isEditingPhone);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      updateProfile({ avatar: URL.createObjectURL(file) });
      setIsEditingAvatar(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary-100 to-primary-200 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
        </div>

        {/* Profile Content */}
        <div className="p-6 md:p-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={avatarPreview}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary-600 transition-colors"
              >
                <Edit size={16} />
              </button>

              {isEditingAvatar && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center space-y-2">
                  <button
                    onClick={triggerFileInput}
                    className="bg-white text-primary px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100"
                  >
                    Change Photo
                  </button>
                  <button
                    onClick={() => setIsEditingAvatar(false)}
                    className="bg-white text-gray-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-6">
            {/* Name */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-gray-600">
                  <User size={18} className="mr-2" />
                  <span className="text-sm font-medium">Full Name</span>
                </div>
                <button
                  onClick={handleNameEdit}
                  className="text-primary hover:text-primary-600 transition-colors"
                >
                  {isEditingName ? (
                    <div className="flex items-center">
                      <Check size={18} className="mr-1" />
                      <span className="text-sm">Save</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Edit size={14} className="mr-1" />
                      <span className="text-sm">Edit</span>
                    </div>
                  )}
                </button>
              </div>
              {isEditingName ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <h2 className="text-xl font-semibold text-dark">
                  {user.username}
                </h2>
              )}
            </div>

            {/* Email */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center text-gray-600 mb-2">
                <Mail size={18} className="mr-2" />
                <span className="text-sm font-medium">Email</span>
              </div>
              <p className="text-dark">{user.email}</p>
            </div>

            {/* Phone */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-gray-600">
                  <Phone size={18} className="mr-2" />
                  <span className="text-sm font-medium">Phone Number</span>
                </div>
                <button
                  onClick={handlePhoneEdit}
                  className="text-primary hover:text-primary-600 transition-colors"
                >
                  {isEditingPhone ? (
                    <div className="flex items-center">
                      <Check size={18} className="mr-1" />
                      <span className="text-sm">Save</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Edit size={14} className="mr-1" />
                      <span className="text-sm">Edit</span>
                    </div>
                  )}
                </button>
              </div>
              {isEditingPhone ? (
                <input
                  type="tel"
                  value={String(editedPhone)}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Add phone number"
                />
              ) : (
                <p className="text-dark">{"Not provided"}</p>
              )}
            </div>

            {/* Credits */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center text-gray-600 mb-2">
                <Coins size={18} className="mr-2" />
                <span className="text-sm font-medium">Your Credits</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-dark mr-2">
                  {user.credits}
                </span>
                <span className="text-primary bg-primary-50 px-2 py-1 rounded-full text-xs">
                  IngView COINS
                </span>
              </div>
            </div>

            {/* Referral */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center text-gray-600 mb-2">
                <Gift size={18} className="mr-2" />
                <span className="text-sm font-medium">Your Referral Code</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-dark font-medium">{user.referralCode}</p>
                  <p className="text-gray-600 text-sm">
                    Share this code with friends and earn 50 credits when they
                    sign up!
                  </p>
                </div>
                <button className="bg-primary-50 text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors">
                  Copy Code
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <div className="pt-4">
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="w-full bg-gray-100 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
