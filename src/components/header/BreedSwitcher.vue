<template>
  <div class="breed" @blur="isOpened = false" ref="breedWrapper">
    <button
      type="button"
      class="breed__selected"
      :class="{ opened: isOpened }"
      @click="isOpened = !isOpened">
      {{ isSelected }}
    </button>
    <Transition>
      <ul class="breed__list" v-show="isOpened">
        <li
          class="breed__item"
          v-for="(option, i) of options"
          :key="i"
          @click="
            isSelected = option;
            isOpened = false;
          ">
          <RouterLink :to="{ name: 'breed', params: { breedId: option } }">
            {{ option }}
          </RouterLink>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import useClickOutside from '@/composables/useClickOutside.js';

  const props = defineProps({
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
  });

  const isOpened = ref(false);
  const isSelected = ref('');

  isSelected.value = props.default
    ? props.default
    : props.options.length > 0
    ? props.options[0]
    : null;

  const breedWrapper = ref(null);
  useClickOutside(breedWrapper, () => {
    isOpened.value = false;
  });
</script>

<style lang="less" scoped>
  .breed {
    position: relative;
    padding-right: 16px;
    &__selected {
      position: relative;
      display: inline-block;
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--text);
      background-color: var(--header);
      user-select: none;
      transition: color @anim-fast;
      z-index: 3;
      &::first-letter {
        text-transform: capitalize;
      }
      &:after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: calc(50% - 2px);
        right: -17px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid var(--text);
        transition: color @anim-fast, transform @anim-fast,
          border-top-color @anim-fast;
      }
      &.opened {
        &:after {
          transform: rotate(180deg);
        }
      }
      &:focus-visible {
        outline: var(--outline) solid 2px;
      }
    }
    &__list {
      width: 220px;
      height: 300px;
      position: absolute;
      top: 40px;
      right: -14px;
      text-align: right;
      background-color: var(--breed-background);
      padding: 10px 0;
      border-radius: 5px;
      overflow: auto;
      z-index: 1;
    }
    &__item a {
      display: block;
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--text);
      padding: 5px 14px;
      user-select: none;
      transition: background-color @anim-slow;
      cursor: pointer;
      &::first-letter {
        text-transform: capitalize;
      }
      &:focus,
      &:active {
        background-color: var(--header);
      }
    }
  }
  .v-enter-active {
    animation: expand @anim-fast;
  }
  .v-leave-active {
    animation: expand @anim-fast reverse;
  }
  @keyframes expand {
    0% {
      height: 0;
    }
    100% {
      height: 300px;
    }
  }
  @media @md {
    .breed {
      &__selected {
        font-size: 1.8rem;
      }
      &__list {
        width: 180px;
      }
      &__item {
        font-size: 1.8rem;
      }
    }
  }
  @media @hover {
    .breed__selected:hover {
      color: var(--text-hover);
      &:after {
        border-top-color: var(--text-hover);
      }
    }
    .breed__item:hover {
      background-color: var(--header);
    }
  }
</style>
