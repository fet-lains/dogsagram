<template>
  <div class="breed" @blur="isOpened = false">
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
            $emit('input', option);
          ">
          {{ option }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

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
  defineEmits(['input']);

  const isOpened = ref(false);

  const isSelected = props.default
    ? props.default
    : props.options.length > 0
    ? props.options[0]
    : null;
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
      color: @mine-shaft;
      background-color: @ronchi;
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
        border-top: 6px solid @mine-shaft;
        transition: color @anim-fast, transform @anim-fast,
          border-top-color @anim-fast;
      }
      &.isOpened {
        &:after {
          transform: rotate(180deg);
        }
      }
      &:focus {
        outline: @cornflower-blue solid 2px;
      }
    }
    &__list {
      width: 170px;
      height: 300px;
      position: absolute;
      top: 40px;
      right: -14px;
      text-align: right;
      background-color: @gallery;
      padding: 10px 0;
      border-radius: 5px;
      overflow: auto;
      z-index: 1;
    }
    &__item {
      font-size: 1.6rem;
      font-weight: 700;
      color: @mine-shaft;
      padding: 5px 14px;
      user-select: none;
      transition: background-color @anim-slow;
      cursor: pointer;
      &::first-letter {
        text-transform: capitalize;
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
      color: @mine-shaft-hover;
      &:after {
        border-top-color: @mine-shaft-hover;
      }
    }
    .breed__item:hover,
    .breed__item:focus {
      background-color: @ronchi;
    }
  }
</style>
