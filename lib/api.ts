/**
 * Shared API utilities: error responses, zod validation helpers.
 */

import { NextResponse } from "next/server";
import { ZodError } from "zod";

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export function errorResponse(
  code: string,
  message: string,
  status = 400,
  details?: unknown
): NextResponse {
  const body: { error: ApiError } = { error: { code, message } };
  if (details !== undefined) body.error.details = details;
  return NextResponse.json(body, { status });
}

export function zodErrorResponse(error: ZodError): NextResponse {
  return errorResponse("VALIDATION_ERROR", "Invalid request body", 400, error.issues);
}

export function notFound(resource = "Resource"): NextResponse {
  return errorResponse("NOT_FOUND", `${resource} not found`, 404);
}

export function serverError(e: unknown): NextResponse {
  console.error(e);
  const message =
    e instanceof Error ? e.message : "Internal server error";
  return errorResponse("INTERNAL_ERROR", message, 500);
}
