<template>
  <v-dialog v-model="dialog" width="400" persistent>
    <v-card class="pa-4">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5">Edit level</div>
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
            @click="editLevel"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { useAppStore } from "@/store/app";

export default {
  name: "EditLevel",

  props: {
    open: {
      type: Boolean,
      default: false,
    },

    level: {
      type: [Object],
      default: () => ({}),
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

      this.form = {
        name: this.level.name,
      };
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

    async editLevel() {
      if (!this.isFormValid || this.loading) return;

      const appStore = useAppStore();

      await appStore
        .updateLevel(this.level.id, this.form)
        .then(() => {
          this.$emit("success");
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
