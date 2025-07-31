// Authentication middleware - Checks user authentication and plan status
import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    // Get user authentication data from Clerk
    const { userId, has } = await req.auth();
    const hasPremiumPlan = await has({ plan: "premium" });

    // Fetch user details from Clerk
    const user = await clerkClient.users.getUser(userId);

    // Handle free usage tracking
    if (!hasPremiumPlan && user.privateMetadata.free_usage) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      // Initialize free usage counter for new users
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });
      req.free_usage = 0;
    }

    // Set plan type for request processing
    req.plan = hasPremiumPlan ? "premium" : "free";
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
