import { Router } from "express";
import upload from "../middleware/multerUploader.js";
import prisma from "../middleware/prismaInit.js";
import { authenticateRequest } from "../middleware/authMiddleware.js";

const route = Router();

// Post message
route.post('/send', authenticateRequest, upload.none(), async (req, res) => {
    try {
        const {id} = req.user;
        const {toUserId, text} = req.body;

        const result = await prisma.oma_Message.create({
            data: {
                text,
                fromUserId: id,
                toUserId,
            }
        });

        if (!result) {
            return res.status(400).json({message: 'Error updating message Log'});
        }        

        res.status(201).json({message:'Message added successfully'});
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }   
})

export default route;