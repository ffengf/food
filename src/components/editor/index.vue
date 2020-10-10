
<template>
    <div id="wangeditor">
        <div class="editor" ref="editor" style="text-align: left;"></div>
    </div>
</template>

<script lang="ts">
//没有d.ts声明文件
// @ts-ignore
import E from "wangeditor";
import {
    Vue,
    Component,
    Watch,
    Prop,
    Model,
    Emit,
} from "vue-property-decorator";

@Component({
    name: "editorTxt",
})
export default class extends Vue {
    @Model("change_input", { type: String, required: true })
	readonly input!: string;
    @Emit("change_input")
    change_input(str: string) {
        return str;
    }

	editor:any

    get value() {
        return this.input;
	}
    set value(val) {
        this.change_input(val);
	}
    get url() {
        return `${process.env.VUE_APP_API}/admin/article/imgUpload`;
	}

	@Watch('value')
	watch_val(){
		this.editor.txt.html(this.value)
	}

    mounted() {
		const editor = new E(this.$refs.editor);
		this.editor = editor
        editor.customConfig.onchangeTimeout = 1;
        editor.customConfig.uploadFileName = "file";
        editor.customConfig.uploadImgServer = this.url;
        editor.customConfig.onchange = (value: string) => {
            this.value = value;
        };
        editor.customConfig.debug = true;
        editor.customConfig.menus = [
            "head",
            "bold",
            "fontSize",
            "fontName",
            "italic",
            "underline",
            "strikeThrough",
            "foreColor",
            "backColor",
            "link",
            "list",
            "justify",
            "quote",
            "image",
            "table",
            "code",
            "undo",
            "redo",
        ];
        editor.customConfig.zIndex = 1;
		editor.create();
		editor.txt.html(this.value)
    }
}
</script>

<style scoped>
#wangeditor{
	max-width: 85vw;
}
#edit_text > div {
	overflow: hidden !important;
	background: rgb(243, 243, 243);
	height: 500px;

}
</style>
