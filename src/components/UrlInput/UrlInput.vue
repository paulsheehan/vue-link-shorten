<template>
  <section
    class="bg-col url-input-section"
    :class="[isLoading ? 'results-1' : '', 'results-' + results.length]"
  >
    <div class="url-input-container">
      <div class="url-input" :class="showDisplayMessage ? 'invalid' : null">
        <input
          v-model="inputValue"
          type="text"
          placeholder="Shorten a link here..."
          v-on:keyup="onKeyup"
          v-on:focus="showDisplayMessage ? toggleDisplayMessage() : null"
          :class="showDisplayMessage ? 'invalid' : null"
        />
        <button @click="handleInputSend" class="btn-link">Shorten It!</button>
        <span
          :class="showDisplayMessage ? 'show' : null"
          class="display-message"
        >
          {{ displayMessage }}
        </span>
      </div>
      <ul class="results-list">
        <li v-if="isLoading" class="results-item loading"></li>
        <li
          class="results-item"
          v-for="(result, index) in results"
          :key="index + result.data.shortUrl"
        >
          <span class="results-destination">{{ result.data.destination }}</span>
          <a
            class="results-shortened-url"
            target="_blank"
            :href="result.data.shortUrl"
            >{{ result.data.shortUrl }}</a
          >
          <button
            @click="handleLinkCopied(result)"
            class="btn-link"
            :class="result.copied ? 'activated' : null"
            v-clipboard="result.data.shortUrl"
          >
            {{ result.copied ? "Copied!" : "Copy" }}
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isValid: false,
      inputValue: "",
      showDisplayMessage: false,
      displayMessage: "",
    };
  },
  methods: {
    validateInput(value) {
      // Add code to check if input is a Url
      let re = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/;
      return re.test(value);
    },
    toggleDisplayMessage() {
      this.showDisplayMessage = !this.showDisplayMessage;
    },
    onKeyup(event) {
      if (event.key === "Enter") {
        this.handleInputSend();
      } else {
        setTimeout(() => (this.showDisplayMessage = false), 100);
      }
    },
    handleInputSend() {
      this.inputValue = this.inputValue.split(" ").join("");
      if (this.validateInput(this.inputValue)) {
        this.isValid = true;
        this.$emit("shorten-url", this.inputValue);
        this.inputValue = "";
        this.isValid = false;
      } else {
        this.isValid = false;
        this.showDisplayMessage = true;
        if (this.inputValue) {
          this.displayMessage = "Please add a valid link";
        } else {
          this.displayMessage = "Please add a link";
        }
      }
    },
    handleLinkCopied(result) {
      result.copied = true;
      setTimeout(() => (result.copied = false), 2000);
    },
  },
  props: {
    shortenedUrl: {
      type: String,
      default: "",
    },
    results: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
    },
  },
  emits: ["shorten-url"],
};
</script>

<style scoped>
@import url("./urlInput.css");
</style>
