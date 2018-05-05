import React,{Component} from 'react';
import {Menu, Icon, Layout,} from 'antd';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
//引入路由
import { Link } from 'react-router';

class SiderCustom extends Component{

    state = {
        //是否折叠
        collapsed: false,
        //菜单类型
        mode: 'inline',
        openKey: '',
        selectedKey: ''
    };

    componentDidMount() {
        const _path = this.props.path;
        this.setState({
            openKey: _path.substr(0, _path.lastIndexOf('/')),
            selectedKey: _path
        });
    }

    //展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };
    menuClick = e => {
        console.log(this.state);
        this.setState({
            selectedKey: e.key
        });

    };
    openMenu = v => {
        console.log(v);
        this.setState({
            openKey: v[v.length - 1]
        })
    };

    render(){
        return(
            // Sider 侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中。
            <Sider
                breakpoint='lg'
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div className="logo" />
                {/*导航菜单，就是左边那一片大的*/}
                <Menu
                    onClick={this.menuClick}
                    theme="dark"
                    mode={this.state.mode}
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={[this.state.openKey]}
                    onOpenChange={this.openMenu}
                >
                    {/*子菜单一个一个的菜单*/}
                    <SubMenu
                        key={"/app/table"}
                        title={<span><Icon type={"copy"} /><span className={"nav-text"}>表格</span></span>}
                    >
                        <Menu.Item key="/app/table/advancedTable"><Link to={'/app/table/advancedTable'}>高级表格</Link></Menu.Item>
                        <Menu.Item key="/app/table/basicTable"><Link to={'/app/table/basicTable'}>基础表格</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key={"/app/form"}
                        title={<span><Icon type={"edit"} /><span className={"nav-text"}>表单</span></span>}
                    >
                        <Menu.Item key={"/app/form/basicform"}><Link to={'/app/form/basicform'}>基础表单</Link></Menu.Item>
                        <Menu.Item key={"/app/form/wrappedform"}><Link to={'/app/form/wrappedform'}>高级表单</Link></Menu.Item>
                    </SubMenu>
                </Menu>
                <style>
                    {/*条件样式*/}
                    {`
                    #nprogress .spinner{
                         left: ${this.state.collapsed ? '70px' : '206px'};
                         right: 0 !important;
                    }
                    `}
                </style>
            </Sider>
        )
    }
}

export default SiderCustom;