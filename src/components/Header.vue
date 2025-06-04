<template>
  <Menubar :model="items" style="width: 100%;">
    <template #start>
      <Image :src="Logo" width="75"/>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <a v-ripple style="display: flex; justify-content: center; align-items: center;" v-bind="props.action">
        <RouterLink v-if="item?.to" :to="item?.to" style="text-decoration: none; color: black;">{{ item.label }}</RouterLink>
        <span v-else>{{ item.label }}</span>
        <Badge
          v-if="item.badge"
          :class="{ 'ml-auto': !root, 'ml-2': root }"
          :value="item.badge"
        />
        <span
          v-if="item.shortcut"
          class="ms-auto border border-secondary rounded bg-dark text-muted small p-1"
          >{{ item.shortcut }}</span
        >
        <i
          v-if="hasSubmenu"
          :class="[
            'pi pi-angle-down ml-auto',
            { 'pi-angle-down': root, 'pi-angle-right': !root },
          ]"
        ></i>
      </a>
    </template>
    <template #end>
      <Button label="Профиль" @click="$router.push({ name: 'Profile' })"/>
    </template>
  </Menubar>
</template>
<script setup>
import { Avatar, Button, Image, InputText, Menubar } from "primevue";
import Logo from '@assets/logo.png'
import { ref } from "vue";

const items = ref([
    {
        label: 'Басты бет',
        icon: 'pi pi-home',
        to: '/'
    },
    {
        label: 'Бейнебақылау',
        icon: 'pi pi-home',
        to: '/video'
    },
    
]);
</script>
