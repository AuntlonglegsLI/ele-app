<template>
  <div class="login">
    <!-- logo -->
    <img src="../assets/images/ele_logo.png" alt="登录时的logo" />
    <!-- 内容--手机号 -->
    <InputGroup
      type="number"
      v-model="phone"
      placeholder="请输入您的手机号码"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnClick="getVerifyCode"
    />
    <!-- 验证码 -->
    <InputGroup type="number" v-model="verifyCode" placeholder="请输入验证码" :error="errors.verifyCode" />
    <!-- 用户服务协议 -->
    <div class="login_des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <!-- 登录按钮 -->
    <button class="login_btn" :disabled="isClick" @click="login">登陆</button>
  </div>
</template>

<script>
import InputGroup from "../components/inputGroup";
export default {
  name: "login",
  components: {
    InputGroup
  },
  data() {
    return {
      phone: "",
      verifyCode: "",
      errors: {},
      btnTitle: "获取验证码",
      disabled: false
    };
  },
  computed: {
    isClick() {
      if (!this.phone || !this.verifyCode) return true;
      else return false;
    }
  },
  methods: {
    //   登录
    login() {
      // 清空错误提醒
      this.errors = {};
      // 发起请求
      this.$axios
        .post("/api/posts/sms_back", {
          phone: this.phone,
          code: this.verifyCode
        })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            // 发令牌
            localStorage.setItem("ele_login", true);
            // 跳转至首页
            this.$router.push("/");
          }
        })
        .catch(err => {
          console.log(err);
          this.errors = {
            code: err.response.data.msg
          };
        });
    },
    // 获取验证码
    getVerifyCode() {
      if (this.validatePhone()) {
        // 校验
        this.validateBtn();
        // 发送网络请求
        this.$axios
          .post("/api/posts/sms_send", {
            tpl_id: "136729",
            key: "795be723dd9e88c3ea98e2b6713ab795",
            phone: this.phone
          })
          .then(res => {
            console.log(res);
          });
      }
    },
    validatePhone() {
      // 验证手机号码
      if (!this.phone) {
        this.errors = {
          phone: "手机号码不能为空"
        };
        return false;
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: "请输入正确的手机号码"
        };
        return false;
      } else {
        this.errors = {};
        return true;
      }
    },
    validateBtn() {
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          this.btnTitle = "获取验证码";
          this.disabled = false;
          clearInterval(timer);
        } else {
          this.btnTitle = time + "秒后重新获取";
          this.disabled = true;
          time--;
        }
      }, 1000);
    }
  }
};
</script>

<style lang='scss' scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: #1b9dff;
  text-align: center;

  img {
    width: 60%;
    margin: 0 auto;
  }

  .login_des {
    color: #fff;
    margin-top: 10px;
    span {
      color: black;
    }
  }

  .login_btn {
    width: 100%;
    height: 45px;
    color: #fff;
    margin: 20px 0;
    font-size: 18px;
    border: none;
    outline: none;
    border-radius: 5px;
    letter-spacing: 5px;
    background-color: #98e165;
  }

  .login_btn[disabled] {
    // background-color: #98e165;
    opacity: 0.8;
  }
}
</style>