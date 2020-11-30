<template>
    <div id="app">
        <div class="layout">
            <Layout>
                <Header>
                    <topbar></topbar>
                </Header>
                <br>
                <Content :style="{padding: '0 100px'}">
                    <Breadcrumb separator=">>>">
                        <BreadcrumbItem v-for="(name,index) in matchedArr" :key='index'>
                            {{name}}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <br>
                    <Card>
                        <div style="min-height: 720px;">
                            <transition name="slide-fade">
                                <router-view></router-view>
                            </transition>
                        </div>
                    </Card>
                </Content>
                <Footer class="layout-footer-center">2020~2120 &copy; WuGinger</Footer>
            </Layout>
        </div>
    </div>
    </div>
</template>
<script>
    import topbar from '@/components/topbar'
    export default {
        data() {
            return {
            }
        },
        components: {
            topbar,
        },
        // computed: {
        //     matchedArr() {
        //         let temps = [];
        //         let temp = [];
        //         let tem = [];
        //         let end1 = '';
        //         this.$route.matched.filter((item, index, self) => {
        //             if (item.path) {
        //                 let name = item.path;
        //                 temp.push(name);
        //             }
        //         });
        //         temp.filter((item, index, self) => {
        //             if (!temps.includes(item)) {
        //                 temps.push(item);
        //             }
        //         })
        //         end1 = temps[temps.length-1];
        //         return tem;
        //     },
        // }
        computed: {
            matchedArr() {
                let temp = [], temps = [];
                this.$route.matched.filter((item, index, self) => {
                    // if(item.meta.title){
                    //     const title = item.meta.title;
                    //     temp.push(title);
                    // }
                    if (item.name) {
                        const name = item.name;
                        temp.push(name);
                    }
                });
                temp.filter((item, index, self) => {
                    if (!temps.includes(item)) {
                        temps.push(item);
                    }
                })
                return temps;
            }
        }
    }
</script>
<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    .layout-nav {
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }

    .layout-footer-center {
        text-align: center;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter,
    .slide-fade-leave-to

    /* .slide-fade-leave-active for below version 2.1.8 */
        {
        transform: translateX(10px);
        opacity: 0;
    }
</style>