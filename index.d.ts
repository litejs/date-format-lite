import "./index.js";

declare global {
	interface Date {
		format: (mask: string, zone?: number) => Date;
	}
}

