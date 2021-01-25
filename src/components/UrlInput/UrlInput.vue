<template>
  <section class="bg-col url-input-container">
    <div class="url-input">
      <input
        v-model="inputValue"
        type="text"
        placeholder="Shorten a link here..."
      />
      <button @click="handleInputSend" class="btn-link">Shorten It!</button>
    </div>
    <div class="results-test">
      <h5>{{ inputValue }}</h5>
      <h5>ShortenedUrl is: {{ shortenedUrl }}</h5>
      <p>
        {{ isValid }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isValid: false,
      inputValue: "",
    };
  },
  methods: {
    validateInput(value) {
      // Add code to check if input is a Url
      // regex: [-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)
      let re = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/;
      return re.test(value);
      // return true;
    },
    handleInputSend() {
      if (this.validateInput(this.inputValue)) {
        this.isValid = true;
        this.$emit("shorten-url", this.inputValue);
      } else {
        this.isValid = false;
      }
    },
  },
  props: {
    shortenedUrl: {
      type: String,
      default: "",
    },
  },
  emits: ["shorten-url"],
};
</script>

<style scoped>
@import url("./urlInput.css");
</style>
