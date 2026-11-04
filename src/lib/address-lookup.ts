import { useCallback, useEffect, useRef, useState } from "react";

/** One address at a postcode, as GET /api/address/:postcode returns it. */
export interface LookupAddress {
  id: string;
  label: string;
  houseNumber: string;
  houseName: string;
  apartment: string;
  street: string;
  dependantStreet: string;
  postTown: string;
  postcode: string;
}

export type LookupErrorKind =
  | "invalid"
  | "not-found"
  | "rate-limited"
  | "unavailable"
  | "timeout"
  | "network";

export type LookupState =
  | { status: "idle" }
  | { status: "loading"; postcode: string }
  | { status: "success"; postcode: string; addresses: LookupAddress[] }
  | { status: "error"; postcode: string; kind: LookupErrorKind; message: string; retryable: boolean };

/** Visitor-facing copy per failure — each one says what to do next. */
const MESSAGES: Record<LookupErrorKind, string> = {
  invalid: "Please enter a full UK postcode, for example RG21 4HN.",
  "not-found":
    "We couldn't find that postcode. Check it's correct, or carry on and enter your address on the next step.",
  "rate-limited":
    "You've made a lot of searches in a short time. Please wait a minute and try again, or enter your address on the next step.",
  unavailable:
    "Address search isn't available right now. Please carry on and enter your address on the next step.",
  timeout: "The address search is taking longer than usual. Please try again.",
  network: "We couldn't reach the address search. Check your connection and try again.",
};

const RETRYABLE: Record<LookupErrorKind, boolean> = {
  invalid: false,
  "not-found": false,
  "rate-limited": true,
  unavailable: true,
  timeout: true,
  network: true,
};

/** Generous enough for the API's own 8s upstream timeout plus a cold start. */
const CLIENT_TIMEOUT_MS = 12_000;

class LookupError extends Error {
  constructor(readonly kind: LookupErrorKind) {
    super(kind);
  }
}

function errorKindFor(status: number): LookupErrorKind {
  if (status === 400) return "invalid";
  if (status === 404) return "not-found";
  if (status === 429) return "rate-limited";
  if (status === 504) return "timeout";
  return "unavailable";
}

/** Results for postcodes already looked up on this page — revisiting a step costs nothing. */
const cache = new Map<string, LookupAddress[]>();

const cacheKey = (postcode: string) => postcode.toUpperCase().replace(/\s+/g, "");

async function fetchAddresses(postcode: string, signal: AbortSignal): Promise<LookupAddress[]> {
  const key = cacheKey(postcode);
  const hit = cache.get(key);
  if (hit) return hit;

  const res = await fetch(
    `${import.meta.env.PUBLIC_SERVER_URL}api/address/${encodeURIComponent(key)}`,
    { signal, headers: { Accept: "application/json" } },
  );
  if (!res.ok) throw new LookupError(errorKindFor(res.status));

  const body = (await res.json()) as { data?: { addresses?: LookupAddress[] } };
  const addresses = body.data?.addresses ?? [];
  if (addresses.length === 0) throw new LookupError("not-found");

  cache.set(key, addresses);
  return addresses;
}

/**
 * Postcode → address lookup with loading and error state.
 *
 * A new search cancels any in-flight one, so a slow earlier response can never
 * overwrite a newer result; requests are also cancelled on unmount.
 */
export function useAddressLookup() {
  const [state, setState] = useState<LookupState>({ status: "idle" });
  const controller = useRef<AbortController | null>(null);

  useEffect(() => () => controller.current?.abort(), []);

  const lookup = useCallback(async (postcode: string) => {
    controller.current?.abort();
    const current = new AbortController();
    controller.current = current;

    const timer = setTimeout(() => current.abort("timeout"), CLIENT_TIMEOUT_MS);
    setState({ status: "loading", postcode });

    try {
      const addresses = await fetchAddresses(postcode, current.signal);
      if (controller.current !== current) return;
      setState({ status: "success", postcode, addresses });
    } catch (error) {
      // Superseded by a newer search, or the form closed: nothing to report.
      if (controller.current !== current) return;
      if (current.signal.aborted && current.signal.reason !== "timeout") return;

      const kind: LookupErrorKind =
        error instanceof LookupError
          ? error.kind
          : current.signal.reason === "timeout"
            ? "timeout"
            : "network";
      setState({ status: "error", postcode, kind, message: MESSAGES[kind], retryable: RETRYABLE[kind] });
    } finally {
      clearTimeout(timer);
    }
  }, []);

  const reset = useCallback(() => {
    controller.current?.abort();
    controller.current = null;
    setState({ status: "idle" });
  }, []);

  return { state, lookup, reset };
}
