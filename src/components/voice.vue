<template>
  <div>
    <div class="row p-5 title">
      <div class="col">
        <h1>テキストの読み上げ</h1>
        <p>
          テキストを読み上げます。
          <br />よく使うテキストを保存することもできます。
        </p>
      </div>
    </div>
    <div class="row p-4">
      <div class="col-12">
        <h4>読み上げたいテキストを入力</h4>

        <textarea class="form-control" v-model="input"></textarea>
      </div>
    </div>

    <div class="row p-4">
      <div class="col-6 mx-auto">
        <button class="btn btn-primary btn-block" v-on:click="add();read();" :disabled="!browser">
          <span v-if="!browser">ChromeかSafariでご利用下さい</span>
          <span v-else>読み上げ</span>
        </button>
      </div>
    </div>

    <div class="row p-4">
      <div class="col-12">
        <h4>過去のテキスト</h4>

        <div class="row item_old align-items-center" v-for="(val, i) in voice" :key="i">
          <div class="col">
            <nl2br tag="p" :text="val"></nl2br>
          </div>
          <div class="col-auto">
            <button class="btn btn-info btn-block" v-on:click="read(i)" :disabled="!browser">
              <span v-if="!browser">ChromeかSafariでご利用下さい</span>
              <span v-else>読み上げ</span>
            </button>
          </div>
          <div class="col-auto">
            <button class="btn btn-secondary btn-block" v-on:click="del(i)">削除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "voice",
  mounted() {
    this.voice = JSON.parse(localStorage.getItem("voice")) || [];

    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf("chrome") !== -1 && ua.indexOf("edge") === -1) {
      this.browser = "chrome";
    } else if (ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1) {
      this.browser = "safari";
    } else {
      this.browser = false;
    }
  },
  methods: {
    add() {
      if (this.input) {
        this.voice.unshift(this.input);
        this.setItem();
      }
    },
    read(i) {
      if (typeof i !== "undefined") {
        var output = this.voice[i];
      } else {
        var output = this.input;
      }

      var msg = new SpeechSynthesisUtterance();
      var voices = window.speechSynthesis.getVoices();

      if (this.browser == "chrome") {
        msg.voice = voices[12];
      } else if (this.browser == "safari") {
        msg.voice = voices[30];
      } else {
        msg.voice = voices[1];
      }
      msg.volume = 1;
      msg.rate = 1;
      msg.pitch = 1;
      msg.text = output;
      msg.lang = "ja-JP";
      speechSynthesis.speak(msg);
      console.log(msg);
    },
    del(i) {
      this.voice.splice(i, 1);
      this.setItem();
    },
    setItem() {
      localStorage.setItem("voice", JSON.stringify(this.voice));
    }
  },
  data() {
    return {
      browser: false,
      input: "",
      voice: []
    };
  }
};
</script>

<style scoped>
.item_old + .item_old {
  border-top: 1px solid #bbb;
  margin-top: 1rem;
  padding-top: 1rem;
}
</style>
