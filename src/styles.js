'use strict';

module.exports = function (colors) {
  const {
    primary: { background, foreground },
    normal: { red, green, blue, cyan },
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
        fg: foreground,
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
        fg: foreground,
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
        item: {
          bg: foreground,
          fg: background,
        },
        selected: {
          bg: green,
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
        fg: foreground,
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
            fg: green,
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
        fg: foreground,
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
    terminal: {
      border: {
        type: 'line',
        fg: foreground,
        bg: background,
      },
      style: {
        bg: background,
        fg: foreground,
        focus: {
          border: {
            fg: green,
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
        fg: foreground,
        bg: background,
      },
      style: {
        bg: background,
        fg: foreground,
        focus: {
          border: {
            fg: green,
          },
        },
        label: {
          fg: foreground,
          bg: background,
        },
      },
    },
    bigtext: {
      border: {
        type: 'line',
        fg: foreground,
        bg: background,
      },
      style: {
        bg: background,
        fg: foreground,
        focus: {
          border: {
            fg: green,
          },
        },
        label: {
          fg: foreground,
          bg: background,
        },
      },
    },
    message: {
      border: {
        type: 'line',
        fg: foreground,
        bg: background,
      },
      style: {
        bg: background,
        fg: foreground,
        focus: {
          border: {
            fg: green,
          },
        },
        label: {
          fg: foreground,
          bg: background,
        },
      },
    },
    prompt: {
      style: {
        bg: colors.primary.background,
        fg: colors.primary.foreground,
        border: {
          type: 'line',
          bg: colors.primary.background,
          fg: colors.normal.blue,
        },
        okay: {
          bg: colors.normal.green,
          fg: colors.normal.black,
        },
        cancel: {
          bg: colors.normal.red,
          fg: colors.normal.black,
        },

        input: {
          bg: colors.primary.background,
          fg: colors.primary.foreground,
          border: {
            type: 'line',
            bg: colors.primary.background,
            fg: colors.primary.foreground,
          },
        },
      },
    },
    confirmDialog: {
      style: {
        bg: colors.primary.background,
        fg: colors.primary.foreground,
        border: {
          type: 'line',
          bg: colors.primary.background,
          fg: colors.normal.blue,
        },
        okay: {
          bg: colors.normal.green,
          fg: colors.normal.black,
        },
        cancel: {
          bg: colors.normal.red,
          fg: colors.normal.black,
        },

        input: {
          bg: colors.primary.background,
          fg: colors.primary.foreground,
          border: {
            type: 'line',
            bg: colors.primary.background,
            fg: colors.primary.foreground,
          },
        },
      },
    },
  };
};
