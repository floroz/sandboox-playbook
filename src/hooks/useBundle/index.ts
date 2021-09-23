import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import { useESBuild } from "../useESBuild/useESBuild";

/**
 * Transpiles and Bundles a given snippet of code
 * @param content : code snippet ;
 * @returns
 */
export const useBundle = (content: string) => {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState("");
  const [isBundling, setIsBundling] = useState(false);

  const { build } = useESBuild();

  const bundle = useMemo(
    () =>
      debounce(async (code: string) => {
        setIsBundling(true);
        try {
          const output = await build(code);

          if (!output) {
            setCode("");
          } else {
            setCode(output.outputFiles[0].text);
          }

          setError("");
        } catch (error) {
          setCode("");
          setError((error as any).message as string);
        } finally {
          setIsBundling(false);
        }
      }, 1000),
    []
  );

  /**
   * Run bundler on content changes
   */
  useEffect(() => {
    bundle(content);
  }, [bundle, content]);

  return { code, error, isBundling };
};
