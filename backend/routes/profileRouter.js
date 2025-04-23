import { Router } from "express";
import upload from "../middleware/multerUploader.js";
import prisma from "../middleware/prismaInit.js";
import { uploadToCloudinary } from "../middleware/cloudinaryInit.js";
import { authenticateRequest } from "../middleware/authMiddleware.js";

const route = Router();

// get profile
route.get('/fetch', authenticateRequest, async (req, res) => {
    try {
        const { username } = req.user;

        const profile = await prisma.oma_User.findUnique({
            where: {username},
            select: {
                id: true,
                username: true,
                nickname: true,
                profilePicture: true,
                sentMessages: {
                    include: {
                        fromUser: true
                    }
                },
                recievedMessages: {
                    include: {
                        fromUser: true
                    }
                },
                contacts: {
                    select: {
                        contact: {
                            select: {
                                id: true,
                                username: true,
                                nickname: true,
                                profilePicture: true,
                            }
                        }
                    }
                }
            },
        });        

        if (!profile) {
            return res.status(400).json({message: 'Profile not found'});
        }

        res.json(profile);

    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }   
});

route.post('/picture', authenticateRequest, upload.single('file'), async (req, res) => {
    try {
        // console.log(req);
        const { username } = req.user;
        const file = req.file;

        // Upload file to Coudinary
        const couldinaryResult = await uploadToCloudinary(file);
        console.log(couldinaryResult);
        
        const result = await prisma.oma_User.update({
            where: {username},
            data: {
                profilePicture: {
                    upsert: {
                        update: {
                          name: couldinaryResult.original_filename,
                          url: couldinaryResult.secure_url,
                          size: couldinaryResult.bytes,
                          publicId: couldinaryResult.public_id,
                        },
                        create: {
                          name: couldinaryResult.original_filename,
                          url: couldinaryResult.secure_url,
                          size: couldinaryResult.bytes,
                          publicId: couldinaryResult.public_id,
                        },
                    }
                }
            }
        })

        if (!result) {
            return res.status(400).json({message: 'Profile not found'});
        }

        res.status(201).json({message:'Profile edited successfully'});
    } catch (error) {
      console.error('Error editing profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }   
});

route.post('/nickname', authenticateRequest, upload.none(), async (req, res) => {
    try {
        const { username } = req.user;
        const {name} = req.body;

        const result = await prisma.oma_User.update({
            where: { username },
            data: { nickname: name }
        });

        if (!result) {
            return res.status(400).json({message: 'Profile not found'});
        }

        res.status(201).json({message:'Profile edited successfully'});
    } catch (error) {
      console.error('Error editing profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }   
});

route.post('/addContact', authenticateRequest, upload.none(), async (req, res) => {
    try {
        const { username, id } = req.user;
        const {contactName} = req.body;

        const contact = await prisma.oma_User.findUnique({
            where: {username: contactName},    
        })

        // console.log(contact);

        // Create the UserContact entry
        const result = await prisma.oma_UserContact.create({
        data: {
            userId: id,
            contactId: contact.id,
        },
        });

        if (!result) {
            return res.status(400).json({message: 'Profile not found'});
        }

        res.status(201).json({message:'Profile edited successfully'});
    } catch (error) {
      console.error('Error editing profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }   
});

export default route;