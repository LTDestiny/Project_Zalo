/**
 * Custom hook for managing user status
 */

import { useEffect } from "react";
import { useAppSelector } from "@/store/store";
import { userApi } from "@/services/api/userApi";
import { UserStatus } from "@/types/user.types";

/**
 * Hook to manage user online/offline status
 */
export const useUserStatus = () => {
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user?.id) return;

    // Set status to ONLINE on mount
    userApi.updateStatus(user.id, UserStatus.ONLINE).catch(console.error);

    // Set status to OFFLINE on unmount
    return () => {
      userApi.updateStatus(user.id, UserStatus.OFFLINE).catch(console.error);
    };
  }, [user?.id]);

  const updateStatus = async (status: UserStatus) => {
    if (!user?.id) return;

    try {
      await userApi.updateStatus(user.id, status);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return { updateStatus };
};
