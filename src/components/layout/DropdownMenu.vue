<!-- src/components/DropdownMenu.vue -->
<template>
  <Menu as="div" class="relative">
    <MenuButton
      class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      More
    </MenuButton>
    <MenuItems
      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <div class="py-1">
        <MenuItem>
          {({ active }) => (
          <a href="/profile"> Profile </a>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
          <a href="/settings"> Settings </a>
          )}
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
</script>
