<template>
  <div class="index-wrap">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="4" v-for="(o, index) in 8" :key="o" :offset="1">
            <MusicCard :music="music[index]"></MusicCard>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
  @import './index.scss'
</style>

