import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const API_END_POINT = "https://rozgar-server.onrender.com/api/v1/user";
axios.defaults.withCredentials = true;

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,
      // signup api implementation
      signup: async (input) => {
        try {
          console.log("helo");
          set({ loading: true });
          
          const response = await axios.post(`${API_END_POINT}/signup`, input, {
            headers: { "Content-Type": "application/json" },
          });
          console.log(response)
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: response.data.user, isAuthenticated: true });
          } else {
            set({ loading: false }); // ✅ Ensure loading is set to false
            throw new Error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Signup failed"); // ✅ Correct way
          console.log(error.response?.data?.message); // ✅ Debugging
          set({ loading: false });
          throw error;
        }
        
        
        
      },
      login: async (input) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/login`,
            input,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
      
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: response.data.user, isAuthenticated: true });
          }
        } catch (error) {
          console.error("Login error:", error); // Debugging
      
          // Handle cases where error.response is undefined
          const errorMessage =
            error.response?.data?.message || "Something went wrong. Please try again.";
          
          toast.error(errorMessage);
          set({ loading: false });
        }
      },      
      verifyEmail: async (verificationCode) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/verify-email`,
            { verificationCode },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: response.data.user, isAuthenticated: true });
          }
        } catch (error) {
          toast.success(error.response.data.message);
          set({ loading: false });
        }
      },
      checkAuthentication: async () => {
        try {
            set({ isCheckingAuth: true });
    
            const response = await axios.get(`${API_END_POINT}/check-auth`, {
                withCredentials: true,  // Ensures cookies are sent along with the request
            });
    
            if (response.data.success) {
                set({
                    user: response.data.user,
                    isAuthenticated: true,
                    isCheckingAuth: false,
                });
            }
        } catch (error) {
            set({ isAuthenticated: false, isCheckingAuth: false });
        }
    },    
      logout: async () => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/logout`);
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: null, isAuthenticated: false });
          }
        } catch (error) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
      forgotPassword: async (email) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/forgot-password`,
            { email }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
      resetPassword: async (take) => {
        try {
          console.log("efr");
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/reset-password`,
            { take }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
      updateProfile: async (input) => {
        try {
          const response = await axios.put(
            `${API_END_POINT}/profile/update`,
            input,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ user: response.data.user, isAuthenticated: true });
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
    }),
    {
      name: "user-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);