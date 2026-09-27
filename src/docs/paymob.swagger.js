/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment integration with Paymob
 */

/**
 * @swagger
 * /api/paymob/pay/{orderId}:
 *   get:
 *     summary: Initiate a payment session with Paymob
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to pay for
 *     responses:
 *       200:
 *         description: Successfully created payment session. Returns the URL to iframe/payment page.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 url:
 *                   type: string
 *                   example: "https://accept.paymob.com/api/acceptance/iframes/123456?payment_token=..."
 *       400:
 *         description: Invalid order ID or payment initiation failed
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/paymob/webhook:
 *   post:
 *     summary: Paymob Transaction Webhook
 *     description: This endpoint is called by Paymob to notify the system about transaction status updates.
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               obj:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   success:
 *                     type: boolean
 *                   order:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *             description: The payload sent by Paymob
 *     responses:
 *       200:
 *         description: Webhook received and processed successfully
 *       400:
 *         description: Invalid webhook payload or signature
 *       500:
 *         description: Internal server error processing webhook
 */
