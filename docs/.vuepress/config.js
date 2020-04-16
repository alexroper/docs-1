module.exports = {
  theme: "craftdocs",
  plugins: [
    ["@vuepress/google-analytics", { ga: "UA-39036834-17" }],
    [
      "vuepress-plugin-medium-zoom",
      {
        selector: ".theme-default-content img",
        delay: 1000,
        options: {
          margin: 24,
          background: "#f1f5fd",
          scrollOffset: 0
        }
      }
    ]
  ],
  locales: {
    "/": {
      lang: "en-US",
      title: "Craft CMS Tutorial"
    }
  },
  base: "/tutorial/",
  shouldPrefetch: () => false,
  themeConfig: {
    logo: "/icon.svg",
    docsRepo: "craftcms/tutorial",
    docsDir: "docs",
    docsBranch: "master",
    searchMaxSuggestions: 10,
    sidebar: {
      "/": [
        {
          title: "Introduction",
          collapsable: true,
          children: [""]
        },
        {
          title: "0. Set Up Your Environment",
          collapsable: true,
          children: [
            "environment/",
            "environment/terminal",
            "environment/editor",
            "environment/stack"
          ]
        },
        {
          title: "1. Install Craft CMS",
          collapsable: true,
          children: [
            "install/files",
            "install/database",
            "install/server",
            "install/setup"
          ]
        },
        {
          title: "2. Build Your Content",
          collapsable: true,
          children: [
            "configure/",
            "configure/control-panel",
            "configure/modeling",
            "configure/section",
            "configure/globals",
            "configure/single",
            "configure/editing"
          ]
        },
        {
          title: "3. Build Your Front End",
          collapsable: true,
          children: [
            "build/",
            "build/routing",
            "build/twig",
            "build/templates",
            "build/preview",
            "build/graphql"
          ]
        },
        {
          title: "Next Steps",
          collapsable: true,
          children: ["more/"]
        }
      ]
    },
    nav: [
      {
        text: "Resources",
        items: [
          {
            text: "Sample Code",
            link: "https://github.com/craftcms/tutorial-project"
          },
          {
            text: "Tutorial Source",
            link: "https://github.com/craftcms/tutorial"
          },
          {
            text: "Craft Documentation",
            link: "https://docs.craftcms.com/v3/"
          },
          {
            text: "craftcms.com",
            link: "https://craftcms.com/"
          }
        ]
      }
    ],
    codeLanguages: {
      twig: "Twig",
      php: "PHP",
      json: "JSON",
      graphql: "GraphQL",
      html: "HTML"
    }
  },
  markdown: {
    anchor: {
      level: [2, 3, 4]
    },
    toc: {
      format(content) {
        return content.replace(/[_`]/g, "");
      }
    },
    extendMarkdown(md) {
      md.use(replaceApiLinks)
        .use(require("vuepress-theme-craftdocs/markup"))
        .use(require("markdown-it-deflist"))
        .use(require("markdown-it-imsize"));
    }
  }
};

function replaceApiLinks(md) {
  // code adapted from the markdown-it-replace-link plugin
  md.core.ruler.after("inline", "replace-link", function(state) {
    state.tokens.forEach(function(blockToken) {
      if (blockToken.type === "inline" && blockToken.children) {
        blockToken.children.forEach(function(token, tokenIndex) {
          if (token.type === "link_open") {
            token.attrs.forEach(function(attr) {
              if (attr[0] === "href") {
                let replace = replaceApiLink(attr[1]);
                if (replace) {
                  attr[1] = replace;
                  let next = blockToken.children[tokenIndex + 1];
                  if (next.type === "text") {
                    next.content = next.content.replace(/^(api|config):/, "");
                  }
                }
              }
              return false;
            });
          }
        });
      }
    });
    return false;
  });
}

function replaceApiLink(link) {
  link = decodeURIComponent(link);
  let m = link.match(
    /^(?:api:)?\\?([\w\\]+)(?:::\$?(\w+)(\(\))?)?(?:#([\w\-]+))?$/
  );
  if (m) {
    let className = m[1];
    let subject = m[2];
    let isMethod = typeof m[3] !== "undefined";
    let hash = m[4];

    if (className.match(/^craft\\/) || className.match(/^Craft/)) {
      let url =
        "https://docs.craftcms.com/api/v3/" +
        className.replace(/\\/g, "-").toLowerCase() +
        ".html";
      if (subject) {
        hash = "";
        if (isMethod) {
          hash = "method-";
        }
        hash += subject.replace(/_/g, "-").toLowerCase();
      }
      return url + (hash ? `#${hash}` : "");
    }

    if (className.match(/^yii\\/) || className.match(/^Yii/)) {
      let url =
        "https://www.yiiframework.com/doc/api/2.0/" +
        className.replace(/\\/g, "-").toLowerCase();
      if (subject) {
        hash = (isMethod ? `${subject}()` : `\$${subject}`) + "-detail";
      }
      return url + (hash ? `#${hash}` : "");
    }
  }

  m = link.match(/^config:(.+)/);
  if (m) {
    return "/config/config-settings.md#" + m[1].toLowerCase();
  }
}
