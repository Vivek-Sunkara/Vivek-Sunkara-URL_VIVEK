import { nanoid } from "nanoid";
import { ShortURL } from "../models/shorturl.model.js";
import { ObjectId } from "mongodb";


export const createShortUrl = async (req, res) => {
 try {
   let { originalUrl, title, expiresAt, customUrl } = req.body;
   const userId = req.user.id;


   if (!userId || !originalUrl) {
     return res
       .status(400)
       .json({ message: "userId or originalUrl missing in payload" });
   }


   let isUnique = false;
   let data = null,
     shortCode = null;


   while (!isUnique) {
     shortCode = nanoid(7);
     data = await ShortURL.findOne({ shortCode: shortCode, isActive: true });
     if (!data) {
       isUnique = true;
     }
   }


   if(!expiresAt){
           expiresAt = new Date()
           expiresAt.setDate( expiresAt.getDate() + 30);
   }


   const newShortenUrl = await ShortURL.create({
     originalUrl : originalUrl,
     shortCode : shortCode,
     userId : userId,
     expiresAt : expiresAt,
     title : title,
   });




   return res.status(201).json(newShortenUrl);


 } catch (error) {
   console.log("Error in creating short url", error);
   res.status(500).json({ message: "Internal Server Error" });
 }
};

export const updateShortUrl = async (req, res) => {
 try {
   const { id } = req.params;
   const { title } = req.body;
   const userId = req.user.id;

   const shortUrl = await ShortURL.findOne({ _id: new ObjectId(id), userId: userId });
   
   if (!shortUrl) {
     return res.status(404).json({ message: "Short URL not found" });
   }

   shortUrl.title = title || shortUrl.title;
   await shortUrl.save();

   return res.status(200).json(shortUrl);
 } catch (error) {
   console.log("Error in updating short url", error);
   res.status(500).json({ message: "Internal Server Error" });
 }
};

export const deleteShortUrl = async (req, res) => {
 try {
   const { id } = req.params;
   const userId = req.user.id;

   const shortUrl = await ShortURL.findOne({ _id: new ObjectId(id), userId: userId });
   
   if (!shortUrl) {
     return res.status(404).json({ message: "Short URL not found" });
   }

   await ShortURL.deleteOne({ _id: new ObjectId(id) });

   return res.status(200).json({ message: "Short URL deleted successfully" });
 } catch (error) {
   console.log("Error in deleting short url", error);
   res.status(500).json({ message: "Internal Server Error" });
 }
};


