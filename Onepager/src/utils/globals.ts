declare global {
  interface ImportMetaEnv {
	readonly DEV: boolean;
  }

  interface ImportMeta {
	readonly env: ImportMetaEnv;
  }
}

export const isDev = import.meta.env.DEV;