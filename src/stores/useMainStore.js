import { defineStore } from "pinia";
import { ref } from "vue";

export const useMainStore = defineStore('mainStore', () => {
    const users = ref([
        {
            id: 0,
            fullName: 'Super User',
            username: 'admin@gmail.com',
            password: 'admin123',
            role: 'ADMIN',
            gender: 'Ер адам'
        },
    ])
    const current = ref(null)

    return { current, users }
}, { persist: 'true' })