const express = require('express');
const router = express.Router();
const Urls = require('../Models/Urls');

router.post('/add-phishing-site', async (req, res) => {
  try {
    const { url, risk_level, detected_on, category, investigate, block } = req.body;

    const newSite = new Urls({
      url,
      risk_level,
      detected_on,
      category,
      investigate,
      block
    });

    const savedSite = await newSite.save();
    res.status(201).json(savedSite);
  } catch (error) {
    res.status(500).json({ message: 'Error saving phishing site', error });
  }
});

router.get('/get-phishing-sites', async (req, res) => {
    try {
      const phishingSites = await Urls.find();
      res.status(200).json(phishingSites);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching phishing sites', error });
    }
  });

router.put('/block-url/:id', async (req, res) => {
    try {
      const urlId = req.params.id;
      const urlData = await Urls.findById(urlId);
      if (!urlData) {
        return res.status(404).json({ message: "URL not found" });
      }
  
      if (urlData.block === true) {
        return res.status(200).json({ message: "Already blocked" });
      }
  
      urlData.block = true;
      await urlData.save();
  
      res.status(200).json({ message: "URL successfully blocked" });
    } catch (error) {
      console.error("Error blocking URL:", error);
      res.status(500).json({ message: "Error blocking URL" });
    }
  });
  
  router.put('/investigate-url/:id', async (req, res) => {
    try {
      const urlId = req.params.id;
      const urlData = await Urls.findById(urlId);
      
      if (!urlData) {
        return res.status(404).json({ message: "URL not found" });
      }
  
      if (urlData.investigate === true) {
        return res.status(200).json({ message: "Already marked for investigation" });
      }
  
      urlData.investigate = true;
      await urlData.save();
  
      res.status(200).json({ message: "URL successfully marked for investigation" });
    } catch (error) {
      console.error("Error investigating URL:", error);
      res.status(500).json({ message: "Error marking URL for investigation" });
    }
  });
  

module.exports = router;
