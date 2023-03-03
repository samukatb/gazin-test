// Utilities
import GazinAPI from "@/api/axios";
import { defineStore } from "pinia";

interface Level {
  id: number;
  name: string;
}

interface Developer {
  id: number;
  name: string;
  birthDate: string;
  sex: string;
  hobby: string;
  level: Level;
  age: number;
}

interface DeveloperForm {
  name: string;
  birthdate: string;
  sex: string;
  hobby: string;
  level_id: number;
}

interface ApiResponse<T> {
  data: T[];
  total: number;
  currentPage: number;
  perPage: number;
}

interface AppState {
  developers: ApiResponse<Developer>;
  levels: ApiResponse<Level>;
}

interface QueryDevelopers {
  search?: string;
  page: number;
  perPage: number;
}

const routes = {
  developers: "/developers",
  levels: "/levels",
};

export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    developers: {
      data: [],
      total: 0,
      currentPage: 0,
      perPage: 0,
    },
    levels: {
      data: [],
      total: 0,
      currentPage: 0,
      perPage: 0,
    },
  }),

  actions: {
    async getDevelopers(query?: QueryDevelopers) {
      await GazinAPI.get(routes.developers, {
        params: query,
      })
        .then((response) => {
          this.developers = response.data;
        })
        .catch(() => {
          this.developers = {
            data: [],
            total: 0,
            currentPage: 0,
            perPage: 0,
          };
        });
    },

    async createDeveloper(developer: DeveloperForm) {
      await GazinAPI.post(routes.developers, developer);
    },

    async deleteDeveloper(id: number) {
      await GazinAPI.delete(`${routes.developers}/${id}`);
    },

    async getLevels() {
      await GazinAPI.get(routes.levels).then((response) => {
        this.levels = response.data;
      });
    },
  },
});
