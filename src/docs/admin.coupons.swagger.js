/**
 * @swagger
 * components:
 *   schemas:
 *     Coupon:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         code:
 *           type: string
 *         type:
 *           type: string
 *           enum: [fixed, percentage]
 *         value:
 *           type: number
 *         maxDiscount:
 *           type: number
 *         minOrder:
 *           type: number
 *         expiresAt:
 *           type: string
 *           format: date-time
 *         usageLimit:
 *           type: number
 *         usedCount:
 *           type: number
 *         isActive:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 * /admin/coupons:
 *   post:
 *     summary: Create a coupon (Admin Only)
 *     tags:
 *       - Admin Coupons
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - type
 *               - value
 *               - maxDiscount
 *               - minOrder
 *               - expiresAt
 *               - usageLimit
 *             properties:
 *               code:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [fixed, percentage]
 *               value:
 *                 type: number
 *               maxDiscount:
 *                 type: number
 *               minOrder:
 *                 type: number
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *               usageLimit:
 *                 type: number
 *     responses:
 *       201:
 *         description: Coupon created
 *   get:
 *     summary: Get all coupons (Admin Only)
 *     tags:
 *       - Admin Coupons
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Coupon'
 *
 * /admin/coupons/{id}:
 *   get:
 *     summary: Get coupon by ID (Admin Only)
 *     tags:
 *       - Admin Coupons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *   patch:
 *     summary: Edit coupon by ID (Admin Only)
 *     tags:
 *       - Admin Coupons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [fixed, percentage]
 *               value:
 *                 type: number
 *               maxDiscount:
 *                 type: number
 *               minOrder:
 *                 type: number
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *               usageLimit:
 *                 type: number
 *     responses:
 *       200:
 *         description: Coupon updated
 *   delete:
 *     summary: Delete coupon by ID (Admin Only)
 *     tags:
 *       - Admin Coupons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon deleted
 */
