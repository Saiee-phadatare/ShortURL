import { nanoid } from "nanoid";
import URL from "../Models/url.js";

export async function handleShortUrl(req, res) {
   try {
        const { url } = req.body;
    
        if (!url) return res.status(400).json({ msg: "Please enter url" });
    
        const shortID = nanoid(8);

        const newURL = await URL.create({
            shortURL: shortID,
            longURL: url,
        });

        res.json({ shortURL : `${process.env.BASE_URL}/${shortID}`, longURL: newURL.longURL});
   } catch (error) {
        console.error("Error in shorten route:", error.message);
        res.status(500).json({ message: "Server error", err : error.message });
   }
}

export async function getShortURL(req, res){
    try {

        const url = await URL.findOne({ shortURL: req.params.shortID });

        if (!url) {
        return res.status(404).json({ message: "URL not found" });
        }

        url.clicks += 1;
        await url.save();

        res.redirect(url.longURL);  
        
    } catch (error) {
        console.error("Error in shorten route:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}

