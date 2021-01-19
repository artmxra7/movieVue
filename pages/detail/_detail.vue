<template>
  <div>
    <div v-if="loading">
      <div
        style="display: flex; justify-content: center; align-items: center; width: 100vw; height: 100vh;"
      >
        loading...
      </div>
    </div>
    <div v-else>
      <v-app-bar app color="transparent" elevation="0">
        <v-btn to="/" text icon>
          <v-icon>mdi-{{ `chevron-left` }}</v-icon>
        </v-btn>
      </v-app-bar>
      <div v-if="video">
        <div
          style="height: 300px; overflow: hidden; border-bottom-left-radius: 50px;"
        >
          <v-img :src="getImage(video.poster_path)" />
        </div>
        <v-card
          elevation="10"
          style="left: 20px; top: -50px; border-radius: 50px 0 0 50px; padding: 20px 50px; display: flex; justify-content: space-between;"
        >
          <div align="center">
            <div>
              <v-icon color="orange">
                mdi-star
              </v-icon>
            </div>
            <div>
              {{ video.vote_average }}/<span style="font-size: 12px;">10</span>
            </div>
            <div style="font-size: 12px; color: gray;">
              {{ video.vote_count }}
            </div>
          </div>
          <div align="center">
            <div>
              <v-icon color="dark">
                mdi-star-outline
              </v-icon>
            </div>
            <div>
              Rate This
            </div>
          </div>
          <div align="center">
            <div>
              <span
                style="background-color: limegreen; font-size: 13px; padding: 2px 5px; color: white;"
                >87</span
              >
            </div>
            <div>
              Metascore
            </div>
            <div style="font-size: 12px; color: gray;">
              {{ video.popularity }}
            </div>
          </div>
        </v-card>
        <div style="padding: 0 20px;">
          <div>
            <h2>
              {{ video.title }}
            </h2>
          </div>
          <div style="margin-top: 10px; font-size: 14px; color: gray;">
            {{ video.release_date.split("-")[0] }}
          </div>
          <div style="margin-top: 10px;">
            <v-btn
              v-for="genre in video.genres"
              :key="genre.id"
              small
              rounded
              outlined
              style="border: 1px solid lightgray; color: gray; margin: 5px;"
            >
              {{ genre.name }}
            </v-btn>
          </div>
        </div>
        <div style="padding: 0 20px; margin-top: 40px;">
          <div>
            <h3 style="color: dimgray;">
              Plot Summary
            </h3>
          </div>
          <div style="margin-top: 10px;">
            <p style="color: gray;">
              {{ video.overview }}
            </p>
          </div>
        </div>
        <div v-if="credit" style="padding: 0 20px; margin-top: 40px;">
          <div>
            <h3 style="color: dimgray;">
              Cast & Crew
            </h3>
          </div>
          <v-sheet class="mx-auto">
            <v-slide-group center-active>
              <v-slide-item v-for="(crew, index) in credit.crew" :key="index">
                <div  class=" ma-2">
                  <v-img
                    lazy-src="https://avatars1.githubusercontent.com/u/23070604?s=460&u=1f597c974abe716c565402aa3ae8419f1a9995ed&v=4"
                    width="80"
                    height="80"
                    :src="getImage(crew.profile_path)"
                    style="border-radius: 50%; border: 1px solid lightgray;"
                  />
                  <div>
                    {{ crew.name }}
                  </div>
                  <div style="color: gray;">
                    {{ crew.department }}
                  </div>
                </div>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "~/services/api";
export default {
  data: () => ({
    video: null,
    credit: null,
    loading: true
  }),
  created() {
    const id = this.$route.params.detail;
    this.getDetail(id);
    this.getCredit(id);
  },
  methods: {
    getDetail(id) {
      const url = process.env.API_URL + "/movie/" + id;
      api.get(url, response => {
        this.video = response.data;
        setTimeout(() => {
          this.loading = false;
        }, 250);
      });
    },
    getImage(path) {
      return api.getImage(path);
    },
    getCredit(id) {
      const url = process.env.API_URL + "/movie/" + id + "/credits";
      api.get(url, response => {
        this.credit = response.data;
      });
    }
  }
};
</script>
