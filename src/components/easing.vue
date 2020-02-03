<template>
  <div>
    <div class="row p-5 title">
      <div class="col">
        <h1>Bounce系イージング生成ヘルパー</h1>
        <p>開始値・終了値・経過時間を指定してBounce系イージングを適用した@keyframesを生成します。</p>
      </div>
    </div>
    <div class="row p-4 align-items-center">
      <div class="col-auto">
        <h4 class="mb-0">イージングを選択</h4>
      </div>
      <div class="col-auto">
        <select v-model="selectedeasing" class="form-control">
          <option v-for="(item,key) in easing" :key="key" :value="item.name">{{ item.name }}</option>
        </select>
      </div>
      <div class="col-auto">
        <h4 class="mb-0">分割数</h4>
      </div>
      <div class="col-auto">
        <input type="number" v-model.number="sep" class="form-control" />
      </div>
    </div>
    <div class="row p-4 align-items-center">
      <div class="col-auto">
        <h4 class="mb-0">出力タイプ</h4>
      </div>
      <div class="col-auto">
        <select v-model="mode" class="form-control">
          <option value="1">key:value;</option>
          <option value="2">property:attr(value)</option>
        </select>
      </div>
    </div>
    <div class="row p-4">
      <div class="col-6">
        <h4>開始%</h4>
        <input type="number" class="form-control" v-model.number="startp" />
      </div>
      <div class="col-6">
        <h4>終了%</h4>
        <input type="number" class="form-control" v-model.number="endp" />
      </div>
    </div>
    <div class="row p-4">
      <div class="col-6">
        <h4>開始値</h4>
        <input type="number" class="form-control" v-model.number="start" />
      </div>
      <div class="col-6">
        <h4>終了値</h4>
        <input type="number" class="form-control" v-model.number="end" />
      </div>
    </div>

    <div class="row p-4">
      <div class="col-6 mx-auto">
        <button class="btn btn-primary btn-block" v-on:click="generate">@keyframesを生成</button>
      </div>
    </div>

    <div class="row p-4">
      <div class="col">
        <textarea v-model="result" class="form-control"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "easing",
  mounted() {},
  methods: {
    generate() {
      var vm = this;

      vm.result = "@keyframes animation {\n";

      var i = 0;
      while (i < vm.sep + 1) {
        //%
        var percent = vm.startp + ((vm.endp - vm.startp) / vm.sep) * i;

        var x = (1 / vm.sep) * i;
        var t = ((vm.endp - vm.startp) / vm.sep / 100) * i;
        var b = vm.start;
        var c = vm.end - vm.start;
        var d = (vm.endp - vm.startp) / 100;

        var param = vm[vm.selectedeasing](x, t, b, c, d);

        vm.result += "\t" + Math.round(percent * 100) / 100 + "% {\n";
        if (vm.mode == "1") {
          vm.result +=
            "\t\tproperty: " + Math.round(param * 100) / 100 + "px;\n";
        } else {
          vm.result +=
            "\t\tproperty: attribute(" +
            Math.round(param * 100) / 100 +
            "px);\n";
        }
        vm.result += "\t}\n";
        i++;
      }
      vm.result += "\n}";
    },
    easeInElastic: function(x, t, b, c, d) {
      var vm = this;
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (t == 0) return b;
      if ((t /= d) == 1) return b + c;
      if (!p) p = d * 0.3;
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
      return (
        -(
          a *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin(((t * d - s) * (2 * Math.PI)) / p)
        ) + b
      );
    },
    easeOutElastic: function(x, t, b, c, d) {
      var vm = this;
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (t == 0) return b;
      if ((t /= d) == 1) return b + c;
      if (!p) p = d * 0.3;
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
      return (
        a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
        c +
        b
      );
    },
    easeInOutElastic: function(x, t, b, c, d) {
      var vm = this;
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (t == 0) return b;
      if ((t /= d / 2) == 2) return b + c;
      if (!p) p = d * (0.3 * 1.5);
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
      if (t < 1)
        return (
          -0.5 *
            (a *
              Math.pow(2, 10 * (t -= 1)) *
              Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
          b
        );
      return (
        a *
          Math.pow(2, -10 * (t -= 1)) *
          Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
          0.5 +
        c +
        b
      );
    },
    easeInBounce: function(x, t, b, c, d) {
      var vm = this;
      return c - vm.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
      var vm = this;
      if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
      } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
      } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
      }
    },
    easeInOutBounce: function(x, t, b, c, d) {
      var vm = this;
      if (t < d / 2) return vm.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
      return vm.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
  },
  data() {
    return {
      selectedeasing: "",
      startp: Number,
      endp: Number,
      start: Number,
      end: Number,
      sep: Number,
      result: "",
      mode: "",
      easing: [
        {
          name: "easeInElastic"
        },
        {
          name: "easeOutElastic"
        },
        {
          name: "easeInOutElastic"
        },
        {
          name: "easeInBounce"
        },
        {
          name: "easeOutBounce"
        },
        {
          name: "easeInOutBounce"
        }
      ]
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
