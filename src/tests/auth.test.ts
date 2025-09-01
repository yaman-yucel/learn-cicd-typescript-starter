import { describe, it, expect } from "vitest";
import { getAPIKey } from "../api/auth";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  it("returns null if authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null if authorization header is not prefixed with ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer sometoken",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns the API key when authorization header is valid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey my-secret-key",
    };
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });

  it("returns null if authorization header has no key after ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };
    expect(getAPIKey(headers)).toBeNull();
  });
});
