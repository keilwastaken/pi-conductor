export type ConductorTier = "instant" | "fast" | "careful";

export type ExecutionTopology = "linear" | "orchestrated";
export type ExecutionGuard = "none" | "optional" | "recommended" | "required";

export type ExecutionProfile = {
	topology: ExecutionTopology;
	scout: ExecutionGuard;
	verification: Exclude<ExecutionGuard, "none">;
	review: boolean;
	maxWorkerVisits: number;
};

export type ConductorRoute = ConductorTier | "cockpit-only" | "need-decision";

export type RiskDomain = "auth" | "security" | "persistence" | "deployment" | "architecture" | "unknown";

export type ConductorConfig = {
	strictMode: boolean;
	agents: {
		instant: string[];
		fast: string[];
		careful: string;
	};
	models: {
		instant: string;
		fast: string;
		careful: string;
	};
	profiles: Record<ConductorTier, ExecutionProfile>;
	routing: {
		instant: {
			maxFiles: number;
			maxEstimatedLines: number;
			disallowDomains: RiskDomain[];
		};
		fast: {
			maxFiles: number;
			maxEstimatedLines: number;
			disallowDomains: RiskDomain[];
		};
		careful: {
			maxFiles: number;
			maxEstimatedLines: number;
			requirePlan: boolean;
		};

	};
	safety: {
		forbiddenCommands: string[];
	};
};

export type TaskSignal = {
	text: string;
	mentionedFiles: string[];
	riskDomains: RiskDomain[];
	isQuestionOnly: boolean;
	tasksLooksLikeCoding: boolean;
	estimatedFiles: number;
	estimatedLines: number;
	requiresPlan: boolean;
	isAmbiguous: boolean;
	mechanicalEdit: boolean;
};

export type RouteDecision = {
	route: ConductorRoute;
	suggestedAgent?: string;
	suggestedModel?: string;
	tier?: ConductorTier;
	requiresApproval: boolean;
	confidence: number;
	missingContextQuestions: string[];
	suggestedRefinement?: string;
	reasons: string[];
	risks: string[];
	signals: TaskSignal;
};

export type DelegationHandoff = {
	decision: RouteDecision;
	prompt: string;
};
