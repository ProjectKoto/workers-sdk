import { getScriptName, getScriptNameForDelete } from "../../utils/getScriptName";
import type { Config } from "../../config";

describe("getScriptName", () => {
	const mockConfig: Config = {
		name: "config-worker",
		main: "src/index.js",
	} as Config;

	it("should return name from args when provided", () => {
		const result = getScriptName({ name: "arg-worker", env: undefined }, mockConfig);
		expect(result).toBe("arg-worker");
	});

	it("should return name from config when args.name is undefined", () => {
		const result = getScriptName({ name: undefined, env: undefined }, mockConfig);
		expect(result).toBe("config-worker");
	});

	it("should return undefined when both args.name and config.name are undefined", () => {
		const result = getScriptName({ name: undefined, env: undefined }, {} as Config);
		expect(result).toBeUndefined();
	});
});

describe("getScriptNameForDelete", () => {
	it("should return name from args when provided", () => {
		const config = { name: "config-worker", main: "src/index.js" } as Config;
		const result = getScriptNameForDelete({ name: "arg-worker", script: "pos-worker" }, config);
		expect(result).toBe("arg-worker");
	});

	it("should return name from config when args.name is undefined", () => {
		const config = { name: "config-worker", main: "src/index.js" } as Config;
		const result = getScriptNameForDelete({ name: undefined, script: "pos-worker" }, config);
		expect(result).toBe("config-worker");
	});

	it("should return positional argument when no name and no main entry point", () => {
		const config = { name: undefined, main: undefined } as Config;
		const result = getScriptNameForDelete({ name: undefined, script: "pos-worker" }, config);
		expect(result).toBe("pos-worker");
	});

	it("should NOT return positional argument when main entry point exists", () => {
		const config = { name: undefined, main: "src/index.js" } as Config;
		const result = getScriptNameForDelete({ name: undefined, script: "pos-worker" }, config);
		expect(result).toBeUndefined();
	});

	it("should return undefined when no name, no script, and no config.name", () => {
		const config = { name: undefined, main: undefined } as Config;
		const result = getScriptNameForDelete({ name: undefined, script: undefined }, config);
		expect(result).toBeUndefined();
	});

	it("should prioritize --name over config.name", () => {
		const config = { name: "config-worker", main: undefined } as Config;
		const result = getScriptNameForDelete({ name: "arg-worker", script: "pos-worker" }, config);
		expect(result).toBe("arg-worker");
	});

	it("should prioritize config.name over positional argument", () => {
		const config = { name: "config-worker", main: undefined } as Config;
		const result = getScriptNameForDelete({ name: undefined, script: "pos-worker" }, config);
		expect(result).toBe("config-worker");
	});

	it("should prioritize --name over positional argument", () => {
		const config = { name: undefined, main: undefined } as Config;
		const result = getScriptNameForDelete({ name: "arg-worker", script: "pos-worker" }, config);
		expect(result).toBe("arg-worker");
	});

	it("should handle empty config object", () => {
		const config = {} as Config;
		const result = getScriptNameForDelete({ name: undefined, script: "pos-worker" }, config);
		expect(result).toBe("pos-worker");
	});

	it("should handle config with empty main string", () => {
		const config = { name: undefined, main: "" } as Config;
		const result = getScriptNameForDelete({ name: undefined, script: "pos-worker" }, config);
		expect(result).toBe("pos-worker");
	});
});