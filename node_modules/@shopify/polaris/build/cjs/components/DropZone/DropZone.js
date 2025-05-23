'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var debounce = require('../../utilities/debounce.js');
var css = require('../../utilities/css.js');
var capitalize = require('../../utilities/capitalize.js');
var target = require('../../utilities/target.js');
var useComponentDidMount = require('../../utilities/use-component-did-mount.js');
var useToggle = require('../../utilities/use-toggle.js');
var useEventListener = require('../../utilities/use-event-listener.js');
var context = require('./context.js');
var index = require('./utils/index.js');
var DropZone_module = require('./DropZone.css.js');
var FileUpload = require('./components/FileUpload/FileUpload.js');
var hooks = require('../../utilities/i18n/hooks.js');
var BlockStack = require('../BlockStack/BlockStack.js');
var Icon = require('../Icon/Icon.js');
var Text = require('../Text/Text.js');
var Labelled = require('../Labelled/Labelled.js');

// TypeScript can't generate types that correctly infer the typing of
// subcomponents so explicitly state the subcomponents in the type definition.
// Letting this be implicit works in this project but fails in projects that use
// generated *.d.ts files.

const DropZone = function DropZone({
  dropOnPage,
  label,
  labelAction,
  labelHidden,
  children,
  disabled = false,
  outline = true,
  accept,
  active,
  overlay = true,
  allowMultiple = index.defaultAllowMultiple,
  overlayText,
  errorOverlayText,
  id: idProp,
  type = 'file',
  onClick,
  error,
  openFileDialog,
  variableHeight,
  onFileDialogClose,
  customValidator,
  onDrop,
  onDropAccepted,
  onDropRejected,
  onDragEnter,
  onDragOver,
  onDragLeave
}) {
  const node = React.useRef(null);
  const inputRef = React.useRef(null);
  const dragTargets = React.useRef([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const adjustSize = React.useCallback(debounce.debounce(() => {
    if (!node.current) {
      return;
    }
    if (variableHeight) {
      setMeasuring(false);
      return;
    }
    let size = 'large';
    const width = node.current.getBoundingClientRect().width;
    if (width < 100) {
      size = 'small';
    } else if (width < 160) {
      size = 'medium';
    }
    setSize(size);
    measuring && setMeasuring(false);
  }, 50, {
    trailing: true
  }), []);
  const [dragging, setDragging] = React.useState(false);
  const [internalError, setInternalError] = React.useState(false);
  const {
    value: focused,
    setTrue: handleFocus,
    setFalse: handleBlur
  } = useToggle.useToggle(false);
  const [size, setSize] = React.useState('large');
  const [measuring, setMeasuring] = React.useState(true);
  const i18n = hooks.useI18n();
  const getValidatedFiles = React.useCallback(files => {
    const acceptedFiles = [];
    const rejectedFiles = [];
    Array.from(files).forEach(file => {
      !index.fileAccepted(file, accept) || customValidator && !customValidator(file) ? rejectedFiles.push(file) : acceptedFiles.push(file);
    });
    if (!allowMultiple) {
      acceptedFiles.splice(1, acceptedFiles.length);
      rejectedFiles.push(...acceptedFiles.slice(1));
    }
    return {
      files,
      acceptedFiles,
      rejectedFiles
    };
  }, [accept, allowMultiple, customValidator]);
  const handleDrop = React.useCallback(event => {
    stopEvent(event);
    if (disabled) return;
    const fileList = index.getDataTransferFiles(event);
    const {
      files,
      acceptedFiles,
      rejectedFiles
    } = getValidatedFiles(fileList);
    dragTargets.current = [];
    setDragging(false);
    setInternalError(rejectedFiles.length > 0);
    onDrop && onDrop(files, acceptedFiles, rejectedFiles);
    onDropAccepted && acceptedFiles.length && onDropAccepted(acceptedFiles);
    onDropRejected && rejectedFiles.length && onDropRejected(rejectedFiles);
    if (!(event.target && 'value' in event.target)) return;
    event.target.value = '';
  }, [disabled, getValidatedFiles, onDrop, onDropAccepted, onDropRejected]);
  const handleDragEnter = React.useCallback(event => {
    stopEvent(event);
    if (disabled) return;
    const fileList = index.getDataTransferFiles(event);
    if (event.target && !dragTargets.current.includes(event.target)) {
      dragTargets.current.push(event.target);
    }
    if (dragging) return;
    const {
      rejectedFiles
    } = getValidatedFiles(fileList);
    setDragging(true);
    setInternalError(rejectedFiles.length > 0);
    onDragEnter && onDragEnter();
  }, [disabled, dragging, getValidatedFiles, onDragEnter]);
  const handleDragOver = React.useCallback(event => {
    stopEvent(event);
    if (disabled) return;
    onDragOver && onDragOver();
  }, [disabled, onDragOver]);
  const document = target.isServer ? null : node.current?.ownerDocument || globalThis.document;
  const handleDragLeave = React.useCallback(event => {
    event.preventDefault();
    if (disabled) return;
    dragTargets.current = dragTargets.current.filter(el => {
      const compareNode = dropOnPage && !target.isServer ? document : node.current;
      return el !== event.target && compareNode && compareNode.contains(el);
    });
    if (dragTargets.current.length > 0) return;
    setDragging(false);
    setInternalError(false);
    onDragLeave && onDragLeave();
  }, [disabled, onDragLeave, dropOnPage, document]);
  const dropNode = dropOnPage && !target.isServer ? document : node.current;
  useEventListener.useEventListener('drop', handleDrop, dropNode);
  useEventListener.useEventListener('dragover', handleDragOver, dropNode);
  useEventListener.useEventListener('dragenter', handleDragEnter, dropNode);
  useEventListener.useEventListener('dragleave', handleDragLeave, dropNode);
  useComponentDidMount.useComponentDidMount(() => {
    adjustSize();
  });
  React.useEffect(() => {
    if (!node.current) {
      return;
    }
    const observer = new ResizeObserver(adjustSize);
    observer.observe(node.current);
    return () => {
      observer.disconnect();
    };
  }, [adjustSize]);
  const uniqId = React.useId();
  const id = idProp ?? uniqId;
  const typeSuffix = capitalize.capitalize(type);
  const allowMultipleKey = index.createAllowMultipleKey(allowMultiple);
  const overlayTextWithDefault = overlayText === undefined ? i18n.translate(`Polaris.DropZone.${allowMultipleKey}.overlayText${typeSuffix}`) : overlayText;
  const errorOverlayTextWithDefault = errorOverlayText === undefined ? i18n.translate(`Polaris.DropZone.errorOverlayText${typeSuffix}`) : errorOverlayText;
  const labelValue = label || i18n.translate(`Polaris.DropZone.${allowMultipleKey}.label${typeSuffix}`);
  const labelHiddenValue = label ? labelHidden : true;
  const classes = css.classNames(DropZone_module.default.DropZone, outline && DropZone_module.default.hasOutline, !outline && DropZone_module.default.noOutline, focused && DropZone_module.default.focused, (active || dragging) && DropZone_module.default.isDragging, disabled && DropZone_module.default.isDisabled, (internalError || error) && DropZone_module.default.hasError, !variableHeight && DropZone_module.default[css.variationName('size', size)], measuring && DropZone_module.default.measuring);
  const dragOverlay = (active || dragging) && !internalError && !error && overlay && overlayMarkup(polarisIcons.UploadIcon, overlayTextWithDefault);
  const dragErrorOverlay = dragging && (internalError || error) && overlayMarkup(polarisIcons.AlertCircleIcon, errorOverlayTextWithDefault, 'critical');
  const context$1 = React.useMemo(() => ({
    disabled,
    focused,
    size,
    type: type || 'file',
    measuring,
    allowMultiple
  }), [disabled, focused, measuring, size, type, allowMultiple]);
  const open = React.useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.click();
  }, [inputRef]);
  const triggerFileDialog = React.useCallback(() => {
    open();
    onFileDialogClose?.();
  }, [open, onFileDialogClose]);
  function overlayMarkup(icon, text, color) {
    return /*#__PURE__*/React.createElement("div", {
      className: DropZone_module.default.Overlay
    }, /*#__PURE__*/React.createElement(BlockStack.BlockStack, {
      gap: "200",
      inlineAlign: "center"
    }, size === 'small' && /*#__PURE__*/React.createElement(Icon.Icon, {
      source: icon,
      tone: color
    }), (size === 'medium' || size === 'large') && /*#__PURE__*/React.createElement(Text.Text, {
      variant: "bodySm",
      as: "p",
      fontWeight: "bold"
    }, text)));
  }
  function handleClick(event) {
    if (disabled) return;
    return onClick ? onClick(event) : open();
  }
  React.useEffect(() => {
    if (openFileDialog) triggerFileDialog();
  }, [openFileDialog, triggerFileDialog]);
  return /*#__PURE__*/React.createElement(context.DropZoneContext.Provider, {
    value: context$1
  }, /*#__PURE__*/React.createElement(Labelled.Labelled, {
    id: id,
    label: labelValue,
    action: labelAction,
    labelHidden: labelHiddenValue
  }, /*#__PURE__*/React.createElement("div", {
    ref: node,
    className: classes,
    "aria-disabled": disabled,
    onClick: handleClick,
    onDragStart: stopEvent
  }, dragOverlay, dragErrorOverlay, /*#__PURE__*/React.createElement(Text.Text, {
    variant: "bodySm",
    as: "span",
    visuallyHidden: true
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    accept: accept,
    disabled: disabled,
    multiple: allowMultiple,
    onChange: handleDrop,
    onFocus: handleFocus,
    onBlur: handleBlur,
    type: "file",
    ref: inputRef,
    autoComplete: "off"
  })), /*#__PURE__*/React.createElement("div", {
    className: DropZone_module.default.Container
  }, children))));
};
function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}
DropZone.FileUpload = FileUpload.FileUpload;

exports.DropZone = DropZone;
