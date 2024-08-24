<template>
  <Search :datac="characters" @onSearch="onSearch" />

  <div class="flex justify-center p-4">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <div
        v-for="character in displayedCharacters"
        :key="character.id"
        class="flex justify-center"
      >
        <Card style="width: 20rem; overflow: hidden">
          <template #header>
            <div
              class="w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-fondo bg-cover flex justify-center"
            >
              <img
                :src="character.image"
                :alt="character.name"
                class="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          </template>
          <template #title>
            <h3 class="text-lg sm:text-xl font-bold">{{ character.name }}</h3>
          </template>
          <template #subtitle>
            <p class="text-sm sm:text-base">
              {{ character.race }} - {{ character.gender }}
            </p>
          </template>
          <template #content>
            <div class="space-y-2">
              <p class="text-sm sm:text-base h-8">
                Base ki: {{ character.ki }}
              </p>
              <p class="text-sm sm:text-base h-8">
                Total Ki: {{ character.maxKi }}
              </p>
              <p class="text-sm sm:text-base h-8">
                Affiliation: {{ character.affiliation }}
              </p>
            </div>
          </template>
          <template #footer>
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
              <Button
                label="Transformations"
                class="w-full"
                @click="openmodel(character)"
              />
              <Button
                label="Origin Planet"
                class="w-full"
                @click="openmodelorigin(character)"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>

    <ModelCharacter v-model:visible="visible" :datac="datac" />
    <ModalOrigin v-model:visible="visibleorigin" :datac="datac" />
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import chatacterService from "../services/clients/chatacter.service";
import Search from "./Search.vue";
import { Character } from "../models/character";
import ModelCharacter from "./ModelCharacter.vue";
import ModalOrigin from "./ModalOrigin.vue";
const characters = ref<Array<Character>>([]);

const searchResult = ref<Character | null>(null);

const visible = ref(false);
const visibleorigin = ref(false);


const datac = ref<Character>();
const parans = ref({
  page: 1,
  limit: 100,
});

const { data, isFetching } = chatacterService.useListQuery(parans);

const openmodel = (data: Character) => {
  datac.value = data;
  visible.value = true;
};

const openmodelorigin = (data: Character) => {
  datac.value = data;
  visibleorigin.value = true;
};

const onSearch = (search: Character) => {
  searchResult.value = search ?? null;
}

const displayedCharacters = computed(() => {
  return searchResult.value ? [searchResult.value] : characters.value;
});

onMounted(async () => {
  if (data.value?.items) {
    characters.value = data.value.items;
  }
});
watch(isFetching, () => {
  if (!isFetching.value) {
    characters.value = data?.value?.items ?? [];
  }
});
</script>
