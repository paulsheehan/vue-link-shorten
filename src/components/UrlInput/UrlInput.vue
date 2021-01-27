<template>
  <section
    class="bg-col url-input-section"
    :class="'results-' + results.length"
  >
    <div class="url-input-container">
      <div class="url-input">
        <input
          v-model="inputValue"
          type="text"
          placeholder="Shorten a link here..."
          v-on:keyup.enter="handleInputSend"
        />
        <button @click="handleInputSend" class="btn-link">Shorten It!</button>
      </div>
      <ul class="results-list">
        <li
          class="results-item"
          v-for="result in results"
          :key="result.data.shortUrl"
        >
          <span class="results-destination">{{ result.data.destination }}</span>
          <a
            class="results-shortened-url"
            target="_blank"
            :href="'//' + result.data.shortUrl"
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
    };
  },
  methods: {
    validateInput(value) {
      // Add code to check if input is a Url
      let re = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/;
      return re.test(value);
    },
    handleInputSend() {
      if (this.validateInput(this.inputValue)) {
        this.isValid = true;
        this.$emit("shorten-url", this.inputValue);
        this.inputValue = "";
        this.isValid = false;
      } else {
        this.isValid = false;
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
  },
  emits: ["shorten-url"],
};
</script>

<style scoped>
@import url("./urlInput.css");
</style>
