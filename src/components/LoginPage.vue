<template>
    <div class="container my-3">
        <div v-if="this.errorM===''">
            <h2>Login</h2>
            <hr/>
            <form>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" name="email" id="email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" name="password" id="password">
                </div>
                <div v-if="this.errorN" class="alert alert-danger">Wrong Password!</div>
                <button type="submit" class="btn btn-primary" @click="onsubmit">Submit</button>
                <button class="btn btn-secondary float-right" @click="redirectRegister($event)">Don't have an account? Register</button>
            </form>  
        </div>
        <div v-else>
            <h2>Please Register(It looks like you don't have account)</h2>
            <hr/>
            <form>
                <div class="form-group">
                    <label for="name1">Name</label>
                    <input type="name" class="form-control" name="name1" id="name1">
                </div>
                <div class="form-group">
                    <label for="email1">Email</label>
                    <input type="email" class="form-control" name="email1" id="email1">
                </div>
                <div class="form-group">
                    <label for="password1">Password</label>
                    <input type="password" class="form-control" name="password1" id="password1">
                </div>
                <button type="submit" class="btn btn-primary" @click="onregister($event)">Submit</button>
                <button class="btn btn-secondary float-right" @click="redirectLogin($event)">Have an account? Login</button>
            </form> 
        </div>
    </div>
</template>

<script>
import {generateToken,onRegister} from '../services/validate'

export default {
    name:"LoginPage",
    data(){
        return{
            errorM:'',
            errorN:''
        }
    },
    methods:{
        onsubmit(e){
                e.preventDefault()
                const email=document.querySelectorAll('#email')[0].value;
                const password=document.querySelectorAll('#password')[0].value;
                generateToken(email,password)
                .then(()=>{
                    this.errorM=''
                    this.errorN=''
                    if(localStorage.getItem('token')){
                        this.$router.push('/calendar')
                    }
                }).catch(err=>{
                    this.errorM=err
                    if(err==='password mismatch'){
                        this.errorN=err
                        this.errorM=''
                        
                    }    
                    console.log(this.errorM)
                })
            },
            onregister(e){
                e.preventDefault()
                const name=document.querySelectorAll('#name1')[0].value;
                const email=document.querySelectorAll('#email1')[0].value;
                const password=document.querySelectorAll('#password1')[0].value;
                onRegister(email,password,name).then(()=>{
                    this.errorM=''
                })
            },
            redirectRegister(e){
                e.preventDefault()
                this.errorM="please register"
            },
            redirectLogin(e){
                e.preventDefault()
                this.errorM=''
            }
        }
    }
</script>
