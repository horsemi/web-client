<template>
<div>
    <ul id="items">
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
    </ul>
    <el-tabs id="tab">
        <el-tab-pane label="1">
            1
        </el-tab-pane>
        <el-tab-pane label="2">
            2
        </el-tab-pane>
        <el-tab-pane label="3">
            3
        </el-tab-pane>
        <el-tab-pane label="4">
            4
        </el-tab-pane>
        <el-tab-pane label="5">
            5
        </el-tab-pane>
        <el-tab-pane label="6">
            6
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
    import { Component, Vue } from "vue-property-decorator";
    import Sortable from 'sortablejs';
    // var el = document.getElementById('items');
    // var sortable = Sortable.create(el);
    @Component({
        created() {
            console.info(this);
            console.info(document);
        },
        // mounted() {
        //     console.info(this.$el);
        //     debugger;
        //     let eltabs = this.$el.querySelectorAll('.el-tabs__nav')[0];
        //     Sortable.create(eltabs, {
        //         onEnd: (evt) => {
        //             console.info(evt);
        //         }
        //     });
        // }
    })
    export default class Page1 extends Vue {

        created() {
            //
        }
    }
</script>

<style>

</style>
