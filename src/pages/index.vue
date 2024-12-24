<template>
  <div class="container mx-auto p-4">
    <!-- Campo de busca -->
    <div class="flex flex-wrap justify-between items-center pb-4">
      <h1 class="text-2xl font-bold text-gray-800">Usuários</h1>

      <div class="flex items-center gap-2">
        <div class="relative">
          <div
            class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          <input
            v-model="searchQuery"
            type="text"
            id="table-search"
            class="block h-9 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
            placeholder="Pesquisar por..."
            @input="handleSearchUsers"
          />
        </div>

        <NuxtLink to="/novo-usuario">
          <button
            title="Clique para adicionar um novo usuário"
            type="button"
            class="px-3 h-9 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            <UserPlusIcon class="w-4 h-4 mr-0 sm:mr-1 text-white" />

            <span class="hidden sm:inline text-center">Adicionar usuário</span>
          </button>
        </NuxtLink>
      </div>
    </div>

    <div
      v-if="searchQuery.length > 0"
      class="flex justify-between items-center gap-2 text-gray-400 mb-2"
    >
      <span class="text-xs"> Pesquisando por: "{{ searchQuery }}" </span>

      <div>
        <span class="text-xs pr-1">
          {{ users.length }} usuários encontrados
        </span>

        <button
          title="Limpar filtros"
          class="text-xs rounded-lg bg-indigo-600 text-white p-1 hover:bg-indigo-700 hover:text-white transition duration-500 ease-in-out"
          @click="
            searchQuery = '';
            handleSearchUsers();
          "
        >
          Limpar filtros
        </button>
      </div>
    </div>

    <!-- Tabela de Usuários -->
    <BaseTable :columns="columns">
      <template #default>
        <tr v-if="isLoadingUsersInfo" class="bg-white divide-y">
          <td colspan="6" class="px-6 py-4 text-center">
            <div class="flex justify-center items-center space-x-2">
              <svg
                class="w-6 h-6 text-indigo-600 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M14 2a10 10 0 1 1-4 0" />
              </svg>
              <span class="text-sm text-gray-600">Carregando...</span>
            </div>
          </td>
        </tr>

        <tr
          v-for="(user, index) in users"
          :key="user.id"
          class="bg-white divide-y"
        >
          <td
            class="px-6 py-2"
            :class="{ 'border-b': index !== users.length - 1 }"
          >
            <NuxtImg :src="user.image" alt="Usuário" class="w-10 h-10 m-auto" />
          </td>

          <td
            scope="row"
            class="px-6 py-2 font-medium text-indigo-600 whitespace-nowrap"
          >
            {{ user.firstName }} {{ user.lastName }}
          </td>

          <td class="px-6 py-2 text-center">
            {{ formatDate(user.birthDate) }}
          </td>

          <td class="px-6 py-2 text-center">
            <span
              v-if="user.gender.toUpperCase() == UserGender.Male"
              class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg"
            >
              Masculino
            </span>

            <span
              v-if="user.gender.toUpperCase() == UserGender.Female"
              class="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg"
            >
              Feminino
            </span>

            <span
              v-if="user.gender.toUpperCase() == UserGender.Other"
              class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg"
            >
              Outro
            </span>
          </td>

          <td class="px-6 py-2">{{ user.address.address }}</td>

          <td class="px-6 py-2 text-center">
            <button
              title="Clique para visualizar no mapa"
              type="button"
              class="px-3 h-9 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              @click="
                handleOpenGoogleMaps(
                  user.address.coordinates.lat,
                  user.address.coordinates.lng
                )
              "
            >
              <MapPinIcon class="w-4 h-4 mr-1 text-white" />
              Visualizar mapa
            </button>
          </td>
        </tr>
      </template>
    </BaseTable>

    <!-- Paginação -->
    <TablePagination
      v-if="!isLoadingUsersInfo"
      :value="pagination"
      @update:value="handleUpdatePageProps($event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";

import { formatDate } from "@/shared/utils/dateUtils";

import { useUser } from "@/composables/useUser";

import BaseTable from "@/components/layout/BaseTable.vue";
import TablePagination from "@/components/layout/TablePagination.vue";

import { UserPlusIcon, MapPinIcon } from "@heroicons/vue/20/solid";

import type { ITablePaginationProps } from "@/interfaces/props/ITablePaginationProps";

import { UserGender } from "@/enums/UserGender";

export default defineComponent({
  name: "IndexPage",
  components: {
    BaseTable,
    TablePagination,
    UserPlusIcon,
    MapPinIcon,
  },
  setup() {
    useHead({
      title: "SUTHUB - Usuários",
      meta: [
        {
          name: "description",
          content: "Página de usuários do desafio SUTHUB.",
        },
      ],
      htmlAttrs: {
        lang: "pt-br",
      },
    });

    const { columns, pagination, users, getAllUsers, searchUsersByName } =
      useUser();
    const searchQuery = ref("");

    const isLoadingUsersInfo = ref(true);

    const handleOpenGoogleMaps = (lat: number, lng: number) => {
      const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;

      window.open(mapUrl, "_blank");
    };

    const fetchUsersData = async () => {
      try {
        getAllUsers(
          pagination.value.page ?? 1,
          pagination.value.limit ?? 10
        ).then(() => {
          isLoadingUsersInfo.value = false;
        });
      } catch (error) {
        console.error("Erro ao buscar dados de usuários:", error);
      }
    };

    const debounce = (
      func: { (): Promise<void>; apply?: any },
      wait: number | undefined
    ) => {
      let timeout: string | number | NodeJS.Timeout | undefined;
      return (...args: any) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    const handleSearchUsers = debounce(async () => {
      if (searchQuery.value) {
        await searchUsersByName(searchQuery.value, pagination.value.page, 0);
      } else {
        await getAllUsers(1, 10);
      }
    }, 500);

    const handleUpdatePageProps = async (
      newPaginationProps: ITablePaginationProps
    ) => {
      pagination.value = newPaginationProps;
      await fetchUsersData();
    };

    watch(searchQuery, () => {
      handleSearchUsers();
    });

    onMounted(async () => {
      await fetchUsersData();
    });

    return {
      UserGender,
      columns,
      pagination,
      isLoadingUsersInfo,
      searchQuery,
      users,
      formatDate,
      handleOpenGoogleMaps,
      handleUpdatePageProps,
      handleSearchUsers,
    };
  },
});
</script>
