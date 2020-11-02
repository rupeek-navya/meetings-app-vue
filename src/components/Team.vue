<template>
    <div>
        <Navbar/>
        <div class="container my-3">  
            <div class="row">
                <div class="col-12 clearfix">
                    <div class="clearfix">
                    <h1>
                        Teams
                    </h1>
                    </div>
                    <hr /> 
                </div>
            </div>
            <div class="row">
                <div class="col-12 clearfix">
                    <router-link :to="{ name: 'search-team'}" class="mr-3">
                        Filter / Search Teams
                    </router-link>
                    <router-link :to="{ name: 'add-team' }">
                        Add a Team
                    </router-link>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar'
export default {
    name:'Team',
    components:{
        Navbar,
    }
}
</script>

<style>

</style>