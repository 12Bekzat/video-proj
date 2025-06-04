import { useMainStore } from "@/stores/useMainStore";
import { storeToRefs } from "pinia";

export const useQueries = () => {
  const store = useMainStore();
  const { users, current } = storeToRefs(store);

  const login = ({ username, password }) => {
    console.log(users.value);
    
    return users.value.find(
      (user) => user.username === username && user.password === password
    );
  };

  const register = (user) => {
    users.value.push({ id: Math.random(), ...user });
  };

  const removeUser = (id) => {
    users.value = users.value.filter((user) => user.id !== id);
  };

  const updateUser = (id, newUser) => {
    users.value = users.value.map((user) =>
      user.id === id ? { ...newUser, id } : user
    );

    current.value = login({ username: newUser.username, password: newUser.password })
  };

  return { login, register, removeUser, updateUser };
};
