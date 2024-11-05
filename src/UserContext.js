// UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getProfilePhoto } from "./api/auth";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children, user }) => {
  const [imageUrl, setImageUrl] = useState("");

  // Fetch profile photo once on component mount
  useEffect(() => {
    if (user) {
      fetchProfilePhoto();
    }
  }, [user]);

  const fetchProfilePhoto = async () => {
    try {
      const result = await getProfilePhoto(user);
      const photoUrl = result.data.photoUrl;
      setImageUrl(photoUrl);
    } catch (error) {
      console.error("Error fetching profile photo:", error);
    }
  };

  const updateProfilePhoto = (newUrl) => {
    setImageUrl(newUrl);
  };

  return (
    <UserContext.Provider value={{ imageUrl, updateProfilePhoto }}>
      {children}
    </UserContext.Provider>
  );
};
