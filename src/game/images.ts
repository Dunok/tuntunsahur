/** Evolution stage artwork (5 stages for 20 levels). */
const STAGE_URLS: Record<number, string> = {
  1: 'https://image.qwenlm.ai/generated-images/354236b3-3c5f-4a85-aa88-45712fd59fd0/_result.png',
  2: 'https://image.qwenlm.ai/generated-images/143b9ee6-d817-484a-b38d-b01d59e28a74/_result.png',
  3: 'https://image.qwenlm.ai/generated-images/88f8fdc5-2c70-434c-8770-525569d6ac89/_result.png',
  4: 'https://image.qwenlm.ai/generated-images/36c05df3-aaa5-4ff6-b6ae-468ea4a4c4f6/_result.png',
  5: 'https://image.qwenlm.ai/generated-images/acca5d8b-721f-4e2f-92a0-3ffcbcfd2b6f/_result.png',
};

export function stageImage(stage: number): string {
  return STAGE_URLS[stage] ?? STAGE_URLS[1];
}

export function preloadStages(): Promise<void[]> {
  return Promise.all(
    Object.values(STAGE_URLS).map(
      (url) =>
        new Promise<void>((res) => {
          const img = new Image();
          img.onload = () => res();
          img.onerror = () => res();
          img.src = url;
        }),
    ),
  );
}
