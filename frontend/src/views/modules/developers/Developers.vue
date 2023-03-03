<template>
  <div class="pa-6">
    <VCard>
      <VCardTitle>
        <div class="d-flex align-center">
          <VIcon class="mr-2">mdi-account-group</VIcon>
          <div class="text-h5">Developers</div>
        </div>
        <div class="d-flex align-center pt-4">
          <VTextField
            v-model="search"
            label="Search"
            single-line
            hide-details
            class="mr-4"
          />
          <VBtn height="60" @click="isModalOpened = !isModalOpened">
            Edit developer
          </VBtn>
        </div>
      </VCardTitle>
      <div class="pa-4">
        <v-data-table-server
          v-model:page="page"
          :items="developers"
          :headers="headers"
          :server-items="developers"
          :items-length="totalItems"
          :loading="loading"
          fixed-header
          item-value="name"
          @update:options="options = $event"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.columns.name }}</td>
              <td>
                {{ new Date(item.columns.birthdate).toLocaleDateString() }}
              </td>
              <td>{{ item.columns.age }} years old</td>
              <td>{{ item.columns.sex }}</td>
              <td>{{ item.columns.hobby }}</td>
              <td>{{ item.columns.level_id }}</td>
              <td align="right">
                <VBtn
                  class="mr-2"
                  icon
                  size="24"
                  @click="editDeveloper(item.raw)"
                >
                  <VIcon size="16"> mdi-pencil-outline </VIcon>
                </VBtn>
                <VBtn icon size="24" @click="removeDeveloper(item.raw.id)">
                  <VIcon size="16"> mdi-delete-outline </VIcon>
                </VBtn>
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

    <AddDeveloper
      :open="isModalOpened"
      @success="createdDeveloper"
      @close="isModalOpened = !isModalOpened"
    />

    <EditDeveloper
      :open="isModalEditOpened"
      :developer="developer"
      @success="editedDeveloper"
      @close="isModalEditOpened = !isModalEditOpened"
    />

    <VSnackbar v-model="snackbar" location="top right" :timeout="3000">
      {{ snackbarMessage }}

      <template v-slot:actions>
        <VBtn color="blue" variant="text" @click="snackbar = false">
          Close
        </VBtn>
      </template>
    </VSnackbar>

    <ConfirmAction
      :open="isModalRemoveOpened"
      text="Are you sure you want to delete the developer?"
      @confirm="confirmRemoveDeveloper"
      @close="isModalRemoveOpened = !isModalRemoveOpened"
    />
  </div>
</template>

<script lang="ts">
import { Developer, useAppStore } from "@/store/app";
import { IDevelopersData } from "@/@types/developers-data.type";
import AddDeveloper from "./AddDeveloper.vue";
import ConfirmAction from "@/components/ConfirmAction.vue";
import EditDeveloper from "./EditDeveloper.vue";

export default {
  components: { AddDeveloper, ConfirmAction, EditDeveloper },

  data(): IDevelopersData {
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
      developer: {},
      developerId: null,
      loadingRemove: false,
      page: 1,
      headers: [
        {
          title: "Name",
          key: "name",
          sortable: true,
        },
        {
          title: "Birthdate",
          key: "birthdate",
          sortable: false,
        },
        {
          title: "Age",
          key: "age",
          sortable: false,
        },
        {
          title: "Sex",
          key: "sex",
          sortable: false,
        },
        {
          title: "Hobby",
          key: "hobby",
          sortable: false,
        },
        {
          title: "Level",
          key: "level_id",
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
    developers() {
      return this.appStore.developers.data;
    },
    totalItems() {
      return this.appStore.developers.total;
    },
  },
  methods: {
    getDataFromAPI() {
      this.loading = true;
      try {
        this.appStore.getDevelopers({
          page: this.options.page,
          limit: this.options.itemsPerPage,
          search: this.search,
        });
      } finally {
        this.loading = false;
      }
    },

    editDeveloper(developer: Developer) {
      this.developer = developer;
      this.isModalEditOpened = !this.isModalEditOpened;
    },

    editedDeveloper() {
      this.openSnackbar("Developer edited successfully");
      this.getDataFromAPI();
    },

    removeDeveloper(id: number) {
      this.developerId = id;
      this.isModalRemoveOpened = !this.isModalRemoveOpened;
    },

    createdDeveloper() {
      this.openSnackbar("Developer created successfully");
      this.getDataFromAPI();
    },

    async confirmRemoveDeveloper() {
      await this.appStore.deleteDeveloper(this.developerId).then(() => {
        this.isModalRemoveOpened = !this.isModalRemoveOpened;
        this.openSnackbar("Developer deleted successfully");
        this.developerId = null;
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
