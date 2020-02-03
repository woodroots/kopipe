<template>
  <div>
    <h1>
      <router-link to="/">Home</router-link>
    </h1>
    <nav>
      <h3 class="p-3 mb-0">文字列操作</h3>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/regexp" class="nav-link p-3">正規表現用にエスケープ</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/tatsuya" class="nav-link p-3">ひらがなに濁点</router-link>
        </li>
      </ul>
      <h3 class="p-3 mb-0">データ生成</h3>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/number" class="nav-link p-3">連番生成</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/replace" class="nav-link p-3">CSVを整形</router-link>
        </li>
      </ul>
      <h3 class="p-3 mb-0">CSS</h3>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/easing" class="nav-link p-3">Bounce系イージング生成</router-link>
        </li>
      </ul>

      <h3 class="p-3 mb-0">画像処理</h3>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/delexif" class="nav-link p-3">Exifを消す</router-link>
        </li>
      </ul>
      <h3 class="p-3 mb-0">画像作成</h3>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/presen" class="nav-link p-3">プレゼン作成</router-link>
        </li>
      </ul>
      <h3 class="p-3 mb-0">データ取得</h3>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/title" class="nav-link p-3">URL一覧からタイトルを取得</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/pref" class="nav-link p-3">都道府県・市区一覧を生成</router-link>
        </li>
      </ul>
      <h3 class="p-3 mb-0">音声</h3>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/voice" class="nav-link p-3">テキスト読み上げ</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "commonNav",
  mounted() {}
};
</script>

<style scoped>
h1 a {
  display: block;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
h3 {
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.4);
}
a {
  color: #fff;
}
a:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
