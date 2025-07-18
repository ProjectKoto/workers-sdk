import type { Config } from "../config";

export function getScriptName(
	args: { name: string | undefined; env: string | undefined },
	config: Config
): string | undefined {
	return args.name ?? config.name;
}

export function getScriptNameForDelete(
	args: { name: string | undefined; script?: string | undefined },
	config: Config
): string | undefined {
	// If --name is provided, use that
	if (args.name) {
		return args.name;
	}

	// If name is in config, use that
	if (config.name) {
		return config.name;
	}

	// If no main entry point is configured and a positional argument (script) is provided,
	// treat it as the worker name
	if (!config.main && args.script) {
		return args.script;
	}

	return undefined;
}
