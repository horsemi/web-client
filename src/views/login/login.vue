<template>
	<div class="login-wrap">
		<el-container>
			<el-header>
				<h1>登录</h1>
			</el-header>
			<el-main>
				<el-row :gutter="24">
  					<el-col :offset="8" :span="8">
						<el-card >
							<div slot="header" class="clearfix">
								<span>登录</span>
							</div>
							<el-form label-position="left" label-width="80px" :model="LoginData" :rules="dataRule">
								<el-form-item label="账号" prop="userName">
									<el-input type="text" v-model="LoginData.userName" >
									</el-input>
								</el-form-item>
								<el-form-item label="密码" prop="userPassword">
									<el-input show-password v-model="LoginData.userPassword">
									</el-input>
								</el-form-item>
							</el-form>
							<el-button @click="login">登录</el-button>
							<el-button @click="test">注册</el-button>
						</el-card>
					</el-col>
				</el-row>
			</el-main>
			<el-footer>
				<h6>赞助</h6>
			</el-footer>
		</el-container>
	</div>
</template>

<script lang="ts" src="./login.ts"></script>

<style lang="scss">
	@import "./login.scss";
</style>

