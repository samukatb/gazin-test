<template>
  <v-dialog v-model="dialog" width="400" persistent>
    <v-card class="pa-4">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5">Add level</div>
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

        <v-card-actions class="d-flex justify-end">
          <v-btn @click="closeModal">Cancel</v-btn>
          <v-btn
            color="primary"
            :loading="loading"
            :disabled="!isFormValid"
            @click="addLevel"
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
  name: "AddLevel",

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
      form: {
        name: "",
      },
    };
  },

  computed: {
    isFormValid() {
      return Object.values(this.form).every((value) => value !== "");
    },
  },

  watch: {
    open() {
      this.dialog = this.open;
    },
  },

  methods: {
    async addLevel() {
      if (!this.isFormValid || this.loading) return;

      const appStore = useAppStore();

      await appStore
        .createLevel(this.form)
        .then(() => {
          this.$emit("success");
          this.form = {
            name: "",
          };
          this.closeModal();
        })
        .finally(() => {
          this.loading = false;
        });
    },

    closeModal() {
      this.dialog = false;
      this.$emit("close");
    },
  },
};
</script>
