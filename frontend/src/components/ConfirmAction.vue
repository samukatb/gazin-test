<template>
  <v-dialog v-model="dialog" width="400" persistent>
    <v-card class="pa-4">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5">Are you sure?</div>
        <v-btn icon size="24" @click="closeModal">
          <v-icon size="16">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <div class="px-4 py-2">
        <p>{{ text }}</p>
      </div>

      <v-card-actions class="d-flex justify-end">
        <v-btn @click="closeModal">Cancel</v-btn>
        <v-btn color="error" :loading="loading" @click="confirm"> Yes </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  name: "AddDeveloper",

  props: {
    open: {
      type: Boolean,
      default: false,
    },

    text: {
      type: String,
      required: true,
    },

    value: {
      type: [String, Number],
      required: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dialog: false,
    };
  },

  watch: {
    open() {
      this.dialog = this.open;
    },
  },

  methods: {
    confirm() {
      this.$emit("confirm", this.value);
    },

    closeModal() {
      this.dialog = false;
      this.$emit("close");
    },
  },
};
</script>
