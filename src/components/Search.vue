<template>
  <div class="card flex justify-center items-center m-5 space-x-2">
  <InputText
    v-model="value1"
    placeholder="Character Name"
    class="w-full max-w-xs"
    @keyup.enter="onSearch"
  />
  <Button
    label="Search"
    class="p-2 text-sm"
    @click="onSearch"
  />
</div>

</template>
<script setup lang="ts">
import { ref } from "vue";
import { Character } from "../models/character";
const searchResult = ref<Character | null>(null);
const value1 = ref();

interface Props {
  datac?: Character[];
}

const props = defineProps<Props>();
const emit = defineEmits(["onSearch"]);
const onSearch = () => {
  const res = props.datac?.find(
    (item) => item?.name?.toLowerCase() === value1.value?.toLowerCase()
  );
  if (res) {
    searchResult.value = res;
  } else {
    searchResult.value = null;
  }
  emit("onSearch", searchResult.value);
};
</script>
