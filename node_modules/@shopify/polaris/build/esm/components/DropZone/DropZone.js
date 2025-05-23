import React, { useRef, useCallback, useState, useEffect, useId, useMemo } from 'react';
import { UploadIcon, AlertCircleIcon } from '@shopify/polaris-icons';
import { debounce } from '../../utilities/debounce.js';
import { classNames, variationName } from '../../utilities/css.js';
import { capitalize } from '../../utilities/capitalize.js';
import { isServer } from '../../utilities/target.js';
import { useComponentDidMount } from '../../utilities/use-component-did-mount.js';
import { useToggle } from '../../utilities/use-toggle.js';
import { useEventListener } from '../../utilities/use-event-listener.js';
import { DropZoneContext } from './context.js';
import { fileAccepted, getDataTransferFiles, defaultAllowMultiple, createAllowMultipleKey } from './utils/index.js';
import styles from './DropZone.css.js';
import { FileUpload } from './components/FileUpload/FileUpload.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { BlockStack } from '../BlockStack/BlockStack.js';
import { Icon } from '../Icon/Icon.js';
import { Text } from '../Text/Text.js';
import { Labelled } from '../Labelled/Labelled.js';

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
  allowMultiple = defaultAllowMultiple,
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
  const node = useRef(null);
  const inputRef = useRef(null);
  const dragTargets = useRef([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const adjustSize = useCallback(debounce(() => {
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
  const [dragging, setDragging] = useState(false);
  const [internalError, setInternalError] = useState(false);
  const {
    value: focused,
    setTrue: handleFocus,
    setFalse: handleBlur
  } = useToggle(false);
  const [size, setSize] = useState('large');
  const [measuring, setMeasuring] = useState(true);
  const i18n = useI18n();
  const getValidatedFiles = useCallback(files => {
    const acceptedFiles = [];
    const rejectedFiles = [];
    Array.from(files).forEach(file => {
      !fileAccepted(file, accept) || customValidator && !customValidator(file) ? rejectedFiles.push(file) : acceptedFiles.push(file);
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
  const handleDrop = useCallback(event => {
    stopEvent(event);
    if (disabled) return;
    const fileList = getDataTransferFiles(event);
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
  const handleDragEnter = useCallback(event => {
    stopEvent(event);
    if (disabled) return;
    const fileList = getDataTransferFiles(event);
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
  const handleDragOver = useCallback(event => {
    stopEvent(event);
    if (disabled) return;
    onDragOver && onDragOver();
  }, [disabled, onDragOver]);
  const document = isServer ? null : node.current?.ownerDocument || globalThis.document;
  const handleDragLeave = useCallback(event => {
    event.preventDefault();
    if (disabled) return;
    dragTargets.current = dragTargets.current.filter(el => {
      const compareNode = dropOnPage && !isServer ? document : node.current;
      return el !== event.target && compareNode && compareNode.contains(el);
    });
    if (dragTargets.current.length > 0) return;
    setDragging(false);
    setInternalError(false);
    onDragLeave && onDragLeave();
  }, [disabled, onDragLeave, dropOnPage, document]);
  const dropNode = dropOnPage && !isServer ? document : node.current;
  useEventListener('drop', handleDrop, dropNode);
  useEventListener('dragover', handleDragOver, dropNode);
  useEventListener('dragenter', handleDragEnter, dropNode);
  useEventListener('dragleave', handleDragLeave, dropNode);
  useComponentDidMount(() => {
    adjustSize();
  });
  useEffect(() => {
    if (!node.current) {
      return;
    }
    const observer = new ResizeObserver(adjustSize);
    observer.observe(node.current);
    return () => {
      observer.disconnect();
    };
  }, [adjustSize]);
  const uniqId = useId();
  const id = idProp ?? uniqId;
  const typeSuffix = capitalize(type);
  const allowMultipleKey = createAllowMultipleKey(allowMultiple);
  const overlayTextWithDefault = overlayText === undefined ? i18n.translate(`Polaris.DropZone.${allowMultipleKey}.overlayText${typeSuffix}`) : overlayText;
  const errorOverlayTextWithDefault = errorOverlayText === undefined ? i18n.translate(`Polaris.DropZone.errorOverlayText${typeSuffix}`) : errorOverlayText;
  const labelValue = label || i18n.translate(`Polaris.DropZone.${allowMultipleKey}.label${typeSuffix}`);
  const labelHiddenValue = label ? labelHidden : true;
  const classes = classNames(styles.DropZone, outline && styles.hasOutline, !outline && styles.noOutline, focused && styles.focused, (active || dragging) && styles.isDragging, disabled && styles.isDisabled, (internalError || error) && styles.hasError, !variableHeight && styles[variationName('size', size)], measuring && styles.measuring);
  const dragOverlay = (active || dragging) && !internalError && !error && overlay && overlayMarkup(UploadIcon, overlayTextWithDefault);
  const dragErrorOverlay = dragging && (internalError || error) && overlayMarkup(AlertCircleIcon, errorOverlayTextWithDefault, 'critical');
  const context = useMemo(() => ({
    disabled,
    focused,
    size,
    type: type || 'file',
    measuring,
    allowMultiple
  }), [disabled, focused, measuring, size, type, allowMultiple]);
  const open = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.click();
  }, [inputRef]);
  const triggerFileDialog = useCallback(() => {
    open();
    onFileDialogClose?.();
  }, [open, onFileDialogClose]);
  function overlayMarkup(icon, text, color) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.Overlay
    }, /*#__PURE__*/React.createElement(BlockStack, {
      gap: "200",
      inlineAlign: "center"
    }, size === 'small' && /*#__PURE__*/React.createElement(Icon, {
      source: icon,
      tone: color
    }), (size === 'medium' || size === 'large') && /*#__PURE__*/React.createElement(Text, {
      variant: "bodySm",
      as: "p",
      fontWeight: "bold"
    }, text)));
  }
  function handleClick(event) {
    if (disabled) return;
    return onClick ? onClick(event) : open();
  }
  useEffect(() => {
    if (openFileDialog) triggerFileDialog();
  }, [openFileDialog, triggerFileDialog]);
  return /*#__PURE__*/React.createElement(DropZoneContext.Provider, {
    value: context
  }, /*#__PURE__*/React.createElement(Labelled, {
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
  }, dragOverlay, dragErrorOverlay, /*#__PURE__*/React.createElement(Text, {
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
    className: styles.Container
  }, children))));
};
function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}
DropZone.FileUpload = FileUpload;

export { DropZone };
