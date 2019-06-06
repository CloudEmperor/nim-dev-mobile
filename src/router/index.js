import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 定义路由
// 每个路由应该映射一个组件。 其中"component"是一个组件配置对象。
const routes = [
    // 设置登陆页面为首页
    {
        path: "/",
        redirect: {
            name: "login"
        }
    },
    //主页
    {
        path: "/main",
        name: "main",
        component(resolve) {
            require(["../pages/admin/Main"], resolve);
        },
        children: [{
                //首页
                path: "/home",
                name: "home",
                component(resolve) {
                    require(["../pages/admin/Home"], resolve);
                }
            },
            {
                // 最近消息列表（会话）
                path: "/session",
                name: "session",
                component(resolve) {
                    require(["../pages/Session"], resolve);
                }
            },
            {
                //日程
                path: "/schedule",
                name: "schedule",
                component(resolve) {
                    require(["../pages/admin/Schedule"], resolve);
                }
            },
            {
                //通用页面（设置）我的
                path: "/general",
                name: "general",
                component(resolve) {
                    require(["../pages/General"], resolve);
                }
            }
        ]
    },
    // 登录
    {
        path: "/login",
        name: "login",
        component(resolve) {
            require(["@/pages/login/Login"], resolve);
        }
    },
    // 灵活查询
    {
        path: "/flexibleQuery",
        name: "FlexibleQuery",
        component(resolve) {
            require(["@/pages/flexibleQuery/FlexibleQuery"], resolve);
        }
    },
    {
        path: "/flexibleQuery1",
        name: "FlexibleQuery1",
        component(resolve) {
            require(["@/pages/flexibleQuery/FlexibleQuery1"], resolve);
        }
    },
    // 名称查询
    {
        path: "/searchProject",
        name: "SearchProject",
        component(resolve) {
            require(["@/pages/flexibleQuery/SearchProject"], resolve);
        }
    },
    // 项目动态
    {
        path: "/dynamic",
        name: "Dynamic",
        component(resolve) {
            require(["@/pages/dynamic/Dynamic"], resolve);
        }
    },
    // 查看图片
    {
        path: "/viewImg",
        name: "ViewImg",
        component(resolve) {
            require(["@/pages/dynamic/ViewImg"], resolve);
        }
    },
    //审批管理
    {
        path: "/Approval",
        name: "Approval",
        component(resolve) {
            require(["@/pages/management/Approval"], resolve);
        }
    },
    //发起审批
    {
        path: "/Initiateapproval",
        name: "Initiateapproval",
        component(resolve) {
            require(["@/pages/management/Initiateapproval"], resolve);
        }
    },
    //提交审批
    {
        path: "/Review",
        name: "Review",
        component(resolve) {
            require(["@/pages/management/Review"], resolve);
        }
    },
    //审批
    {
        path: "/Initiatepending",
        name: "Initiatepending",
        component(resolve) {
            require(["@/pages/management/Initiatepending"], resolve);
        }
    },
    //待处理工作
    {
        path: "/pending",
        name: "pending",
        component(resolve) {
            require(["@/pages/management/pending"], resolve);
        }
    },
    //   我的项目
    {
        path: "/myprojects",
        name: "myprojects",
        component(resolve) {
            require(["@/pages/management/myprojects"], resolve);
        }
    },
    //   添加项目
    {
        path: "/addProjects",
        name: "addProjects",
        component(resolve) {
            require(["@/pages/management/AddProjects"], resolve);
        }
    },
    //   事件详情
    {
        path: "/EventDetails",
        name: "EventDetails",
        component(resolve) {
            require(["@/pages/management/EventDetails"], resolve);
        }
    },
    //   编辑事件
    {
        path: "/editors",
        name: "editors",
        component(resolve) {
            require(["@/pages/management/editors"], resolve);
        }
    },
    //项目详情 
    {
        path: "/ProjectDetails",
        name: "ProjectDetails",
        component(resolve) {
            require(["@/pages/management/ProjectDetails"], resolve);
        }
    },
    //项目详情节点
    {
        path: "/Nodedetails",
        name: "Nodedetails",
        component(resolve) {
            require(["@/pages/management/Nodedetails"], resolve);
        }
    },
    //添加项目节点详情事件   
    {
        path: "/Addevent",
        name: "Addevent",
        component(resolve) {
            require(["@/pages/management/Addevent"], resolve);
        }
    },
    {
        path: "/information",
        name: "information",
        component(resolve) {
            require(["@/pages/management/information"], resolve);
        }
    },
    // 添加代办事项
    {
        path: "/addSchedule",
        name: "addSchedule",
        component(resolve) {
            require(["../pages/admin/scheduleModel/AddSchedule"], resolve);
        }
    },
    // 系统消息
    {
        path: "/sysmsgs",
        name: "sysmsgs",
        component(resolve) {
            require(["../pages/SysMsgs"], resolve);
        }
    },
    // 聊天记录
    {
        path: "/chat/:sessionId",
        name: "chat",
        component(resolve) {
            require(["../pages/Chat"], resolve);
        }
    },
    // 聊天历史记录
    {
        path: "/chathistory/:sessionId",
        name: "chathistory",
        component(resolve) {
            require(["../pages/ChatHistory"], resolve);
        }
    },
    // 直播间
    {
        path: "/room",
        name: "room",
        component(resolve) {
            require(["../pages/Room"], resolve);
        }
    },
    // 直播聊天页
    {
        path: "/roomChat/:chatroomId",
        name: "roomChat",
        component(resolve) {
            require(["../pages/RoomChat"], resolve);
        }
    },
    // 通讯录
    {
        path: "/contacts",
        name: "contacts",
        component(resolve) {
            require(["../pages/Contacts"], resolve);
        }
    },
    // 好友名片
    {
        path: "/namecard/:userId",
        name: "namecard",
        component(resolve) {
            require(["../pages/NameCard"], resolve);
        }
    },
    // 好友名片-设置备注
    {
        path: "/namecardremark/:userId",
        name: "namecardremark",
        component(resolve) {
            require(["../pages/NameCardRemark"], resolve);
        }
    },
    // 好友名片-搜索好友/群
    {
        path: "/searchuser/:searchType",
        name: "searchuser",
        component(resolve) {
            require(["../pages/SearchUser"], resolve);
        }
    },
    // 邀请好友-加入群
    {
        path: "/teaminvite/:teamId",
        name: "teaminvite",
        component(resolve) {
            require(["../pages/TeamInvite"], resolve);
        }
    },
    // 群列表
    {
        path: "/teamlist/:teamType",
        name: "teamlist",
        component(resolve) {
            require(["../pages/TeamList"], resolve);
        }
    },
    // 群名片
    {
        path: "/teamcard/:teamId",
        name: "teamcard",
        component(resolve) {
            require(["../pages/TeamCard"], resolve);
        }
    },
    // 群管理
    {
        path: "/teammanage/:teamId",
        name: "teammanage",
        component(resolve) {
            require(["../pages/TeamManage"], resolve);
        }
    },
    // 群设置
    {
        path: "/teamsetting",
        name: "teamsetting",
        component(resolve) {
            require(["../pages/TeamSetting"], resolve);
        }
    },
    // 群成员列表
    {
        path: "/teammembers/:teamId",
        name: "teammembers",
        component(resolve) {
            require(["../pages/TeamMembers"], resolve);
        }
    },
    // 群成员名片
    {
        path: "/teammembercard/:member",
        name: "teammembercard",
        component(resolve) {
            require(["../pages/TeamMemberCard"], resolve);
        }
    },
    // 发送群消息回执页
    {
        path: "/teamSendMsgReceipt/:teamId",
        name: "TeamSeamMsgReceipt",
        component(resolve) {
            require(["../pages/TeamSendMsgReceipt"], resolve);
        }
    },
    // 群消息回执详情页
    {
        path: "/msgReceiptDetail/:msgInfo",
        name: "msgReceiptDetail",
        component(resolve) {
            require(["../pages/TeamMsgReceiptDetail"], resolve);
        }
    }
];

let router = new VueRouter({
    history: true,
    routes
})

export default router