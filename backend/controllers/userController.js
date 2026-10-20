
import sql from '../config/db.js';
import { clerkClient } from '@clerk/express';

// Get the current user's AI credits
export const getUserCredits = async (req, res) => {
    try {
        const { userId } = req.auth();

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Please log in to view your credits'
            });
        }

        console.log('Credits API: authenticated user found');

        const user = await clerkClient.users.getUser(userId);

        const freeUsage = Number(
            user.privateMetadata?.free_usage ?? 0
        );

        const credits = Math.max(0, 300 - freeUsage);

        return res.status(200).json({
            success: true,
            credits
        });
    } catch (error) {
        console.error('Get user credits error:', error);

        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch credits'
        });
    }
};

// Get the current user's creations
export const getUserCreations = async (req, res) => {
    try {
        const { userId } = req.auth();

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const creations = await sql`
            SELECT *
            FROM creations
            WHERE user_id = ${userId}
            ORDER BY created_at DESC
        `;

        return res.status(200).json({
            success: true,
            creations
        });
    } catch (error) {
        console.error('Get user creations error:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch creations'
        });
    }
};

// Get published creations
export const getPublishedCreations = async (req, res) => {
    try {
        const creations = await sql`
            SELECT *
            FROM creations
            WHERE publish = true
            ORDER BY created_at DESC
        `;

        return res.status(200).json({
            success: true,
            creations
        });
    } catch (error) {
        console.error('Get published creations error:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch published creations'
        });
    }
};

// Like or unlike a creation
export const toggleLikeCreation = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { id } = req.body;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        if (id === undefined || id === null) {
            return res.status(400).json({
                success: false,
                message: 'Creation ID is required'
            });
        }

        const [creation] = await sql`
            SELECT *
            FROM creations
            WHERE id = ${id}
        `;

        if (!creation) {
            return res.status(404).json({
                success: false,
                message: 'Creation not found'
            });
        }

        const currentLikes = Array.isArray(creation.likes)
            ? creation.likes.map(String)
            : [];

        const userIdStr = String(userId);

        const updatedLikes = currentLikes.includes(userIdStr)
            ? currentLikes.filter((user) => user !== userIdStr)
            : [...currentLikes, userIdStr];

        const message = currentLikes.includes(userIdStr)
            ? 'Creation Unliked'
            : 'Creation Liked';

        await sql`
            UPDATE creations
            SET likes = ${`{${updatedLikes.join(',')}}`}::text[]
            WHERE id = ${id}
        `;

        return res.status(200).json({
            success: true,
            message
        });
    } catch (error) {
        console.error('Toggle like error:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to update like'
        });
    }
};
