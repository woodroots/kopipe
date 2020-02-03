import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
	state: {
		home: {
			title: 'HOME',
			desc: 'トップページ'
		},
		regexp: {
			title: '正規表現用にエスケープ',
			desc: '正規表現でエスケープが必要な文字をエスケープします。'
		},
		tatsuya: {
			title: 'ひらがなに濁点',
			desc: 'ひ゛ら゛がな゛に゛濁点を゛入れ゛ま゛す゛！'
		},
		number: {
			title: '連番生成',
			desc: '連番を生成します。'
		},
		replace: {
			title: 'CSVをHTMLに整形',
			desc: 'CSV（カンマ区切りのテキスト）を雛形に従って整形します。'
		}
	}
})