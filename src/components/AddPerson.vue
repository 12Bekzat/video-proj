<template>
  <DataTable :value="people" style="width: 100%; margin-bottom: 100px">
    <template #header>
      <div class="div">
        <Button label="Пайдаланушы жасау" @click="visible = true"/>
      </div>
    </template>
    <Column field="fullName" header="ТАӘ"> </Column>
    <Column field="username" header="Пайдаланушы аты"> </Column>
    <Column field="Manage" header="Әрекеттер" style="width: fit-content">
      <template #body="{ data }">
        <Button icon="pi pi-trash" severity="danger" aria-label="Save" @click="remove(data?.id)"/>
      </template>
    </Column>
    <template #empty> Пайдаланушылар жоқ </template>
  </DataTable>
  <Dialog v-model:visible="visible" modal>
    <div class="modal">
      <div class="modal__title">Пайдаланушы Жасау</div>
      <FloatLabel style="width: 100%">
        <InputText
          id="username"
          v-model="item.username"
          style="width: 100%"
          :invalid="invalid"
        />
        <label for="username">Пайдаланушы аты</label>
      </FloatLabel>
      <FloatLabel style="width: 100%">
        <InputText
          id="fullName"
          v-model="item.fullName"
          style="width: 100%"
          :invalid="invalid"
        />
        <label for="fullName">ТАӘ</label>
      </FloatLabel>
      <Fieldset legend="Негізге бет қосу" style="width: 100%">
        <div class="p-4 space-y-4" style="width: 100%">
          <form
            @submit.prevent="handleSubmit"
            class="space-y-2"
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 12px;
              width: 100%;
            "
          >
            <input
              type="file"
              @change="handleFile"
              accept="image/*"
              class="w-full"
            />
            <Button label="Жүктеу" icon="pi pi-upload" type="submit" />
          </form>
          <p v-if="status">{{ status }}</p>
        </div>
      </Fieldset>
    </div>
  </Dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import {
  Button,
  Column,
  DataTable,
  Dialog,
  Fieldset,
  FloatLabel,
  InputText,
  Select,
} from "primevue";
import { useMainStore } from "@/stores/useMainStore";
import { storeToRefs } from "pinia";
import { useQueries } from "@/composables/useQueries";
import Card from "./Card.vue";

const name = ref("");
const file = ref(null);
const status = ref("");
const visible = ref(false);
const people = ref([]);

const store = useMainStore();
const { users } = storeToRefs(store);

const { register, removeUser } = useQueries()

function handleFile(event) {
  file.value = event.target.files[0];
}

const item = ref({});

const getPeople = async () => {
  const res = await axios.get("http://localhost:8000/api/people");

  console.log("data", res.data);
  if (!res.data?.people) return;

  people.value = res.data.people;
  people.value = users.value.filter((item) =>
    people.value.includes(item.username)
  );
};

const remove = async (id) => {
  removeUser(id)

  await getPeople()
}

onMounted(async () => {
  await getPeople();
});

async function handleSubmit() {
  if (!item.value?.username || !file.value) {
    status.value = "Пожалуйста, укажите имя и выберите файл.";
    return;
  }

  const formData = new FormData();
  formData.append("name", item.value?.username);
  formData.append("file", file.value);

  try {
    const res = await axios.post(
      "http://localhost:8000/api/add_person",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    status.value = `✅ ${res.data.name} добавлен.`;
    name.value = "";
    file.value = null;
    register({ ...item.value, password: 'qwe123qwe', role: 'USER' })
    await getPeople();
  } catch (err) {
    status.value = "Ошибка при загрузке: " + err.message;
  }
}
</script>

<style scoped>
input[type="text"] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
</style>
