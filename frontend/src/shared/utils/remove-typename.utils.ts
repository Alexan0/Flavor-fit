type RemoveTypename<T> =
  T extends Array<infer U>
    ? Array<RemoveTypename<U>>
    : T extends object
      ? { [K in Exclude<keyof T, "__typename">]: RemoveTypename<T[K]> }
      : T;

export function removeTypename<T>(obj: T): RemoveTypename<T> {
  if (Array.isArray(obj)) {
    return obj.map(removeTypename) as RemoveTypename<T>;
  }

  if (obj !== null && typeof obj === "object") {
    const entries = Object.entries(obj)
      .filter(([key]) => key !== "__typename")
      .map(([key, value]) => [key, removeTypename(value)] as const);

    return Object.fromEntries(entries) as RemoveTypename<T>;
  }

  return obj as RemoveTypename<T>;
}
