import { Component, Vue } from "vue-property-decorator"
import * as loginApi from '@/api/login';
import { LoginData } from '@/types/views/login.interface'

@Component({
    components: {
        
    }
})
export default class Login extends Vue {
    protected LoginData = {
        userName: "",
        userPassword: ""
    }

    protected dataRule = {
        userName:
        [
            { type: 'string', message: '请确认账号格式是否正确', trigger: 'blur'},
            { required: true, message: '请输入账号', trigger: 'blur'},
            { max: 15, message: '账号位数过长', trigger: 'blur'}
        ],
        userPassword:
        [
            { type: 'string', message: '请确认密码格式是否正确', trigger: 'blur'},
            { required: true, message: '请输入密码', trigger: 'blur'},
            { max: 20, message: '密码位数过长', trigger: 'blur'}
        ]
    }

    protected async created() {
        // 
    }

    protected activated() {
        //
    }

    protected mounted() {
        //
    }

    // 初始化函数
    protected init() {
        //
    }

    protected async login() {
        this.$services.user.login(this.LoginData).then(() => {
            this.$router.push('/index/page1');
        })
        .catch(() => {
            this.$message.error("登录失败，请检查账号或密码是否正确！");
        });    
    }

    protected async test() {
        console.info(this);
        let result = loginApi.health();
        console.info(result);
    }
}
