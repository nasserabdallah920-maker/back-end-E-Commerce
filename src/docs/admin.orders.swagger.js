/**
 * @swagger
 * /admin/orders/status/{orderId}:
 *   patch:
 *     summary: Change order status (Admin Only)
 *     tags:
 *       - Admin Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
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
 *               isPaid:
 *                 type: boolean
 *               isDelivered:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Order status updated
 *
 * /admin/orders:
 *   get:
 *     summary: Get all orders (Admin Only)
 *     tags:
 *       - Admin Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Success
 *
 * /admin/orders/{orderId}:
 *   get:
 *     summary: Get specific order by ID (Admin Only)
 *     tags:
 *       - Admin Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Order not found
 */
