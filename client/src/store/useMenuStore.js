import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useWorkersStore } from "./useWorkersStore";

const API_END_POINT = "http://localhost:3000/api/v1/menu";
axios.defaults.withCredentials = true;

export const useMenuStore = create(persist((set) => ({
    loading: false,
    menu: null,
    createMenu: async (formData) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, menu: response.data.menu });
            }
            // update Workers
            useWorkersStore.getState().addMenuToWorkers(response.data.menu);
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            set({ loading: false });
        }
    },
    EditWorkerProfile: async (menuId, formData) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/${menuId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(response.data.success){
             toast.success(response.data.message);
             set({loading:false, menu:response.data.menu});
            }
            // update Workers menu
            useWorkersStore.getState().updateMenuToWorkers(response.data.menu);
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            set({ loading: false });
        }
    },
}), {
    name: "menu-name",
    storage: createJSONStorage(() => localStorage)
}));
