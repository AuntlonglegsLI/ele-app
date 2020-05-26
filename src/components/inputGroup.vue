<template>
  <div class="text_group">
    <!-- 组件结构 -->

    <!-- 组件容器 -->
    <div class="input_group" :class="{'is-invalid':error}">
      <!-- 输入框 -->
      <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :name="name"
        @input="$emit('input',$event.target.value)"
      />
      <!-- 输入框后面的按钮 -->
      <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">{{btnTitle}}</button>
    </div>
    <!-- 错误提醒 -->
    <div v-if="error" class="invalid-feedback">{{error}}</div>
  </div>
</template>

<script>
export default {
  name: "inputGroup",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: String,
    placeholder: String,
    name: String,
    btnTitle: String,
    disabled: Boolean,
    error: String
  }
};
</script>

<style lang="scss" scoped>
.text_group {
  overflow: hidden;
}

.input_group {
  border-radius: 4px;
  padding: 12px;
  display: flex;
  margin: 10px 0;
  flex-direction: row;
  background-color: #fff;
  justify-content: space-between;

  input {
    width: 60%;
    height: 100%;
    outline: none;
    border: none;
    font-size: 14px;
  }

  button {
    border: none;
    outline: none;
    background: #fff;
  }

  button[disabled] {
    color: #aaa;
  }
}

.is-invalid {
  border: 1px solid red;
}

.invalid-feedback {
  color: red;
  padding-top: 5px;
  text-align: left;
}
</style>