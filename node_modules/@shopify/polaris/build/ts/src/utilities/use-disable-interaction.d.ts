/// <reference types="react" />
/**
 * useDisableInteraction provides the original event handler but disables interaction
 * if the boolean passed is true.
 * @param disabled - A boolean value that determines if the button should
 * be disabled
 * @param handleEvent - The original event handler
 * @returns Function - The original event handler but with interactions disabled if the
 * provided boolean is true
 * @example
 * function ComponentExample() {
 * const handleClick = () => {
 *  console.log('disable me');
 * };
 * const handleClickEvent = useDisableInteraction(true, handleClick);
 * return <button onClick={handleClickEvent}>Im Disabled</button>;
 * }
 */
export declare function useDisableClick(disabled?: boolean, handleClick?: () => void): ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
export declare function useDisableKeyboard(disabled?: boolean, handleKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void): ((event: React.KeyboardEvent<HTMLButtonElement>) => void) | undefined;
//# sourceMappingURL=use-disable-interaction.d.ts.map