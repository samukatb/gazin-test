// Utilities
import GazinAPI from "@/api/axios";
import { defineStore } from "pinia";

export interface Level {
  id: number;
  name: string;
  orderBy?: "asc" | "desc";
}

export interface Developer {
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

interface LevelForm {
  name: string;
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

interface QuerySearch {
  search?: string;
  page: number;
  limit: number;
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
    async getDevelopers(query?: QuerySearch) {
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

    async updateDeveloper(id: number, developer: DeveloperForm) {
      await GazinAPI.put(`${routes.developers}/${id}`, developer);
    },

    async deleteDeveloper(id: number) {
      await GazinAPI.delete(`${routes.developers}/${id}`);
    },

    async getLevels(query?: QuerySearch) {
      await GazinAPI.get(routes.levels, {
        params: query,
      })
        .then((response) => {
          this.levels = response.data;
        })
        .catch(() => {
          this.levels = {
            data: [],
            total: 0,
            currentPage: 0,
            perPage: 0,
          };
        });
    },

    async createLevel(level: LevelForm) {
      await GazinAPI.post(routes.levels, level);
    },

    async updateLevel(id: number, level: LevelForm) {
      await GazinAPI.put(`${routes.levels}/${id}`, level);
    },

    async deleteLevel(id: number) {
      await GazinAPI.delete(`${routes.levels}/${id}`);
    },
  },
});
