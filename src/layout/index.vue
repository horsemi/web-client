<template>
  <div class="index-wrap">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="4">
            <!-- 左侧导航栏 -->
            <slider></slider>
          </el-col>
          <el-col :span="20">
            <!-- header -->
            <nav-top></nav-top>
            <!-- 内容区 -->
            <div class="app-wrap">
              <!-- 此处放置el-tabs代码 -->
              <div>
                <el-tabs
                  v-model="activeIndex"
                  type="border-card"
                  closable
                  v-if="openTab.length"
                  @tab-click="tabClick"
                  @tab-remove="tabRemove"
                >
                  <el-tab-pane
                    :key="item.name"
                    v-for="(item) in openTab"
                    :label="item.name"
                    :name="item.route"
                  ></el-tab-pane>
                </el-tabs>
              </div>
              <div class="content-wrap">
                <router-view/>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import "./index.scss";
</style>

