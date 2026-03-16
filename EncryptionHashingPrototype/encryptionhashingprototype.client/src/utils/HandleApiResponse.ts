import type { HttpResponse } from "../api/http-client";
import type { ToastOptions } from "../api/methods/Types";
import { globalToastRef } from "../components/toast-manager/toast-context";
import type { ApiResult } from "../interfaces/responses/ApiResult";

export async function handleApiResponse<T>(
  call: () => Promise<HttpResponse<T, any>>,
  toastOptions: ToastOptions | undefined,
): Promise<ApiResult<T>> {
  let response: HttpResponse<T, any> | undefined;

  try {
    response = await call();

    const isOk = response.ok;
    const toastSuccess = toastOptions?.toastSuccess;
    const toastError = toastOptions?.toastError;

    if (isOk && toastSuccess && globalToastRef.current) {
      globalToastRef.current.showToastSuccess(
        toastSuccess.message,
        toastSuccess.title,
      );
    } else if (!isOk) {
      if (toastError && globalToastRef.current) {
        globalToastRef.current.showToastError(
          toastError.message,
          toastError.title,
        );
      } else {
        globalToastRef.current?.showToastErrorResponse(response);
      }
    }

    let data: T | undefined;
    try {
      const textData = await response.text();
      data = JSON.parse(textData) as T;
    } catch {
      data = undefined;
    }

    if (isOk) {
      return { ok: true, status: response.status, response: data as T };
    } else {
      return {
        ok: false,
        status: response.status,
        response: data,
        error: null,
      };
    }
  } catch (error) {
    globalToastRef.current?.showToastErrorResponse(error as any);
    return {
      ok: false,
      status: response?.status ?? 0,
      response: undefined,
      error,
    };
  }
}
