import {SidebarConfig4Multiple} from "vuepress/config";
import projectSideBar from "./sidebars/projectSideBar";
import selfStudySideBar from "./sidebars/selfStudySideBar";
// @ts-ignore
export default {
    "/项目实战/": projectSideBar,
    "/自学之路/": selfStudySideBar,
    "/关于我们/": ["", "个人经历"],
    // 降级，默认根据文章标题渲染侧边栏
    "/": "auto",
} as SidebarConfig4Multiple;
