import { useMemo } from 'react';
import debounce from 'lodash/debounce';

export const useDebounceSearch = (setSearchParams, delay = 300) => {
  return useMemo(
    () =>
      debounce((value) => {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          if (value) {
            newParams.set("search", value);
          } else {
            newParams.delete("search");
          }
          newParams.set("page", "0"); // Reset to first page on search
          return newParams;
        });
      }, delay),
    [setSearchParams]
  );
};