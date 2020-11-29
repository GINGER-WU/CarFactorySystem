<template>
    <div id="app">
        <div class="layout">
            <Layout>
                <Header>
                    <topbar></topbar>
                </Header>
                <br>
                <Content :style="{padding: '0 20px'}">
                    <Card>
                        <div style="min-height: 200px;">
                            <router-view></router-view>
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
                value: [20, 50]
            }
        },
        components: {
            topbar,
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
</style>