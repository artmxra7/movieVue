<template>
  <div class="mt-0 pa-0">
    <v-container>
      <v-row class="mt-2">
        <v-col cols="12" style="display: flex; gap: 10px;">
          <v-text-field
            v-model="query"
            rounded
            hide-details
            background-color="grey lighten-3"
            placeholder="Find Movie"
            class="ma-0 pa-0 style-search"
          />
          <v-btn
            icon
            height="35"
            width="35"
            style="margin: 0; padding: 0;"
            @click="search"
          >
            <v-icon>
              mdi-magnify
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="mt-0 pa-2">
      <v-tabs
        v-if="!inSearch"
        v-model="tab"
        grow
        @change="onTabChange"
        color="#3A3A3A"
      >
        <v-tab class="capitalize">In Theatres</v-tab>
        <v-tab class="capitalize">Popular</v-tab>
        <v-tab class="capitalize">Tv Show</v-tab>
      </v-tabs>
    </v-container>
    <v-spacer></v-spacer>
    <v-container class="mt-0 pa-0" style="margin-top: 20px;">
      <v-col cols="12" style="overflow-y: auto; white-space: nowrap;">
        <div v-if="loading" align="center">
          <v-skeleton-loader
            v-for="i in 10"
            :key="i"
            type="card"
            width="200"
            height="300"
            elevation="10"
            style="margin: 20px; display: inline-table; border-radius: 25px;"
          />
        </div>
        <div v-else class="mt-0 pa-0">
          <v-sheet class="mx-auto">
            <v-slide-group center-active>
              <v-slide-item v-for="movie in movies" :key="movie.id">
                <div>
                  <v-card
                    draggable
                    class=" rounded-card ma-2"
                    width="280"
                    height="auto"
                    color="transparent"
                    :to="`/detail/${movie.id}`"
                    elevation="20"
                  >
                    <v-img
                      lazy-src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F03%2Fwonder-woman-1984-new-poster-release-gal-gadot-tw.jpg?w=960&cbr=1&q=90&fit=max"
                      class=" rounded-card ma-0 d-flex"
                      height="458.92"
                      width="350"
                      gradient="rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)"
                      :src="getImage(movie.poster_path)"
                    >
                    </v-img>
                  </v-card>
                  <v-container width="10px">
                    <v-row align="center" justify="center">
                      <span
                        class="font-weight-bold title-movie"
                        id="card-title"
                      >
                        {{ movie.title }}
                      </span>
                    </v-row>
                    <v-row class="mt-2" align="center" justify="center">
                      <v-col cols="2" sm="4">
                        <img class="" src="../assets/img/stars.png" />
                        {{ movie.vote_average }}
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </div>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import CardMovie from "~/components/Card/CardMovie";
import * as api from "~/services/api";
export default {
  components: { CardMovie },
  data: () => ({
    movies: [],
    query: "",
    url: null,
    tab: 0,
    loading: true,
    inSearch: false
  }),
  created() {
    this.reset();
    this.refresh();
  },
  methods: {
    getImage(path) {
      return api.getImage(path);
    },
    reset() {
      this.url = process.env.API_URL + "/movie/now_playing";
    },
    refresh() {
      this.loading = true;
      api.get(
        this.url,
        response => {
          this.movies = response.data.results;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    },
    search() {
      if (this.query.length > 0) {
        this.url = process.env.API_URL + "/search/movie?query=" + this.query;
        this.inSearch = true;
      } else {
        this.inSearch = false;
        this.reset();
      }
      this.tab = 0;
      this.refresh();
    },
    onTabChange(currentTab) {
      switch (currentTab) {
        case 1:
          this.url =
            process.env.API_URL + "/discover/movie?sort_by=popularity.desc";
          break;
        case 2:
          this.url =
            process.env.API_URL + "/discover/tv?sort_by=popularity.desc";
          break;
        default:
          this.reset();
          break;
      }
      this.refresh();
    }
  }
};
</script>

<style scoped>
.capitalize {
  text-transform: none !important;
  font-size: 18px;
  font-weight: 400;
  padding-left: 0;
}
::v-deep .v-tabs-slider-wrapper {
  color: #63a5e1;
  width: 40px !important;
  height: 5px !important;
}
.rounded-card {
  border-radius: 40px;
}
.title-movie {
  width: 250px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 2.5vh;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: center;
}
.style-search.v-text-field--rounded {
  border-radius: 58px;
}
</style>
