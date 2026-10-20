
import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
    try {
        const { userId, has } = req.auth();

        console.log("Auth diagnostic:", {
            userId: userId ?? null,
            authorizationHeaderPresent: Boolean(
                req.headers.authorization
            ),
        });

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Please log in first",
            });
        }

        const user = await clerkClient.users.getUser(userId);

        const hasPremiumPlan =
            typeof has === "function"
                ? await has({ plan: "premium" })
                : false;

        let freeUsage = Number(
            user.privateMetadata?.free_usage ?? 0
        );

        if (!Number.isFinite(freeUsage) || freeUsage < 0) {
            freeUsage = 0;
        }

        req.free_usage = freeUsage;
        req.plan = hasPremiumPlan ? "premium" : "free";

        return next();
    } catch (error) {
        console.error(
            "Authentication middleware error:",
            error.message
        );

        return res.status(401).json({
            success: false,
            message: "Authentication failed",
        });
    }
};
