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
                        <div style="min-height: 400px;">
                            <transition name="fade">
                                <router-view></router-view>
                            </transition>
                        </div>
                    </Card>
                </Content>
                <Footer class="layout-footer-center">
                    <Tabs>
                        <TabPane label="版权所有" icon="ios-at">
                            <div>
                                <Icon type="md-thumbs-up" size="30"/>forever &copy; Coder-Ginger<Icon type="md-thumbs-up" size="30"/>
                            </div>
                        </TabPane>
                        <TabPane label="关于我们" icon="ios-bookmark">
                            <div>
                                <p><Icon type="md-walk" size="30"/>This is a Garbage Operation System.<Icon type="md-walk" size="30"/></p>
                            </div>
                        </TabPane>
                    </Tabs>
                </Footer>
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
        },
    }
</script>
<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: absolute;
        display:flex;
        border-radius: 4px;
        height: 100%;
        width: 100%;
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

    .fade-leave-to {
        opacity: 0;
        transform: translate3d(0, -300px, 0);
        position: absolute;
        z-index: -10;
    }

    .fade-enter {
        transform: translate3d(0, 300px, 0);
        position: absolute;
    }

    .fade-leave-active,
    .fade-enter-active {
        transition: .5s all ease;
    }
</style>