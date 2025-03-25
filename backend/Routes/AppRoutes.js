const express=require('express');
const FraudApp=require('../Models/Apps')

const router = express.Router();

router.post('/add-fraud-app', async (req, res) => {
  try {
    const {
      app_name,
      developer,
      category,
      risk_level,
      reported_on
    } = req.body;

    const newApp = new FraudApp({
      app_name,
      developer,
      category,
      risk_level,
      reported_on,
      investigation_status: false,
      block_status: false
    });

    await newApp.save();
    res.status(201).json({ message: 'Fraud App added successfully!', newApp });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
});

router.get('/get-fraud-apps', async (req, res) => {
  try {
    const apps = await FraudApp.find();
    res.status(200).json(apps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch fraud apps', details: error.message });
  }
});

router.put('/investigate-app/:id', async (req, res) => {
  try {
    const appId = req.params.id;
    const appData = await FraudApp.findById(appId);

    if (!appData) {
      return res.status(404).json({ message: 'App not found' });
    }

    if (appData.investigation_status === true) {
      return res.status(200).json({ message: 'Already under investigation' });
    }

    appData.investigation_status = true;
    await appData.save();

    res.status(200).json({ message: 'App marked for investigation' });
  } catch (error) {
    console.error('Error investigating app:', error);
    res.status(500).json({ message: 'Error marking app for investigation' });
  }
});

router.put('/block-app/:id', async (req, res) => {
  try {
    const appId = req.params.id;
    const appData = await FraudApp.findById(appId);

    if (!appData) {
      return res.status(404).json({ message: 'App not found' });
    }

    if (appData.block_status === true) {
      return res.status(200).json({ message: 'Already blocked' });
    }

    appData.block_status = true;
    await appData.save();

    res.status(200).json({ message: 'App blocked successfully' });
  } catch (error) {
    console.error('Error blocking app:', error);
    res.status(500).json({ message: 'Error blocking app' });
  }
});

module.exports = router;
