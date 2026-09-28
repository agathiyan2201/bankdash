import { createContext, useContext, useEffect, useState } from 'react';
import defaultAvatar from '../assets/avatars/profile.jpg';

/*
 * Holds the profile photo so the Topbar and Settings always show the same image.
 * To change the default photo for everyone: replace src/assets/avatars/profile.jpg
 * (keep the same file name, or change the import above).
 * A photo uploaded in Settings is kept in this browser (localStorage).
 */
const KEY = 'bankdash-avatar-v2'; // new key so the new default photo shows instead of an old saved one
const UserContext = createContext(null);

function readSaved() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function UserProvider({ children }) {
  const [avatar, setAvatarState] = useState(() => readSaved() || defaultAvatar);
  const [name, setName] = useState('Charlene Reed');

  const setAvatar = (src) => setAvatarState(src || defaultAvatar);

  useEffect(() => {
    try {
      if (avatar === defaultAvatar) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, avatar);
    } catch {
      /* storage full or blocked: the photo still shows for this session */
    }
  }, [avatar]);

  return (
    <UserContext.Provider value={{ avatar, setAvatar, isDefaultAvatar: avatar === defaultAvatar, name, setName }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
