export const mockResizeObserver = () => {
  const resizeObserver = vi.fn();

  resizeObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  });

  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    value: resizeObserver,
  });
};
