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
	// If positional script argument is provided, always return undefined
	// This will trigger the warning regardless of --name or config.name
	if (args.script) {
		return undefined;
	}

	// If --name is provided, use that
	if (args.name) {
		return args.name;
	}

	// If name is in config, use that
	if (config.name) {
		return config.name;
	}

	return undefined;
}
