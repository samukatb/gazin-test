import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { VDataTableServer } from "vuetify/labs/VDataTable";

import { createVuetify } from "vuetify";

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
