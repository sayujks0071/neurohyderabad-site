    // Extract text from response
    let text: string | undefined;

    const responseText = (result as { text?: unknown }).text;

    if (typeof responseText === 'function') {
      text = (responseText as () => string)();
    } else if (typeof responseText === 'string') {
      text = responseText;
    } else if ('output' in result && Array.isArray(result.output)) {
      text =
        result.output
          .flatMap((it: any) => it?.content ?? [])
          .map((it: any) => it?.text)
          .find((segment: unknown): segment is string => typeof segment === 'string') ??
        undefined;
    }

    if (!text || !text.trim()) {
      throw new Error('Empty response from Gemini API');
    }