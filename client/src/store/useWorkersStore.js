import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const API_END_POINT = "http://localhost:3000/api/v1/Workers";
axios.defaults.withCredentials = true;

export const useWorkersStore = create(
  persist(
    (set, get) => ({
      loading: false,
      Workers: null,
      searchedWorkers: null,
      appliedFilter: [],
      singleWorkers: null,
      WorkersOrder: [],

      createWorkers: async (formData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "An error occurred");
          set({ loading: false });
        }
      },

      getWorkers: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/`);
          if (response.data.success) {
            set({ loading: false, Workers: response.data.Workers });
          }
        } catch (error) {
          if (error.response?.status === 404) {
            set({ Workers: null });
          }
          set({ loading: false });
        }
      },

      updateWorkers: async (formData) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "An error occurred");
          set({ loading: false });
        }
      },

      searchWorkers: async (searchText, searchQuery, selectedCuisines) => {
        try {
          set({ loading: true });

          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines.join(","));

          const response = await axios.get(
            `${API_END_POINT}/search/${searchText}?${params.toString()}`
          );
          if (response.data.success) {
            set({ loading: false, searchedWorkers: response.data });
          }
        } catch (error) {
          set({ loading: false });
        }
      },

      addMenuToWorkers: (menu) => {
        set((state) => ({
          Workers: state.Workers
            ? { ...state.Workers, menus: [...state.Workers.menus, menu] }
            : null,
        }));
      },

      updateMenuToWorkers: (updatedMenu) => {
        set((state) => {
          if (state.Workers) {
            const updatedMenuList = state.Workers.menus.map((menu) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return {
              Workers: {
                ...state.Workers,
                menus: updatedMenuList,
              },
            };
          }
          return state;
        });
      },

      setAppliedFilter: (value) => {
        set((state) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item) => item !== value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter };
        });
      },

      resetAppliedFilter: () => {
        set({ appliedFilter: [] });
      },

      getSingleWorkers: async (WorkersId) => {
        try {
          const response = await axios.get(`${API_END_POINT}/${WorkersId}`);
          if (response.data.success) {
            set({ singleWorkers: response.data.Workers });
          }
        } catch (error) {}
      },

      getWorkersOrders: async () => {
        try {
          const response = await axios.get(`${API_END_POINT}/order`);
          if (response.data.success) {
            set({ WorkersOrder: response.data.orders });
          }
        } catch (error) {
          console.log(error);
        }
      },

      updateWorkersOrder: async (orderId, status) => {
        try {
          const response = await axios.put(
            `${API_END_POINT}/order/${orderId}/status`,
            { status },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            const updatedOrder = get().WorkersOrder.map((order) =>
              order._id === orderId ? { ...order, status: response.data.status } : order
            );
            set({ WorkersOrder: updatedOrder });
            toast.success(response.data.message);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "An error occurred");
        }
      },
    }),
    {
      name: "Workers-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
