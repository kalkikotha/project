import { useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import {
  User,
  Mail,
  Phone,
  Gift,
  Edit,
  Check,
  Coins,
  Bell,
  Crown,
  ArrowRightCircle,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout, updateProfile } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [editedName, setEditedName] = useState(user?.username || "");
  const [editedPhone, setEditedPhone] = useState(user?.phone || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(user?.referralCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  if (!user) {
    return (
      <div className="text-center py-4 text-text-primary">
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
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      updateProfile({ avatar: URL.createObjectURL(file) });
      setIsEditingAvatar(false);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-text-inverted rounded-3xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-brand to-brand-dark p-6 text-center">
          <h1 className="text-2xl font-bold text-text-inverted">My Profile</h1>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-text-inverted shadow-lg">
                <img
                  src={avatarPreview}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                className="absolute bottom-0 right-0 bg-brand text-text-inverted p-2 rounded-full hover:bg-brand-dark transition-colors"
              >
                <Edit size={16} />
              </button>

              {isEditingAvatar && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center space-y-2">
                  <button
                    onClick={triggerFileInput}
                    className="bg-text-inverted text-brand px-4 py-1 rounded-full text-sm font-medium hover:bg-bg-light"
                  >
                    Change Photo
                  </button>
                  <button
                    onClick={() => setIsEditingAvatar(false)}
                    className="bg-text-inverted text-text-secondary px-4 py-1 rounded-full text-sm font-medium hover:bg-bg-light"
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

          <div className="space-y-6">
            <div className="bg-bg-light rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-text-secondary">
                  <User size={18} className="mr-2" />
                  <span className="text-sm font-medium">Full Name</span>
                </div>
                <button
                  onClick={handleNameEdit}
                  className="text-brand hover:text-brand-dark transition-colors"
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
                  className="w-full px-3 py-2 border border-ui-gray rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                />
              ) : (
                <h2 className="text-xl font-semibold text-text-primary">
                  {user.username}
                </h2>
              )}
            </div>

            <div className="bg-bg-light rounded-xl p-4">
              <div className="flex items-center text-text-secondary mb-2">
                <Mail size={18} className="mr-2" />
                <span className="text-sm font-medium">Email</span>
              </div>
              <p className="text-text-primary">{user.email}</p>
            </div>

            <div className="bg-bg-light rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-text-secondary">
                  <Phone size={18} className="mr-2" />
                  <span className="text-sm font-medium">Phone Number</span>
                </div>
                <button
                  onClick={handlePhoneEdit}
                  className="text-brand hover:text-brand-dark transition-colors"
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
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-ui-gray rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder="Add phone number"
                />
              ) : (
                <p className="text-text-primary">
                  {editedPhone || "Not provided"}
                </p>
              )}
            </div>

            <div className="bg-bg-light rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-text-secondary">
                  <Crown size={18} className="mr-2" />
                  <span className="text-sm font-medium">Premium Access</span>
                </div>
                {user.subscriptionActive ? (
                  <div className="flex items-center text-green-500">
                    <CheckCircle size={18} className="mr-1" />
                    <span className="text-sm">Subscribed</span>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/subscription")}
                    className="text-brand hover:text-brand-dark transition-colors text-sm font-medium flex items-center"
                  >
                    <ArrowRightCircle size={16} className="mr-1" />
                    <span>Upgrade Now</span>
                  </button>
                )}
              </div>
              <p className="text-text-primary text-sm mt-1">
                {user.subscriptionActive
                  ? "Your yearly premium subscription is active - full content access"
                  : "Get full access to all content with our yearly premium plan"}
              </p>
              {/* {user.subscriptionActive && (
                <div className="mt-2 text-xs text-text-secondary flex items-center">
                  <Calendar size={12} className="mr-1" />
                  <span>Renews on: {user.subscriptionRenewalDate}</span>
                </div>
              )} */}
            </div>

            <div className="bg-bg-light rounded-xl p-4">
              <div className="flex items-center text-text-secondary mb-2">
                <Coins size={18} className="mr-2" />
                <span className="text-sm font-medium">Your Credits</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-text-primary mr-2">
                  {user.credits}
                </span>
                <span className="text-brand bg-brand-light px-2 py-1 rounded-full text-xs">
                  IngView COINS
                </span>
              </div>
            </div>

            <div className="bg-bg-light rounded-xl p-4">
              <div className="flex items-center text-text-secondary mb-2">
                <Gift size={18} className="mr-2" />
                <span className="text-sm font-medium">Your Referral Code</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-text-primary font-medium">
                    {user.referralCode}
                  </p>
                  <p className="text-text-secondary text-sm">
                    Share this code with friends and earn 50 credits when they
                    sign up!
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className="bg-brand-light text-brand px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand/20 transition-colors"
                >
                  {isCopied ? "Copied!" : "Copy Code"}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="w-full bg-bg-light text-text-secondary py-3 rounded-lg font-medium hover:bg-bg-dark transition-colors"
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
