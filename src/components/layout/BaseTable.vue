<template>
  <div class="relative overflow-x-auto shadow-none border sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 bg-gray-50">
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="column.key"
            scope="col"
            class="px-6 py-3"
            :class="{
              'text-center': column.align === 'center',
              'text-left': column.align === 'left',
              'border-b': index !== columns.length,
            }"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import type { ITableColumnProps } from "@/interfaces/props/ITableColumnProps";

export default defineComponent({
  name: "BaseTable",
  props: {
    columns: {
      type: Array as () => ITableColumnProps[],
      required: true,
    },
  },
  setup(props) {
    return { columns: props.columns };
  },
});
</script>
