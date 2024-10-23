import db from "./db.js";

class Post {
    // Get all posts
    static async getAllPosts() {
        try {
            const result = await db.query("SELECT * FROM posts ORDER BY id ASC");
            return result.rows;
        } catch (error) {
            console.error("Error fetching items from the database", error.stack)
        }
    } 

    // Create new Post
    static async createPost(title, content, category, tags) {
        try {
            await db.query(
                'INSERT INTO posts (title, content, category, tags) VALUES ($1, $2, $3, $4) RETURNING *',
                [title, content, category, tags ? tags.split(',') : []]
            );
        } catch(error) {
            console.error("Error creating new posts", error.stack)
        }
    }

        // Get a single post by ID
        static async getPostById(id) {
            try {
                const result = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
                return result.rows[0];
            } catch (error) {
                console.error("Error fetching post by ID", error.stack);
                throw error;
            }
        }
        
        // Update post
        static async updatePost(id, title, content, category, tags) {
            try {
                await db.query(
                    'UPDATE posts SET title = $1, content = $2, category = $3, tags = $4, updated_at = NOW() WHERE id = $5',
                    [title, content, category, tags, id]
                );
            } catch (error) {
                console.error("Error updating post in the database", error.stack);
                throw error;
            }
        }

        // Deleting a post
        static async deletePost(id) {
            try {
                await db.query("DELETE FROM posts WHERE id = $1", [id]);
            } catch (error) {
                console.error("Error deleting the item selected", error.stack);
            }
        }

        static async searchItems(searchTerm) {
            try {
                const result = await db.query(
                    `SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1 OR category ILIKE $1 ORDER BY id ASC`,
                    [`%${searchTerm}%`]
                );
                return result.rows;
            } catch (error) {
                console.error("Error searching posts in the database", error.stack);
                throw error;
            }
        }
}

export default Post;
