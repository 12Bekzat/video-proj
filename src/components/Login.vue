<template>
  <div class="form">
    <div class="form__content">
      <div class="form__title">Войти</div>
      <FloatLabel style="width: 100%">
        <InputText id="username" v-model="item.username" style="width: 100%" :invalid="invalid"/>
        <label for="username">Пайдаланушы аты</label>
      </FloatLabel>
      <FloatLabel style="width: 100%">
        <Password
          id="password"
          v-model="item.password"
          style="width: 100%"
          input-style="width: 100%;"
          :feedback="false"
          toggle-mask
          :invalid="invalid"
        />
        <label for="password">Құпия сөз</label>
      </FloatLabel>
      <Button label="Кіру" @click="save" />
    </div>
  </div>
</template>
<script setup>
import { useQueries } from "@/composables/useQueries";
import { useMainStore } from "@/stores/useMainStore";
import { storeToRefs } from "pinia";
import { Button, FloatLabel, InputText, Password } from "primevue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const store = useMainStore();
const { current } = storeToRefs(store);

const { login } = useQueries();

const invalid = ref(false)

const item = ref({});
const router = useRouter();

const save = () => {
    console.log(item.value);
    
  current.value = login({ username: item.value?.username, password: item.value?.password });
  console.log(current.value);

  if (current.value?.username === item.value?.username) {
    invalid.value = false

    router.push({ name: "Home" });
  } else {
    invalid.value = true
  } 
};
</script>
