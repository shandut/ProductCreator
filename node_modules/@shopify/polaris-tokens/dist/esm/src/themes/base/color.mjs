import { gray, blackAlpha, azure, green, yellow, orange, red, blue, purple, rose, magenta, lime, teal } from '../../colors.mjs';

var color = {
  'color-scheme': {
    value: 'light'
  },
  'color-bg': {
    value: gray[6],
    description: 'The default background color of the admin.'
  },
  'color-bg-inverse': {
    value: gray[16],
    description: 'Use for high contrast page or component backgrounds.'
  },
  'color-bg-surface': {
    value: gray[1],
    description: 'The background color for elements with the highest level of prominence, like a card.'
  },
  'color-bg-surface-hover': {
    value: gray[4],
    description: 'The hover state color for elements with the highest level of prominence.'
  },
  'color-bg-surface-active': {
    value: gray[5],
    description: 'The active state (on press) color for elements with the highest level of prominence.'
  },
  'color-bg-surface-selected': {
    value: gray[6],
    description: 'The selected state color for elements with the highest level of prominence.'
  },
  'color-bg-surface-disabled': {
    value: blackAlpha[5],
    description: 'The disabled state color for elements.'
  },
  'color-bg-surface-secondary': {
    value: gray[4],
    description: 'The background color for elements with a secondary level of prominence.'
  },
  'color-bg-surface-secondary-hover': {
    value: gray[6],
    description: 'The hover state color for elements with a secondary level of prominence.'
  },
  'color-bg-surface-secondary-active': {
    value: gray[7],
    description: 'The active state (on press) color for elements with a secondary level of prominence.'
  },
  'color-bg-surface-secondary-selected': {
    value: gray[7],
    description: 'The selected state color for elements with a secondary level of prominence.'
  },
  'color-bg-surface-tertiary': {
    value: gray[5],
    description: 'The background color for elements with a third level of prominence.'
  },
  'color-bg-surface-tertiary-hover': {
    value: gray[7],
    description: 'The hover state color for elements with a third level of prominence.'
  },
  'color-bg-surface-tertiary-active': {
    value: gray[8],
    description: 'The active state (on press) color for elements with a third level of prominence.'
  },
  'color-bg-surface-brand': {
    value: gray[8],
    description: 'Use to apply the key color to elements.'
  },
  'color-bg-surface-brand-hover': {
    value: gray[7],
    description: 'The hover state color for key elements.'
  },
  'color-bg-surface-brand-active': {
    value: gray[6],
    description: 'The active state (on press) color for key elements.'
  },
  'color-bg-surface-brand-selected': {
    value: gray[6],
    description: 'The selected state color for key elements.'
  },
  'color-bg-surface-info': {
    value: azure[3],
    description: 'Use for backgrounds communicating important information, like banners.'
  },
  'color-bg-surface-info-hover': {
    value: azure[4],
    description: 'The hover state color for communicating important information.'
  },
  'color-bg-surface-info-active': {
    value: azure[6],
    description: 'The active state (on press) color for communicating important information.'
  },
  'color-bg-surface-success': {
    value: green[3],
    description: 'Use for backgrounds communicating success, like banners.'
  },
  'color-bg-surface-success-hover': {
    value: green[4],
    description: 'The hover state color for communicating success.'
  },
  'color-bg-surface-success-active': {
    value: green[5],
    description: 'The active state (on press) color for communicating success.'
  },
  'color-bg-surface-caution': {
    value: yellow[2],
    description: 'Use for backgrounds communicating caution, like banners.'
  },
  'color-bg-surface-caution-hover': {
    value: yellow[3],
    description: 'The hover state for communicating caution.'
  },
  'color-bg-surface-caution-active': {
    value: yellow[4],
    description: 'The active state (on press) color for communicating caution.'
  },
  'color-bg-surface-warning': {
    value: orange[3],
    description: 'Use for backgrounds communicating warning, like banners.'
  },
  'color-bg-surface-warning-hover': {
    value: orange[4],
    description: 'The hover state color for communicating warning.'
  },
  'color-bg-surface-warning-active': {
    value: orange[5],
    description: 'The active state (on press) color for communicating warning.'
  },
  'color-bg-surface-critical': {
    value: red[4],
    description: 'Use for backgrounds communicating critical information, like banners or input errors.'
  },
  'color-bg-surface-critical-hover': {
    value: red[5],
    description: 'The hover state color for communicating critical information.'
  },
  'color-bg-surface-critical-active': {
    value: red[6],
    description: 'The active state (on press) color for communicating critical information.'
  },
  'color-bg-surface-emphasis': {
    value: blue[3],
    description: 'Use for backgrounds indicating areas of focus in editors, such as the theme editor.'
  },
  'color-bg-surface-emphasis-hover': {
    value: blue[4],
    description: 'The hover state color for elements indicating areas of focus in editors.'
  },
  'color-bg-surface-emphasis-active': {
    value: blue[5],
    description: 'The active state (on press) color for elements indicating areas of focus in editors.'
  },
  'color-bg-surface-magic': {
    value: purple[2],
    description: 'Use for backgrounds of elements suggested by magic AI.'
  },
  'color-bg-surface-magic-hover': {
    value: purple[3],
    description: 'The hover state color for elements suggested by magic AI.'
  },
  'color-bg-surface-magic-active': {
    value: purple[5],
    description: 'The active state (on press) color for elements suggested by magic AI.'
  },
  'color-bg-surface-inverse': {
    value: gray[15],
    description: 'Use for elements on bg-inverse.'
  },
  'color-bg-surface-transparent': {
    value: blackAlpha[1],
    description: 'Use for elements that need a fully transparent background.'
  },
  'color-bg-fill': {
    value: gray[1],
    description: 'The background color of contained elements with a smaller surface area, like a button.'
  },
  'color-bg-fill-hover': {
    value: gray[3],
    description: 'The hover state color of contained elements with a smaller surface area, like a button.'
  },
  'color-bg-fill-active': {
    value: gray[4],
    description: 'The active state (on press) color of contained elements with a smaller surface area, like a button.'
  },
  'color-bg-fill-selected': {
    value: gray[10],
    description: 'The selected state color of contained elements with a smaller surface area, like a button or checkbox.'
  },
  'color-bg-fill-disabled': {
    value: blackAlpha[5],
    description: 'The disabled state color of contained elements with a smaller surface area, like a button.'
  },
  'color-bg-fill-secondary': {
    value: gray[6],
    description: 'The background color of elements with a smaller surface area and a secondary level of prominence.'
  },
  'color-bg-fill-secondary-hover': {
    value: gray[7],
    description: 'The hover state color of elements with a smaller surface area and a secondary level of prominence.'
  },
  'color-bg-fill-secondary-active': {
    value: gray[8],
    description: 'The active state (on press) color of elements with a smaller surface area and a secondary level of prominence.'
  },
  'color-bg-fill-secondary-selected': {
    value: gray[8],
    description: 'The selected state (on press) color of elements with a smaller surface area and a secondary level of prominence.'
  },
  'color-bg-fill-tertiary': {
    value: gray[8],
    description: 'The background color of elements with a smaller surface area and a third level of prominence.'
  },
  'color-bg-fill-tertiary-hover': {
    value: gray[9],
    description: 'The hover state color of elements with a smaller surface area and a third level of prominence.'
  },
  'color-bg-fill-tertiary-active': {
    value: gray[10],
    description: 'The active state (on press) color of elements with a smaller surface area and a third level of prominence.'
  },
  'color-bg-fill-brand': {
    value: gray[15],
    description: 'The background color of main actions, like primary buttons.'
  },
  'color-bg-fill-brand-hover': {
    value: gray[16],
    description: 'The hover state color of main actions, like primary buttons.'
  },
  'color-bg-fill-brand-active': {
    value: gray[16],
    description: 'The active state (on press) color of main actions, like primary buttons.'
  },
  'color-bg-fill-brand-selected': {
    value: gray[15],
    description: 'The selected state color of main actions, like primary buttons.'
  },
  'color-bg-fill-brand-disabled': {
    value: blackAlpha[9],
    description: 'The disabled state color of main actions, like primary buttons.'
  },
  'color-bg-fill-info': {
    value: azure[9],
    description: 'Use for backgrounds communicating important information on elements with a smaller surface area, like a badge or button.'
  },
  'color-bg-fill-info-hover': {
    value: azure[10],
    description: 'The hover state color for communicating important information on elements with a smaller surface area.'
  },
  'color-bg-fill-info-active': {
    value: azure[11],
    description: 'The active state (on press) color for communicating important information on elements with a smaller surface area.'
  },
  'color-bg-fill-info-secondary': {
    value: azure[5],
    description: 'Use for backgrounds communicating important information on elements with a smaller surface area, with a secondary level of prominence.'
  },
  'color-bg-fill-success': {
    value: green[12],
    description: "Use for backgrounds communicating success on elements with a smaller surface area, like a badge or a banner."
  },
  'color-bg-fill-success-hover': {
    value: green[13],
    description: 'The hover state color for communicating success on elements with a smaller surface area.'
  },
  'color-bg-fill-success-active': {
    value: green[14],
    description: 'The active state (on press) color for communicating success on elements with a smaller surface area.'
  },
  'color-bg-fill-success-secondary': {
    value: green[4],
    description: 'Use for backgrounds communicating success on elements with a smaller surface area, with a secondary level of prominence.'
  },
  'color-bg-fill-warning': {
    value: orange[9],
    description: 'Use for backgrounds communicating warning on elements with a smaller surface area, like a badge or a banner.'
  },
  'color-bg-fill-warning-hover': {
    value: orange[10],
    description: 'The hover state color for communicating warning on elements with a smaller surface area.'
  },
  'color-bg-fill-warning-active': {
    value: orange[11],
    description: 'The active state (on press) color for communicating warning on elements with a smaller surface area.'
  },
  'color-bg-fill-warning-secondary': {
    value: orange[7],
    description: 'Use for backgrounds communicating warning on elements with a smaller surface area, with a secondary level of prominence.'
  },
  'color-bg-fill-caution': {
    value: yellow[6],
    description: 'Use for backgrounds communicating caution on elements with a smaller surface area, like a badge or a banner.'
  },
  'color-bg-fill-caution-hover': {
    value: yellow[8],
    description: 'The hover state color for communicating caution on elements with a smaller surface area.'
  },
  'color-bg-fill-caution-active': {
    value: yellow[9],
    description: 'The active state (on press) color for communicating caution on elements with a smaller surface area.'
  },
  'color-bg-fill-caution-secondary': {
    value: yellow[5],
    description: 'Use for backgrounds communicating caution on elements with a smaller surface area, with a secondary level of prominence.'
  },
  'color-bg-fill-critical': {
    value: red[12],
    description: 'Use for backgrounds communicating critical information on elements with a smaller surface area, like a badge or a banner.'
  },
  'color-bg-fill-critical-hover': {
    value: red[13],
    description: 'The hover state color for communicating critical information on elements with a smaller surface area.'
  },
  'color-bg-fill-critical-active': {
    value: red[14],
    description: 'The active state (on press) color for communicating critical information on elements with a smaller surface area.'
  },
  'color-bg-fill-critical-selected': {
    value: red[14],
    description: 'The selected state color for communicating critical information on elements with a smaller surface area.'
  },
  'color-bg-fill-critical-secondary': {
    value: red[7],
    description: 'Use for backgrounds communicating critical information on elements with a smaller surface area, with a secondary level of prominence.'
  },
  'color-bg-fill-emphasis': {
    value: blue[13],
    description: 'Use for backgrounds indicating areas of focus in editors on elements with a smaller surface area, like a button or a badge.'
  },
  'color-bg-fill-emphasis-hover': {
    value: blue[14],
    description: 'The hover state color for indicating areas of focus in editors on elements with a smaller surface area.'
  },
  'color-bg-fill-emphasis-active': {
    value: blue[15],
    description: 'The active state (on press) color for indicating areas of focus in editors on elements with a smaller surface area.'
  },
  'color-bg-fill-magic': {
    value: purple[12],
    description: 'The background color of elements suggested by magic AI, like a badge or a banner.'
  },
  'color-bg-fill-magic-secondary': {
    value: purple[5],
    description: 'The background color of elements suggested by magic AI, with a secondary level of prominence.'
  },
  'color-bg-fill-magic-secondary-hover': {
    value: purple[6],
    description: 'The hover state color of elements suggested by magic AI, with a secondary level of prominence.'
  },
  'color-bg-fill-magic-secondary-active': {
    value: purple[7],
    description: 'The active state (on press) color of elements suggested by magic AI, with a secondary level of prominence.'
  },
  'color-bg-fill-inverse': {
    value: gray[15],
    description: 'The background color of elements with a smaller surface area on an inverse background.'
  },
  'color-bg-fill-inverse-hover': {
    value: gray[14],
    description: 'The hover state color of elements with a smaller surface area on an inverse background.'
  },
  'color-bg-fill-inverse-active': {
    value: gray[13],
    description: 'The active state (on press) color of elements with a smaller surface area on an inverse background.'
  },
  'color-bg-fill-transparent': {
    value: blackAlpha[3],
    description: 'The background color of elements that need to sit on different background colors, like tabs.'
  },
  'color-bg-fill-transparent-hover': {
    value: blackAlpha[5],
    description: 'The hover state color of elements that need to sit on different background colors, like tabs.'
  },
  'color-bg-fill-transparent-active': {
    value: blackAlpha[7],
    description: 'The active state (on press) color of elements that need to sit on different background colors, like tabs.'
  },
  'color-bg-fill-transparent-selected': {
    value: blackAlpha[7],
    description: 'The selected state color of elements that need to sit on different background colors, like tabs.'
  },
  'color-bg-fill-transparent-secondary': {
    value: blackAlpha[6],
    description: 'The background color of elements that need to sit on different background colors, with a secondary level of prominence.'
  },
  'color-bg-fill-transparent-secondary-hover': {
    value: blackAlpha[7],
    description: 'The hover state color of elements that need to sit on different background colors, with a secondary level of prominence.'
  },
  'color-bg-fill-transparent-secondary-active': {
    value: blackAlpha[8],
    description: 'The active state (on press) color of elements that need to sit on different background colors, with a secondary level of prominence.'
  },
  'color-text': {
    value: gray[15],
    description: 'The default text color.'
  },
  'color-text-secondary': {
    value: gray[13],
    description: 'Use for text with a secondary level of prominence.'
  },
  'color-text-disabled': {
    value: gray[11],
    description: 'Use for text in a disabled state.'
  },
  'color-text-link': {
    value: blue[13],
    description: 'Use for text links.'
  },
  'color-text-link-hover': {
    value: blue[14],
    description: 'The hover state color for text links.'
  },
  'color-text-link-active': {
    value: blue[15],
    description: 'The active state (on press) color for text links.'
  },
  'color-text-brand': {
    value: gray[14],
    description: 'Use for text that needs to pull attention.'
  },
  'color-text-brand-hover': {
    value: gray[15],
    description: 'The hover state color for text that needs to pull attention.'
  },
  'color-text-brand-on-bg-fill': {
    value: gray[1],
    description: 'Use for text on bg-fill-brand, like primary buttons.'
  },
  'color-text-brand-on-bg-fill-hover': {
    value: gray[8],
    description: 'The hover state color for text on bg-fill-brand-hover.'
  },
  'color-text-brand-on-bg-fill-active': {
    value: gray[10],
    description: 'The active state (on press) color for text on bg-fill-brand.'
  },
  'color-text-brand-on-bg-fill-disabled': {
    value: gray[1],
    description: 'The disabled state color for text on bg-fill-brand-disabled.'
  },
  'color-text-info': {
    value: azure[15],
    description: 'Use for text communicating important information.'
  },
  'color-text-info-hover': {
    value: azure[15],
    description: 'The hover state color for text communicating important information.'
  },
  'color-text-info-active': {
    value: azure[16],
    description: 'The active state (on press) color for text communicating important information.'
  },
  'color-text-info-secondary': {
    value: azure[12],
    description: 'Use for text communicating important information with a secondary level of prominence.'
  },
  'color-text-info-on-bg-fill': {
    value: azure[16],
    description: 'Use for text and icons on bg-fill-info.'
  },
  'color-text-success': {
    value: green[14],
    description: 'Use for text communicating success.'
  },
  'color-text-success-hover': {
    value: green[15],
    description: 'The hover state color for text communicating success.'
  },
  'color-text-success-active': {
    value: green[16],
    description: 'The active state (on press) color for text communicating success.'
  },
  'color-text-success-secondary': {
    value: green[12],
    description: 'Use for text communicating success with a secondary level of prominence.'
  },
  'color-text-success-on-bg-fill': {
    value: green[1],
    description: 'Use for text and icons on bg-fill-success.'
  },
  'color-text-caution': {
    value: yellow[14],
    description: 'Use for text communicating caution.'
  },
  'color-text-caution-hover': {
    value: yellow[15],
    description: 'The hover state color for text communicating caution.'
  },
  'color-text-caution-active': {
    value: yellow[16],
    description: 'The active state (on press) color for text communicating caution.'
  },
  'color-text-caution-secondary': {
    value: yellow[12],
    description: 'Use for text communicating caution with a secondary level of prominence.'
  },
  'color-text-caution-on-bg-fill': {
    value: yellow[15],
    description: 'Use for text and icons on bg-fill-caution.'
  },
  'color-text-warning': {
    value: orange[14],
    description: 'Use for text communicating warning.'
  },
  'color-text-warning-hover': {
    value: orange[15],
    description: 'The hover state color for text communicating warning.'
  },
  'color-text-warning-active': {
    value: orange[16],
    description: 'The active state (on press) color for text communicating warning.'
  },
  'color-text-warning-secondary': {
    value: orange[12],
    description: 'Use for text communicating warning with a secondary level of prominence.'
  },
  'color-text-warning-on-bg-fill': {
    value: orange[16],
    description: 'Use for text and icons on bg-fill-warning.'
  },
  'color-text-critical': {
    value: red[14],
    description: 'Use for text communicating critical information.'
  },
  'color-text-critical-hover': {
    value: red[15],
    description: 'The hover state color for text communicating critical information.'
  },
  'color-text-critical-active': {
    value: red[16],
    description: 'The active state (on press) color for text communicating critical information.'
  },
  'color-text-critical-secondary': {
    value: red[12],
    description: 'Use for text communicating critical information with a secondary level of prominence.'
  },
  'color-text-critical-on-bg-fill': {
    value: red[1],
    description: 'Use for text and icons on bg-fill-critical.'
  },
  'color-text-emphasis': {
    value: blue[13],
    description: 'Use for text indicating areas of focus in editors, like the theme editor.'
  },
  'color-text-emphasis-hover': {
    value: blue[14],
    description: 'The hover state color for text indicating areas of focus.'
  },
  'color-text-emphasis-active': {
    value: blue[15],
    description: 'The active state (on press) color for text indicating areas of focus.'
  },
  'color-text-emphasis-on-bg-fill': {
    value: blue[1],
    description: 'Use for text and icons on bg-fill-emphasis.'
  },
  'color-text-emphasis-on-bg-fill-hover': {
    value: blue[5],
    description: 'Use for text and icons on bg-fill-emphasis-hover.'
  },
  'color-text-emphasis-on-bg-fill-active': {
    value: blue[7],
    description: 'Use for text and icons on bg-fill-emphasis-active.'
  },
  'color-text-magic': {
    value: purple[14],
    description: 'Use for text suggested by magic AI.'
  },
  'color-text-magic-secondary': {
    value: purple[13],
    description: 'Use for text suggested by magic AI with a secondary level of prominence.'
  },
  'color-text-magic-on-bg-fill': {
    value: purple[1],
    description: 'Use for text and icons on bg-fill-magic.'
  },
  'color-text-inverse': {
    value: gray[8],
    description: 'Use for text on an inverse background.'
  },
  'color-text-inverse-secondary': {
    value: gray[11],
    description: 'Use for secondary text on an inverse background.'
  },
  'color-text-link-inverse': {
    value: blue[8],
    description: 'Use for text links on an inverse background.'
  },
  'color-border': {
    value: gray[8],
    description: 'The default color for borders on any element.'
  },
  'color-border-hover': {
    value: gray[10],
    description: 'The hover color for borders on any element.'
  },
  'color-border-disabled': {
    value: gray[7],
    description: 'The disabled color for borders on any element.'
  },
  'color-border-secondary': {
    value: gray[7],
    description: 'The color for hr elements or any visual dividers.'
  },
  'color-border-tertiary': {
    value: gray[10],
    description: 'The border color on any element. Pair with bg-surface-tertiary or bg-fill-tertiary.'
  },
  'color-border-focus': {
    value: blue[13],
    description: 'The focus ring for any interactive element in a focused state.'
  },
  'color-border-brand': {
    value: gray[8],
    description: 'Use for borders paired with brand colors.'
  },
  'color-border-info': {
    value: azure[8],
    description: 'Use for borders communicating information.'
  },
  'color-border-success': {
    value: green[5],
    description: 'Use for borders communicating success.'
  },
  'color-border-caution': {
    value: yellow[5],
    description: 'Use for borders communicating caution.'
  },
  'color-border-warning': {
    value: orange[8],
    description: 'Use for borders communicating warning.'
  },
  'color-border-critical': {
    value: red[8],
    description: 'Use for borders communicating critical information.'
  },
  'color-border-critical-secondary': {
    value: red[14],
    description: 'Use for borders communicating critical information, such as borders on invalid text fields.'
  },
  'color-border-emphasis': {
    value: blue[13],
    description: 'Use for borders indicating areas of focus.'
  },
  'color-border-emphasis-hover': {
    value: blue[14],
    description: 'The hover state color for borders indicating areas of focus.'
  },
  'color-border-emphasis-active': {
    value: blue[15],
    description: 'The active state (on press) color for borders indicating areas of focus.'
  },
  'color-border-magic': {
    value: purple[6],
    description: 'Use for borders suggested by magic AI.'
  },
  'color-border-magic-secondary': {
    value: purple[11],
    description: 'Use for borders suggested by magic AI, such as borders on text fields.'
  },
  'color-border-magic-secondary-hover': {
    value: purple[12],
    description: 'Use for borders suggested by magic AI, such as borders on text fields.'
  },
  'color-border-inverse': {
    value: gray[13],
    description: 'Use for borders on an inverse background, such as borders on the global search.'
  },
  'color-border-inverse-hover': {
    value: gray[10],
    description: 'The hover state color for borders on an inverse background.'
  },
  'color-border-inverse-active': {
    value: gray[8],
    description: 'The active state (on press) color for borders on an inverse background.'
  },
  'color-tooltip-tail-down-border': {
    value: gray[9],
    description: 'The border color for tooltip tails pointing down.'
  },
  'color-tooltip-tail-up-border': {
    value: gray[8],
    description: 'The border color for tooltip tails pointing up.'
  },
  'color-icon': {
    value: gray[14],
    description: 'The default color for icons.'
  },
  'color-icon-hover': {
    value: gray[15],
    description: 'The hover state color for icons.'
  },
  'color-icon-active': {
    value: gray[16],
    description: 'The active state (on press) color for icons.'
  },
  'color-icon-disabled': {
    value: gray[10],
    description: 'The disabled state color for icons.'
  },
  'color-icon-secondary': {
    value: gray[12],
    description: 'Use for secondary icons.'
  },
  'color-icon-secondary-hover': {
    value: gray[13],
    description: 'The hover state color for secondary icons.'
  },
  'color-icon-secondary-active': {
    value: gray[14],
    description: 'The active state (on press) color for secondary icons.'
  },
  'color-icon-brand': {
    value: gray[16],
    description: 'Use for icons that need to pull more focus.'
  },
  'color-icon-info': {
    value: azure[11],
    description: 'Use for icons communicating information.'
  },
  'color-icon-success': {
    value: green[12],
    description: 'Use for icons communicating success.'
  },
  'color-icon-caution': {
    value: yellow[11],
    description: 'Use for icons communicating caution.'
  },
  'color-icon-warning': {
    value: orange[11],
    description: 'Use for icons communicating warning.'
  },
  'color-icon-critical': {
    value: red[11],
    description: 'Use for icons communicating critical information.'
  },
  'color-icon-emphasis': {
    value: blue[13],
    description: 'Use for icons indicating areas of focus in editors, like the theme editor.'
  },
  'color-icon-emphasis-hover': {
    value: blue[14],
    description: 'The hover color for icons indicating areas of focus in editors.'
  },
  'color-icon-emphasis-active': {
    value: blue[15],
    description: 'The active state (on press) color for icons indicating areas of focus in editors.'
  },
  'color-icon-magic': {
    value: purple[12],
    description: 'Use for icons suggested by magic AI.'
  },
  'color-icon-inverse': {
    value: gray[8],
    description: 'Use for icons on an inverse background.'
  },
  'color-avatar-bg-fill': {
    value: gray[11]
  },
  'color-avatar-five-bg-fill': {
    value: rose[11]
  },
  'color-avatar-five-text-on-bg-fill': {
    value: rose[2]
  },
  'color-avatar-four-bg-fill': {
    value: azure[10]
  },
  'color-avatar-four-text-on-bg-fill': {
    value: azure[16]
  },
  'color-avatar-one-bg-fill': {
    value: magenta[12]
  },
  'color-avatar-one-text-on-bg-fill': {
    value: magenta[3]
  },
  'color-avatar-seven-bg-fill': {
    value: purple[11]
  },
  'color-avatar-seven-text-on-bg-fill': {
    value: purple[2]
  },
  'color-avatar-six-bg-fill': {
    value: lime[9]
  },
  'color-avatar-six-text-on-bg-fill': {
    value: lime[15]
  },
  'color-avatar-text-on-bg-fill': {
    value: gray[1]
  },
  'color-avatar-three-bg-fill': {
    value: teal[9]
  },
  'color-avatar-three-text-on-bg-fill': {
    value: teal[15]
  },
  'color-avatar-two-bg-fill': {
    value: green[7]
  },
  'color-avatar-two-text-on-bg-fill': {
    value: green[14]
  },
  'color-backdrop-bg': {
    value: blackAlpha[14]
  },
  'color-button-gradient-bg-fill': {
    value: 'linear-gradient(180deg, rgba(48, 48, 48, 0) 63.53%, rgba(255, 255, 255, 0.15) 100%)'
  },
  'color-checkbox-bg-surface-disabled': {
    value: blackAlpha[7]
  },
  'color-checkbox-icon-disabled': {
    value: gray[1]
  },
  'color-input-bg-surface': {
    value: gray[2]
  },
  'color-input-bg-surface-hover': {
    value: gray[3]
  },
  'color-input-bg-surface-active': {
    value: gray[4]
  },
  'color-input-border': {
    value: gray[12]
  },
  'color-input-border-hover': {
    value: gray[13]
  },
  'color-input-border-active': {
    value: gray[16]
  },
  'color-nav-bg': {
    value: gray[7]
  },
  'color-nav-bg-surface': {
    value: blackAlpha[3]
  },
  'color-nav-bg-surface-hover': {
    value: gray[6]
  },
  'color-nav-bg-surface-active': {
    value: gray[3]
  },
  'color-nav-bg-surface-selected': {
    value: gray[3]
  },
  'color-radio-button-bg-surface-disabled': {
    value: blackAlpha[7]
  },
  'color-radio-button-icon-disabled': {
    value: gray[1]
  },
  'color-video-thumbnail-play-button-bg-fill-hover': {
    value: blackAlpha[15]
  },
  'color-video-thumbnail-play-button-bg-fill': {
    value: blackAlpha[14]
  },
  'color-video-thumbnail-play-button-text-on-bg-fill': {
    value: gray[1]
  },
  'color-scrollbar-thumb-bg-hover': {
    value: gray[12]
  },
  'color-scrollbar-thumb-bg': {
    value: gray[11]
  }
};

export { color };
