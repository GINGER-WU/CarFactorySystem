<template >
    <div>
    <Menu mode="horizontal" :theme="theme1" active-name="index">  
        <MenuItem to="/home" name="index">
            <Icon type="ios-home" />
            首页
        </MenuItem>
        <Submenu name="carfile">
            <template slot="title">
                <Icon type="ios-folder" />
                汽车档案
            </template>
            <MenuGroup title="档案操作">
                <MenuItem to="/carfiles" name="indexFiles">档案首页</MenuItem>
                <MenuItem to="/newcarfile" name="newFiles">创建新的档案</MenuItem>
            </MenuGroup>
        </Submenu>
        <Submenu name="warehouse">
            <template slot="title">
                <Icon type="ios-cube" />
                配件仓库
            </template>
            <MenuGroup title="配件操作">
                <MenuItem to="/warehouse" name="indexWarehouse">仓库首页</MenuItem>
                <MenuItem to="/newfittings" name="newFittings">配件入库</MenuItem>
            </MenuGroup>
        </Submenu>
        <Submenu name="worker">
            <template slot="title">
                <Icon type="md-contacts" />
                员工管理
            </template>
            <MenuGroup title="员工操作">
                <MenuItem to="/workers" name="indexWorkers">员工首页</MenuItem>
                <MenuItem to="/newworkers" name="newWorkers">添加员工信息</MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem to="statistics" name="Statistics">
            <Icon type="ios-stats" />
           利润统计
        </MenuItem>
        <Button style="margin-left: 58%;" @click="value1 = true" type="primary">
            <Icon type="md-person" />
            user
        </Button>
        <Drawer title="用户信息" :closable="false" v-model="value1">
            <div style="text-align: center;" class="demo-avatar">
                <Avatar :style="{background: color}" size="100">{{ user }}</Avatar>
            </div>
            <br>
            <div style="text-align: center;">
                <a>注销</a>
            </div>
        </Drawer>
    </Menu>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'dark',
                value1: false,
                color:['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'],
                user:'James'
            }
        }
    }
</script>
