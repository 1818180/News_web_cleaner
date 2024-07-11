// ==UserScript==
// @name         Clean News Pages
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove distracting elements from various news sites
// @author       You
// @match        https://www.npr.org/*
// @match        https://www.nationalgeographic.com/*
// @match        https://www.bbc.com/*
// @match        https://www.scientificamerican.com/*
// @match        https://www.nytimes.com/*
// @match        https://www.vox.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 定义要移除的元素和属性配置
    const config = {
        "https://www.npr.org": {
            "elements": ["header", "footer","aside"],
            "classes": [
                "share-tools share-tools--secondary",
                "callout-end-of-story-mount-piano-wrap",
                "recommended-stories",
                "bucketwrap internallink insettwocolumn inset2col",
                "audio-module"
            ],
            "attras": {
                "id": ["main-sidebar","npr-player"],
                "aria-label": ["Tweet","advertisement"]
            }
        },
        "https://www.nationalgeographic.com": {
            "classes": [
                "AlertBanner alert_top",
                "GlobalNav",
                "InlineImagePromo__Content",
                "FITT_Article_end",
                "FrameBackgroundFull FrameBackgroundFull--dark",
                "InlineEmail__Container",
                "theme-e FITT_Article_main__sidebar oBTii mrzah pNwJE iWsMV vkle",
                "GlobalFooter",
                "GlobalFooter__CopyrightWrapper",
                "natgeo-ad",
                "CHWlW ZgZTu FlDNH hQfuy feniZ wBpop uAyYK yJYJo OGgqj tQHio PCVZs  Kiog iKqXF eeiyR",
                "rEPuv seFhp WtEci"
            ],
            "attras": {
                "data-testid": [
                    "prism-editors-note",
                    "prism-share",
                    "prism-newsletter-form"
                ]
            }
        },
        "https://www.bbc.com": {
            "elements": ["header","aside","footer","nav"],
            "attras":{
                "data-component":["links-block"]
            }
        },
        "https://www.scientificamerican.com": {
            "elements": ["header", "footer","aside"]
        },
        "https://www.nytimes.com": {
            "elements": ["footer","aside"],
            "attras": {
                "data-testid": [
                    "share-tools"
                ],
                "id":["bottom-wrapper"]
            },
            "classes":["bottom-of-article"]
        },
        "https://www.vox.com":{
        "elements":["aside", "footer", "nav","form"],
        "attras": {
            "aria-label":["Top Navigation"],
            "data-concert-ads-name":[
                "desktop_article_body",
                "desktop_feature_footer",
                "desktop_feature_body",
                "desktop_feature_body_dynamic"
            ]
        },
        "classes":[
            "_1j2ggcb0",
            "x2c1mg2 x2c1mg5 x2c1mg7",
            "duet--layout--rail x2c1mg0 x2c1mg1",
            "duet--layout--article-recirc _1ot72dd0 _1agbrix1",
            "dynamic-js-slot dfp_ad--held-area up-show",
            "duet--ad-container--default",
            "duet--layout--header-pattern _1iaikll1",
            "duet--cta--newsletter mr4kua8"
        ]
        }
    };

    // 获取当前网站的配置
    const currentHost = window.location.hostname;
    const currentConfig = config[`https://${currentHost}`];

    if (currentConfig) {
        // 定义移除元素的函数
        function removeElements() {
            // 移除指定的元素
            if (currentConfig.elements) {
                currentConfig.elements.forEach(selector => {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(element => element.remove());
                });
            }

            // 移除指定的类
            if (currentConfig.classes) {
                currentConfig.classes.forEach(className => {
                    const elements = document.getElementsByClassName(className);
                    while (elements.length > 0) {
                        elements[0].remove();
                    }
                });
            }

            // 移除指定属性的元素
            if (currentConfig.attras) {
                for (const attr in currentConfig.attras) {
                    currentConfig.attras[attr].forEach(value => {
                        const selector = `[${attr}="${value}"]`;
                        const elements = document.querySelectorAll(selector);
                        elements.forEach(element => element.remove());
                    });
                }
            }
        }

        // 初始移除元素
        removeElements();

        // 创建 MutationObserver 以监听 DOM 变化
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'subtree') {
                    removeElements();
                }
            });
        });

        // 配置 MutationObserver
        const config = {
            childList: true,
            subtree: true
        };

        // 开始观察文档主体
        observer.observe(document.body, config);
    }
})();
