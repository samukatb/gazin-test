<template>
  <v-dialog v-model="dialog" width="400" persistent>
    <v-card class="pa-4">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5">Add developer</div>
        <v-btn icon size="24" @click="closeModal">
          <v-icon size="16">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-form class="px-4">
        <label>Name</label>
        <v-text-field
          v-model="form.name"
          placeholder="Name"
          required
          :rules="[(v) => !!v || 'Name is required']"
        />

        <label>Birthdate</label>
        <v-text-field
          v-model="form.birthdate"
          type="date"
          placeholder="Birth Date"
          required
          :rules="[(v) => !!v || 'Birth date is required', dateRule]"
          mask="##/##/####"
        />

        <label>Sex</label>
        <v-select
          v-model="form.sex"
          :items="sexOptions"
          item-value="value"
          item-title="text"
          :rules="[(v) => !!v || 'Sex is required']"
        />

        <label>Hobby</label>
        <v-text-field
          v-model="form.hobby"
          placeholder="E.g. Programming, Gaming, etc."
          required
          :rules="[(v) => !!v || 'Hobby is required']"
        />

        <label>Level</label>
        <v-select
          v-model="form.level_id"
          :items="levels.data"
          item-value="id"
          item-title="name"
          :rules="[(v) => !!v || 'Level is required']"
        />

        <v-card-actions class="d-flex justify-end">
          <v-btn @click="closeModal">Cancel</v-btn>
          <v-btn
            color="primary"
            :loading="loading"
            :disabled="!isFormValid"
            @click="addDeveloper"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { useAppStore } from "@/store/app";

export default {
  name: "AddDeveloper",

  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dialog: false,
      loading: false,
      sexOptions: [
        { value: "M", text: "Male" },
        { value: "F", text: "Female" },
      ],
      form: {
        name: "",
        birthdate: "",
        hobby: "",
        sex: "",
        level_id: "",
      },
    };
  },

  computed: {
    isFormValid() {
      return Object.values(this.form).every((value) => value !== "");
    },

    dateRule() {
      return (v: string) => this.isValidDate(v) || "Date must be in the past";
    },

    levels() {
      const appStore = useAppStore();

      return appStore.levels;
    },
  },

  created() {
    this.getLevels();
  },

  watch: {
    open() {
      this.dialog = this.open;
    },
  },

  methods: {
    isValidDate(dateString: string) {
      try {
        const date = new Date(dateString);
        const today = new Date();

        return date.getTime() < today.getTime();
      } catch {
        return false;
      }
    },

    async addDeveloper() {
      if (!this.isFormValid || this.loading) return;

      const appStore = useAppStore();
      const level_id = parseInt(this.form.level_id);

      const payload = {
        ...this.form,
        level_id,
      };

      await appStore
        .createDeveloper(payload)
        .then(() => {
          this.$emit("success");
          this.closeModal();
        })
        .finally(() => {
          this.loading = false;
        });
    },

    async getLevels() {
      const appStore = useAppStore();

      await appStore.getLevels({
        page: 1,
        limit: -1,
      });
    },

    closeModal() {
      this.dialog = false;
      this.$emit("close");
    },
  },
};
</script>
