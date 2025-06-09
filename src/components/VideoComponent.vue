// frontend (Vue 3 + PrimeVue) // Файл: FaceCapture.vue
<template>
  <div class="p-4 space-y-4" style="display: flex; flex-wrap: wrap; gap: 12px">
    <h2 class="text-xl font-bold" style="width: 100%">📷 Распознавание лиц</h2>
    <video
      ref="video"
      autoplay
      playsinline
      style="width: 60%; border-radius: 15px"
    ></video>
    <!-- <DataTable
      v-if="allNames?.length"
      :value="users.filter((user) => allNames.includes(user.username))"
    >
      <Column field="fullName" header="Танылған"> </Column>
      <Column field="username" header="Танылған"> </Column>
      <Column field="role" header="Танылған"> </Column>
    </DataTable>
    <span v-else>Ешкім танылған жоқ</span> -->
    <Card
      v-if="allNames?.length"
      :full-name="
        users.filter((user) => allNames.includes(user.username))[0].fullName
      "
      :subtext="
        users.filter((user) => allNames.includes(user.username))[0].username
      "
      :woman="
        users.filter((user) => allNames.includes(user.username))[0].gender ===
        'Әйел'
      "
    />
    <Card v-else empty="true" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { Column, DataTable } from "primevue";
import { useMainStore } from "@/stores/useMainStore";
import { useQueries } from "@/composables/useQueries";
import Card from "./Card.vue";

const video = ref(null);
const status = ref({});
const lastDate = ref(null);

const { users } = useMainStore();
const {} = useQueries();

const allNames = computed(() => {
  const names = status.value?.names;
  console.log(status.value);
  console.log(names);

  if (!names) return [];
  return names.filter((name) => name !== "Неизвестен");
});

onMounted(() => {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.value.srcObject = stream;

      setInterval(async () => {
        console.log("request to detect face");

        const canvas = document.createElement("canvas");
        canvas.width = video.value.videoWidth;
        canvas.height = video.value.videoHeight;
        canvas.getContext("2d").drawImage(video.value, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        lastDate.value = imageData;

        const res = await axios.post("http://localhost:8000/api/recognize", {
          image: imageData,
        });

        if (!res.data) return;

        status.value = res.data;
      }, 3000);
    })
    .catch((err) => {
      status.value = "Ошибка доступа к камере: " + err;
    });
});
</script>

<style scoped>
video {
  border: 2px solid #ddd;
}
</style>
