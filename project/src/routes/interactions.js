import express from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../config/supabase.js';

export const interactionRouter = express.Router();

/**
 * @swagger
 * /api/interactions:
 *   post:
 *     summary: Create a new interaction
 *     tags: [Interactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - type
 *             properties:
 *               customer_id:
 *                 type: string
 *               type:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Interaction created successfully
 */
interactionRouter.post('/', [
  body('customer_id').notEmpty(),
  body('type').notEmpty(),
  body('notes').optional(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const interactionData = {
      ...req.body,
      user_id: req.user.id
    };

    const { data: interaction, error } = await supabase
      .from('interactions')
      .insert([interactionData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(interaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/interactions/customer/{customerId}:
 *   get:
 *     summary: Get interactions for a customer
 *     tags: [Interactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of interactions
 */
interactionRouter.get('/customer/:customerId', async (req, res) => {
  try {
    const { data: interactions, error } = await supabase
      .from('interactions')
      .select('*')
      .eq('customer_id', req.params.customerId)
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(interactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});