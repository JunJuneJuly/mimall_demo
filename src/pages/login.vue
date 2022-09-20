<template>
    <div class="login">
        <div class="container">
            <div class="nav-header">
                <img src="../../public/imgs/logo-mi.png" alt="" class="logo">
                <div class="nav-info">
                    <h1 class="title">小米商城</h1>
                    <p class="subtitle">让每个人都能享受科技的乐趣</p>
                </div>
            </div>
        </div>
        <div class="wrapper">
            <div class="container">
                <div class="login-form">
                    <div class="login-title">
                        <a href=""><span class="account-login">账号登录</span></a>
                        <a href=""><span class="scan-login">扫码登录</span></a>
                    </div>
                    <div class="login-input">
                        <input type="text" placeholder="邮箱/手机号码/小米ID" v-model="username">
                        <input type="password" placeholder="密码" v-model="password">
                    </div>
                    <div class="login-btn">
                        <a href="javascript:;" class="btn-huge" @click="login">登录</a>
                    </div>
                    <div class="login-footer">
                        <div class="mobile">
                            <a href="javascript:;" @click="register"><span>手机短信登录/注册</span></a>
                        </div>
                        <div class="others">
                            <a href="javascript:;"><span>立即注册</span></a>
                            <a href="javascript:;"><span>忘记密码?</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="language">
                <ul>
                    <li>简体</li>
                    <li>繁体</li>
                    <li>English</li>
                    <li>常见问题</li>
                    <li>隐私政策</li>
                </ul>
            </div>
            <div class="copyright">
                <p><span>小米公司版权所有-京ICP备10046444-</span><span><span></span>京公网安备11010802020134号-京ICP证110507号</span></p>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {mapActions} from 'vuex'
    export default {
        name:'login',
        data(){
            return{
                username:'',
                password:'',
                userId:''
            }
        },
        methods:{
            login(){
                let { username,password } = this;
                this.axios.post('/user/login',{
                    username,
                    password
                }).then((res)=>{
                    this.$cookie.set('userId',res.id,{expires:'Session'});
                    // this.$store.dispatch('saveUserName',res.username);
                    this.saveUserName(res.username);
                    this.$router.push({
                        name:'index',
                        params:{
                            from:'login'
                        }
                    });
                })
            },
            ...mapActions(['saveUserName']),
            register(){
                this.axios.post('/user/register',{
                    username:'Jun',
                    password:'Jun',
                    email:'lucky@qq.com'
                }).then(()=>{
                    this.$message.success('注册成功')
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../src/assets/scss/mixin";
    .login{
        width: 100%;
        .container{
            .nav-header{
                width: 100%;
                margin: 29px auto 32px 0px;
                .logo{
                    display: inline-block;
                    width: 53px;
                }
                .nav-info{
                    display: inline-block;
                    margin-left: 18px;
                    .title{
                        font-size: 33px;
                        font-weight: 400;
                        color: #333333;
                    }
                    .subtitle{
                        font-size: 10px;
                        font-weight: 300;
                        color: #666666;
                    }
                }
            }

        }
        .wrapper{
            width: 100%;
            @include bgImg(558px,100%,'../../public/imgs/login-bg.jpg',cover);
            .container{
                position: relative;
                .login-form{
                    width: 410px;
                    height: 510px;
                    background: white;
                    position: absolute;
                    top:37px;
                    right: 30px;
                    .login-title{
                        padding-top: 40px;
                        font-size: 24px;
                        font-weight: 400;
                        text-align: center;
                        .account-login{
                            color: #FF6600;
                            border-right: 2px solid #D7D7D7;
                            padding-right: 35px;
                        }
                        .scan-login{
                            padding-left: 35px;
                            color: #666666;
                        }
                    }
                    .login-input{
                        input{
                            box-sizing: border-box;
                            display: block;
                            width: 348px;
                            height: 50px;
                            margin: 49px 0 20px 31px;
                            border: 1px solid #E5E5E5;
                            padding-left: 14px;
                            font-size: 14px;
                            font-weight: 300;
                            color: #999999;
                            &:last-child{
                                margin-bottom: 0;
                                margin-top: 20px;
                            }
                        }
                    }
                    .login-btn{
                        a{
                            display: inline-block;
                            width: 348px;
                            height: 50px;
                            background: #FF6600;
                            align-items: center;
                            margin-left: 31px;
                            margin-top: 30px;
                            font-size: 16px;
                            font-weight: 400;
                            color: #FFFFFF;
                            text-align: center;
                            .btn-huge{

                            }
                        }

                    }
                    .login-footer{
                        display: flex;
                        justify-content: space-between;
                        width: 348px;
                        margin-left: 31px;
                        margin-top: 14px;
                        .mobile{
                            a{
                                font-size: 14px;
                                font-family: PingFang SC;
                                font-weight: 300;
                                color: #FF6600;
                                line-height: 14px;
                            }
                        }
                        .others{
                            a{
                                font-size: 14px;
                                font-family: PingFang SC;
                                font-weight: 300;
                                color: #999999;
                                line-height: 14px;
                                border-right: 1px solid #D7D7D7;
                                padding-right: 7px;
                                &:last-child{
                                    border: none;
                                    padding-right: 0;
                                    padding-left: 7px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .footer{
            background: white;
            padding-top: 250px;
            padding-bottom: 93px;
            text-align: center;
            .language{
                ul{
                    li{
                        font-size: 14px;
                        font-weight: 400;
                        color: #333333;
                        display: inline-block;
                        /*border-right: 1px solid #999999;*/
                        padding-left: 9px;
                        &:after{
                            content: ' ';
                            vertical-align: middle;
                            width: 1px;
                            display: inline-block;
                            box-sizing: border-box;
                            height: 14px;
                            border-left: 1px solid #999999;
                            margin-left: 9px;
                        }
                        &:last-child:after{
                            border: none;
                        }
                    }
                }
            }
            .copyright{
                margin-top: 19px;
                font-size: 14px;
                font-weight: 400;
                color: #333333;
            }

        }
    }
</style>
