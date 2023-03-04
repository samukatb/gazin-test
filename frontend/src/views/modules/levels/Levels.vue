<template>
  <div class="pa-6">
    <VCard>
      <VCardTitle>
        <div class="d-flex align-center">
          <VIcon class="mr-2">mdi-medal</VIcon>
          <div class="text-h5">Levels</div>
        </div>
        <div class="d-flex align-center pt-4">
          <VTextField
            v-model="search"
            label="Search"
            single-line
            hide-details
            class="mr-4"
          />
          <VBtn
            color="primary"
            height="54"
            @click="isModalOpened = !isModalOpened"
          >
            Add level
          </VBtn>
        </div>
      </VCardTitle>
      <div class="pa-4">
        <v-data-table-server
          v-model:page="page"
          :items="levels"
          :headers="headers"
          :server-items="levels"
          :items-length="totalItems"
          :loading="loading"
          fixed-header
          item-value="name"
          @update:options="options = $event"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.columns.name }}</td>
              <td>{{ item.columns.total_developers }}</td>
              <td align="right">
                <VBtn class="mr-2" icon size="24" @click="editLevel(item.raw)">
                  <VIcon size="16"> mdi-pencil-outline </VIcon>
                </VBtn>
                <VBtn
                  v-if="item.raw.total_developers === 0"
                  icon
                  size="24"
                  @click="removeLevel(item.raw.id)"
                >
                  <VIcon size="16"> mdi-delete-outline </VIcon>
                </VBtn>
                <v-tooltip
                  v-else
                  text="You can't delete a level that has one or more developers"
                >
                  <template v-slot:activator="{ props }">
                    <VBtn v-bind="props" icon size="24">
                      <VIcon size="16"> mdi-delete-outline </VIcon>
                    </VBtn>
                  </template>
                </v-tooltip>
              </td>
            </tr>
          </template>

          <template v-slot:no-data>
            <div class="d-flex pa-4">
              <div class="text-h6">No data available</div>
            </div>
          </template>
        </v-data-table-server>
      </div>
    </VCard>

    <AddLevel
      :open="isModalOpened"
      @success="createdLevel"
      @close="isModalOpened = !isModalOpened"
    />

    <EditLevel
      :open="isModalEditOpened"
      :level="level"
      @success="editedLevel"
      @close="isModalEditOpened = !isModalEditOpened"
    />

    <ConfirmAction
      :open="isModalRemoveOpened"
      text="Are you sure you want to delete the level?"
      @confirm="confirmRemoveLevel"
      @close="isModalRemoveOpened = !isModalRemoveOpened"
    />

    <VSnackbar v-model="snackbar" location="top right" :timeout="3000">
      {{ snackbarMessage }}

      <template v-slot:actions>
        <VBtn color="blue" variant="text" @click="snackbar = false">
          Close
        </VBtn>
      </template>
    </VSnackbar>
  </div>
</template>

<script lang="ts">
import { Level, useAppStore } from "@/store/app";
import { ILevelsData } from "@/@types/developers-data.type";
import ConfirmAction from "@/components/ConfirmAction.vue";
import AddLevel from "./AddLevel.vue";
import EditLevel from "./EditLevel.vue";

export default {
  components: { ConfirmAction, AddLevel, EditLevel },

  data(): ILevelsData {
    return {
      appStore: useAppStore(),
      loading: false,
      itemsPerPage: 10,
      search: "",
      debounce: null,
      options: {},
      error: false,
      isModalOpened: false,
      isModalEditOpened: false,
      isModalRemoveOpened: false,
      snackbar: false,
      snackbarMessage: "",
      level: {},
      levelId: null,
      loadingRemove: false,
      page: 1,
      headers: [
        {
          title: "Name",
          key: "name",
          sortable: true,
        },
        {
          title: "Total developers",
          key: "total_developers",
          sortable: false,
        },
        {
          title: "Actions",
          key: "actions",
          sortable: false,
          align: "end",
        },
      ],
    };
  },

  watch: {
    options: {
      handler() {
        this.getDataFromAPI();
      },
      deep: true,
    },
    search: {
      handler() {
        clearTimeout(this.debounce as unknown as ReturnType<typeof setTimeout>);
        this.debounce = setTimeout(() => {
          this.getDataFromAPI();
        }, 500);
      },
      deep: true,
    },
  },

  computed: {
    levels() {
      return this.appStore.levels.data;
    },
    totalItems() {
      return this.appStore.levels.total;
    },
  },

  methods: {
    async getDataFromAPI() {
      this.loading = true;
      try {
        await this.appStore.getLevels({
          page: this.options.page,
          limit: this.options.itemsPerPage,
          search: this.search,
          orderBy: this.options?.sortBy[0]?.order.toUpperCase(),
        });
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    },

    editLevel(level: Level) {
      this.level = level;
      this.isModalEditOpened = !this.isModalEditOpened;
    },

    async editedLevel() {
      this.openSnackbar("Level edited successfully");
      await this.getDataFromAPI();
      this.level = {};
    },

    removeLevel(id: number) {
      this.levelId = id;
      this.isModalRemoveOpened = !this.isModalRemoveOpened;
    },

    createdLevel() {
      this.openSnackbar("Level created successfully");
      this.getDataFromAPI();
    },

    async confirmRemoveLevel() {
      await this.appStore.deleteLevel(this.levelId).then(() => {
        this.isModalRemoveOpened = !this.isModalRemoveOpened;
        this.openSnackbar("Level deleted successfully");
        this.levelId = null;
        this.loadingRemove = false;
        this.getDataFromAPI();
      });
    },

    openSnackbar(message: string) {
      this.snackbar = true;
      this.snackbarMessage = message;
    },
  },
};
</script>
