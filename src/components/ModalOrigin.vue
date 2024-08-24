<template>
  <div class="card flex justify-center">
    <Dialog
      :visible="visibleorigin"
      modal
      :header="`${datacharacter?.name ?? ''}`"
      :closable="false"
    >
      <div class="flex justify-center m-2">
        <Image
          :src="datacharacter?.originPlanet?.image ?? ''"
          alt="Image"
          width="250"
          preview
        />
      </div>

      <div class="flex justify-center gap-2 text-justify m-2">
        <p>{{ datacharacter?.originPlanet?.description ?? "" }}</p>
      </div>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Close"
          severity="secondary"
          @click="visibleorigin = false"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import chatacterService from "../services/clients/chatacter.service";
import { Character } from "../models/character";

const visibleorigin = defineModel<boolean>("visible");

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

watch([visibleorigin], async ([newVisible]) => {
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
