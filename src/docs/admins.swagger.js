/**
 * @swagger
 * /admin/users/getall:
 *   get:
 *     summary: Get all users with pagination and sorting (Admin Only)
 *     tags:
 *       - Admins
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of users per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort field (prefix with '-' for descending)
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: No users found
 */

/**
 * @swagger
 * /admin/users/search/user:
 *   get:
 *     summary: Search users by first name, last name, or email (Admin Only)
 *     tags:
 *       - Admins
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: First name of the user (partial search)
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: Last name of the user (partial search)
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Email of the user (partial search)
 *     responses:
 *       200:
 *         description: Successfully retrieved matching users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: No users found matching the search criteria
 */



/**
 * @swagger
 * /admin/users/get/{id}:
 *   get:
 *     summary: Get a user by ID (Admin Only)
 *     tags:
 *       - Admins
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /admin/users/delete/user/{id}:
 *   delete:
 *     summary: Delete a user by ID (Admin Only)
 *     tags:
 *       - Admins
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID to delete
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: User not found
 */
