import {SidebarConfig4Multiple} from "vuepress/config";
import projectSideBar from "./sidebars/projectSideBar";
import selfStudySideBar from "./sidebars/selfStudySideBar";
import interviewQuestionBar from "./sidebars/interviewQuestionBar";
import essentialWebsiteBar from "./sidebars/essentialWebsiteBar";
import resumeModificationBar from "./sidebars/resumeModificationBar";
import studyGuideBar from "./sidebars/studyGuideBar";
// @ts-ignore
export default {
    "/项目实战/": projectSideBar,
    "/学习指南/": studyGuideBar,
    "/自学之路/": selfStudySideBar,
    "/高频面试题/": interviewQuestionBar,
    "/必备网站/": essentialWebsiteBar,
    "/简历修改/": resumeModificationBar,
    "/关于我们/": ["", "个人经历"],
    // 降级，默认根据文章标题渲染侧边栏
    "/": "auto",
} as SidebarConfig4Multiple;
