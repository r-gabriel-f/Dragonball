<template>
  <div v-if="datacharacter?.transformations?.length ?? 0" class="card flex justify-center">
    <Galleria
      :visible="visible"
      :value="transformationsData"
      :responsiveOptions="responsiveOptions"
      :numVisible="9"
      class="w-full md:w-3/4 lg:w-1/2"
      :circular="true"
      :fullScreen="true"
      :showItemNavigators="true"
      :showThumbnails="false"
    >
      <template #item="slotProps">
        <img
          :src="slotProps.item.image"
          :alt="slotProps.item.name"
          class="w-full md:w-3/4 lg:w-1/2 mx-auto block"
        />
      </template>
      <template #thumbnail="slotProps">
        <img
          :src="slotProps.item.image"
          :alt="slotProps.item.name"
          class="block"
        />
      </template>
      <template #closeicon>
        <button 
          @click="visible = false" 
          class="absolute top-4 right-4 bg-transparent border-none text-white text-2xl cursor-pointer z-50 hover:text-gray-300 transition-colors duration-200"
        >
          <i class="pi pi-times"></i>
        </button>
      </template>
    </Galleria>
  </div>
  <div v-else class="card flex justify-center">
    <Dialog
      :visible="visible"
      modal
      :header="`${datacharacter?.name ?? ''}`"
      class="w-full max-w-sm"
    >
      <span class="text-secondary block mb-5">has no transformation.</span>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Close"
          severity="secondary"
          @click="visible = false"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import chatacterService from "../services/clients/chatacter.service";
import { Character } from "../models/character";

const visible = defineModel<boolean>("visible");

const datacharacter = ref<Character>();

interface Props {
  datac?: Character;
}
const props = defineProps<Props>();

const idref = computed(() => props.datac?.id ?? 0);

const options = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  retryOnMount: false,
  enabled: false,
};

const { data, isFetching, refetch } = chatacterService.useGetQuery(
  idref,
  undefined,
  options
);
const transformationsData = computed(() => {
  return datacharacter.value?.transformations;
});
const responsiveOptions = ref([
  {
    breakpoint: "1500px",
    numVisible: 5,
  },
  {
    breakpoint: "1024px",
    numVisible: 3,
  },
  {
    breakpoint: "768px",
    numVisible: 2,
  },
  {
    breakpoint: "560px",
    numVisible: 1,
  },
]);

watch([visible], async ([newVisible]) => {
  if (newVisible) {
    options.enabled = true;
    await refetch();
  }
});
onMounted(async () => {
  if (data.value) {
    datacharacter.value = data.value.data;
  }
});

watch(isFetching, () => {
  if (!isFetching.value) {
    datacharacter.value = data?.value?.data;
  }
});
</script>
