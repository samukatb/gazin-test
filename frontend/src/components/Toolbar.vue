<template>
  <div
    class="d-flex align-center justify-space-between"
    style="
      border-bottom: 1px solid var(--v-border-base);
      background-color: var(--v-background_gray_dark-base);
    "
  >
    <div style="flex: 1" class="d-flex align-center">
      <v-text-field
        v-model="searchValue"
        class="mr-6"
        style="max-width: 340px"
        color="background_gray_dark"
        placeholder="Buscar registros"
        @input="onSearch"
      />

      <v-slide-group multiple show-arrows>
        <slot name="filters" />
      </v-slide-group>
    </div>
    <div class="d-flex">
      <slot name="action-buttons" />

      <large-button
        v-if="!hideDefaultActionButton"
        color="primary_dark"
        :value="actionButtonText"
        tile
        icon="mdi-plus"
        @click="$emit('click:action-button')"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    search: {
      type: String,
      default: "",
    },
    actionButtonText: {
      type: String,
      default: "",
    },
    hideDefaultActionButton: {
      type: Boolean,
      default: false,
    },
  },

  data(): {
    searchValue: string;
    debounce: ReturnType<typeof setTimeout> | null;
  } {
    return {
      searchValue: this.search,
      debounce: null,
    };
  },

  methods: {
    onSearch() {
      clearTimeout(this.debounce as ReturnType<typeof setTimeout>);
      this.debounce = setTimeout(() => {
        this.$emit("search", this.searchValue);
      }, 500);
    },
  },
};
</script>

<style></style>
