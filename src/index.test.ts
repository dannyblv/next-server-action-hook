import { renderHook, act } from '@testing-library/react-hooks';
import useServerAction from './';

describe('useServerAction', () => {
  it('handles successful server action (Happy path)', async () => {
    const mockAction = jest.fn().mockResolvedValue('mockData');
    const { result, waitForNextUpdate } = renderHook(() => useServerAction(mockAction));

    await act(async () => {
      result.current[0]();
      await waitForNextUpdate();
    });

    expect(result.current[1].isLoading).toBe(false);
    expect(mockAction).toHaveBeenCalled();
    expect(result.current[1].data).toBe('mockData');
    expect(result.current[1].hasError).toBeFalsy();
  });

  it('handles server action error', async () => {
    const mockError = new Error('Mock Error');
    const mockAction = jest.fn().mockRejectedValue(mockError);
    const { result, waitForNextUpdate } = renderHook(() => useServerAction(mockAction));

    await act(async () => {
      result.current[0]();
      await waitForNextUpdate();
    });

    expect(result.current[1].isLoading).toBe(false);
    expect(mockAction).toHaveBeenCalled();
    expect(result.current[1].hasError).toBeTruthy();
    expect(result.current[1].data).toBeUndefined();
  });

  it('clears error', async () => {
    const mockError = new Error('Mock Error');
    const mockAction = jest.fn().mockRejectedValue(mockError);
    const { result, waitForNextUpdate } = renderHook(() => useServerAction(mockAction));

    await act(async () => {
      result.current[0]();
      await waitForNextUpdate();
    });

    expect(result.current[1].hasError).toBeTruthy();

    act(() => {
      result.current[2]();
    });

    expect(result.current[1].hasError).toBeFalsy();
  });
});
