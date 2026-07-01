import { fastDelegate } from "./fast.js";
import { instantDelegate } from "./instant.js";

export const delegates = {
	instant: instantDelegate,
	fast: fastDelegate,
};

export { fastDelegate, instantDelegate };
