<template>
<div>
    <el-tabs id="tab">
        <el-tab-pane label="GET">
            <el-button @click="GET">GET</el-button>
        </el-tab-pane>
        <el-tab-pane label="POST">
            <el-button @click="POST">POST</el-button>
        </el-tab-pane>
        <el-tab-pane label="UPLOAD">
            <el-upload
                drag
                action
                multiple
                :http-request="UPLOAD"
                :before-upload="beforeUpload"
                :file-list="fileLists">
                <div>将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
        </el-tab-pane>
        <el-tab-pane label="DOWNLOAD">
            <el-button @click="DOWNLOAD">DOWNLOAD</el-button>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script lang='ts'>
    import { Component, Vue } from "vue-property-decorator";
    import Sortable from 'sortablejs';
    import * as pageApi from '@/api/page';

    @Component({
        created() {
            console.info(this);
            console.info(document);
        },
        mounted() {
            console.info(this.$el);
            let eltabs = this.$el.querySelectorAll('.el-tabs__nav')[0];
            Sortable.create(eltabs as HTMLElement, {
                onEnd: (evt) => {
                    console.info(evt);
                }
            });
        }
    })

    
    export default class Page1 extends Vue {

        protected fileLists = new Array<{name: string, url: string}>();

        created() {
            //
        }

        protected GET() {
            pageApi.get({data: "test"});
        }

        protected POST() {
            pageApi.post({data: "test"});
        }

        protected beforeUpload(file: any) {
            if (file.size > 3072000) {
                console.error(file.name + " file too large!");
                this.$message.error(file.name + ' 文件超过了3MB');
                return false;
            }
        }

        protected UPLOAD(params: any) {
            pageApi.upload(params.file);
        }

        protected DOWNLOAD() {
            pageApi.download({data: 'download'});
        }
    }
</script>

<style>

</style>
