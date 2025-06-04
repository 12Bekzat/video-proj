<template>
  <div class="profile">
    <div class="profile__img">
      <Avatar
        label="P"
        shape="circle"
        size="xlarge"
        style="width: 200px; height: 200px"
      />
    </div>
    <div class="profile__info">
      <div class="profile__title">
        {{ current?.fullName || "No Full name" }}
      </div>
      <div class="profile__text">
        {{ getRole(current?.role) }}
      </div>
    </div>
    <div class="profile__manage">
      <Button
        label="Өңдеу"
        icon="pi pi-pen-to-square"
        @click="visible = true"
      />
      <Button
        label="Шығу"
        severity="danger"
        icon="pi pi-sign-out"
        @click="signOut"
      />
    </div>
  </div>
  <Dialog v-model:visible="visible" modal>
    <div class="modal">
      <div class="modal__title">Пайдаланушы Өзгерту</div>
      <FloatLabel style="width: 100%">
        <InputText
          id="fullName"
          v-model="item.fullName"
          style="width: 100%"
          :invalid="invalid"
        />
        <label for="fullName">ТАӘ</label>
      </FloatLabel>
      <Button label="Өзгерту" @click="save" />
    </div>
  </Dialog>
</template>
<script setup>
import { useQueries } from "@/composables/useQueries";
import { useMainStore } from "@/stores/useMainStore";
import { storeToRefs } from "pinia";
import {
  Avatar,
  Button,
  Dialog,
  FloatLabel,
  InputText,
  MeterGroup,
} from "primevue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const store = useMainStore();
const { current, users } = storeToRefs(store);
const { updateUser } = useQueries();

const isAdmin = (roleN = "ROLE_ADMIN") => {
  const roles = currentUser.value?.roles;

  return roles?.length > 0 ? roles.find((role) => role.name === roleN) : false;
};

const invalid = ref(false);
const item = ref({});
const visible = ref(false);

const router = useRouter();

const getRole = (name) => {
  if (name === "") return "Жоқ";
  const result = {
    ADMIN: "Админстратор",
    USER: "Пайдаланушы",
  };

  return result[name];
};

const signOut = () => {
  current.value = null;
  router.push({ name: "Login" });
};

const save = () => {
  if (!item.value?.fullName) return;
  updateUser(current.value?.id, {
    ...current.value,
    fullName: item.value?.fullName,
  });
  visible.value = false
};
</script>
