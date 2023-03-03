/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { VDataTableServer } from "vuetify/labs/VDataTable";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDataTableServer,
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#3D3E95",
          background: "#EFEFEF",
        },
      },
      dark: {
        colors: {
          primary: "#3D3E95",
        },
      },
    },
  },
});
