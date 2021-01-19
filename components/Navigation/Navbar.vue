<template>
  <v-container>
    <v-row class="mt-2">
      <v-col cols="10">
        <v-text-field
          placeholder="Find Movie"
          class="ma-0 pa-0 style-search"
          filled
          hide-details
          rounded
          v-model="query"
          @keyup="getResult(query)"
        ></v-text-field>
      </v-col>
      <v-col cols="1" class=" ma-0 pt-4 ">
        <v-btn text icon v-on:click="getResult()">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Navbar",
  components: {},
  data() {
    return {
      query: "",
      results: []
    };
  },
  methods: {
    getResult(query) {
      axios
        .get(`http://www.omdbapi.com/?apikey=45ebdd49&t=${query}`)
        .then(response => {
          this.results.push(response.data);
        });
      console.log(this.results[0].Title);
    }
  }
};
</script>
<style scoped>
.style-search.v-text-field--rounded {
  border-radius: 58px;
}
.style-search >>> .v-input__slot {
  min-height: 35px;
}
</style>
