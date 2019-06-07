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
            { max: 10, message: '账号位数过长', trigger: 'blur'}
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
        this.$services.user.login(this.LoginData);
        this.$router.push('/index/page1');
    }

    protected async test() {
        console.info(this);
        let result = loginApi.health();
        console.info(result);
    }
}
