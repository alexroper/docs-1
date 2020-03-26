<template>
  <component
    class="browser-shot"
    :is="link ? 'a' : 'div'"
    :href="link ? url : ''"
    target="_blank"
    rel="noopener"
  >
    <figure class="browser-shot-wrapper">
      <div class="browser-shot-content">
        <div class="browser-top"></div>
        <div class="address-bar">
          <div class="address">{{ getDisplayUrl(url) }}</div>
        </div>
        <div
          class="image"
          :class="{ 'limit-height': maxHeight }"
          :style="{ maxHeight: maxHeight ? `${maxHeight}px` : null }"
        >
          <slot></slot>
        </div>
      </div>
      <figcaption class="caption" v-if="caption">{{ caption }}</figcaption>
    </figure>
  </component>
</template>

<style>
.browser-shot {
  display: block;
  position: relative;
  margin-top: 2em;
  margin-bottom: 2em;
}

.browser-shot-wrapper {
  margin: 0;
}

.browser-shot-content {
  display: block;
  position: relative;
  box-shadow: 0 0 48px rgba(74, 124, 246, 0.1);
  background: transparent;
  border-radius: 6px;
}

.browser-top {
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  height: 22px;
  background: #e5edfd url("../../../images/window-buttons.svg") no-repeat left
    center;
  background-size: auto 18px;
}

.address-bar {
  display: block;
  background-color: #e5edfd;
  padding: 0 0.5em 0.5em 0.5em;
}

.address {
  color: #2c3e50;
  background: rgba(255, 255, 255, 0.5);
  font-weight: normal;
  display: block;
  padding: 0.125em 0.25em;
  font-size: 0.75em;
  text-decoration: none;
}

.browser-shot:hover {
  text-decoration: none !important;
}

.browser-shot .image {
  margin: 0;
  position: relative;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  overflow: hidden;
  background-color: transparent;
}

.browser-shot .image.limit-height {
  overflow-x: hidden;
  overflow-y: auto;
}

.browser-shot .image img {
  position: relative;
  display: block;
}

.browser-shot .caption {
  text-align: center;
  margin-top: 1em;
  font-size: 0.9em;
  color: #637599;
}
</style>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    link: {
      type: Boolean,
      required: false
    },
    cleanUrl: {
      type: Boolean,
      require: false,
      default: true
    },
    caption: {
      type: String,
      required: false
    },
    maxHeight: {
      type: Number,
      required: false
    }
  },
  methods: {
    getDisplayUrl(url) {
      if (!this.cleanUrl) {
        return url;
      }

      // remove protocol and trailing slash
      return url
        .replace("https://", "")
        .replace("http://", "")
        .replace(/\/$/, "");
    }
  }
};
</script>
