'use strict';

module.exports = function (colors) {
  const {
    primary: { background, foreground },
    normal: { red, green, blue, yellow, magenta, cyan },
  } = colors;

  return {
    colors,
    program: {
      bg: background,
      fg: foreground,
    },
    logo: {
      border: {
        type: 'line',
        fg: foreground,
        bg: background,
      },
      style: {
        fg: red,
        bg: background,
      },
    },
    searchBox: {
      border: {
        type: 'line',
        fg: foreground,
        bg: background,
      },
      style: {
        fg: cyan,
        bg: background,
      },
    },
    text: {
      fg: foreground,
      bg: background,

      border: {
        type: 'line',
        fg: foreground,
        bg: background,
      },
    },
    footer: {
      style: {
        fg: foreground,
        bg: background,
        selected: {
          bg: yellow,
          fg: background,
        },
        border: {
          type: 'line',
          fg: foreground,
          bg: background,
        },
      },
    },
    addonsByCategory: {
      border: {
        type: 'line',
        fg: blue,
        bg: background,
      },
      style: {
        selected: {
          fg: background,
          bg: cyan,
        },
        focus: {
          border: {
            fg: red,
          },
        },
      },
    },
    taskList: {
      border: {
        type: 'line',
        fg: green,
        bg: background,
      },
      style: {
        bg: background,
        fg: foreground,
        selected: {
          fg: background,
          bg: foreground,
        },
        focus: {
          border: {
            fg: red,
          },
        },
        label: {
          fg: foreground,
          bg: background,
        },
      },
    },
    searchResults: {
      border: {
        type: 'line',
        fg: green,
        bg: background,
      },
      style: {
        bg: background,
        fg: foreground,
        selected: {
          fg: background,
          bg: foreground,
        },
        focus: {
          border: {
            fg: red,
          },
        },
        label: {
          fg: foreground,
          bg: background,
        },
      },
    },
    rsaList: {
      border: {
        type: 'line',
        fg: green,
        bg: background,
      },
      style: {
        bg: background,
        fg: foreground,
        selected: {
          fg: background,
          bg: foreground,
        },
        focus: {
          border: {
            fg: red,
          },
        },
        label: {
          fg: foreground,
          bg: background,
        },
      },
    },
    newAddonsList: {
      border: {
        type: 'line',
        fg: green,
        bg: background,
      },
      style: {
        bg: background,
        fg: foreground,
        selected: {
          fg: background,
          bg: foreground,
        },
        focus: {
          border: {
            fg: red,
          },
        },
        label: {
          fg: foreground,
          bg: background,
        },
      },
    },
    deps: {
      border: {
        type: 'line',
        fg: green,
        bg: background,
      },
      style: {
        bg: background,
        fg: foreground,
        focus: {
          border: {
            fg: red,
          },
        },
        selected: {
          fg: background,
          bg: foreground,
        },
        label: {
          fg: foreground,
          bg: background,
        },
      },
    },
    devdeps: {
      border: {
        type: 'line',
        fg: green,
        bg: background,
      },
      style: {
        bg: background,
        fg: foreground,
        focus: {
          border: {
            fg: red,
          },
        },
        selected: {
          fg: background,
          bg: foreground,
        },
        label: {
          fg: foreground,
          bg: background,
        },
      },
    },
    box: {
      border: {
        type: 'line',
        fg: green,
        bg: background,
      },
      style: {
        bg: background,
        fg: foreground,
        focus: {
          border: {
            fg: red,
          },
        },
        label: {
          fg: foreground,
          bg: background,
        },
      },
    },
  };
};
