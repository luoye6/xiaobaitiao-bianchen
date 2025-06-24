import {NavItem} from "vuepress/config";

export default [
    {
        text: "自学之路",
        link: "/自学之路/",
        items: [
            {
                text: "大学经历", link: "/自学之路/#大学经历",
            },
            {
                text: "求职经历", link: "/自学之路/#求职经历",
            },
            {
                text: "职场工作", link: "/自学之路/#职场工作",
            },
            {
                text: "创作经历", link: "/自学之路/#创作经历",
            },
            {
                text: "生活日常", link: "/自学之路/#生活日常",
            },
            {
                text: "面经分享", link: "/自学之路/#面经分享",
            },
            {
                text: "技术分享", link: "/自学之路/#技术分享",
            },
        ]
    },
    {
        text: "高频面试题",
        link: '/高频面试题/',
        items: [
            {
                text: "Java热门面试题", link: "/高频面试题/#Java热门面试题",
            },
            {
                text: "计算机网络热门面试题", link: "/高频面试题/#计算机网络热门面试题",
            },
        ]

    },
    {
        text: "项目实战",
        link: '/项目实战/'
    },
    {
        text: "作者",
        link: '/作者/'
    },
] as NavItem[];
