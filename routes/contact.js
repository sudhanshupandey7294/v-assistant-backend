const express = require('express')
const router = express.Router()
const Contact = require('../models/Contact')

// POST /api/contact
router.post('/', async (req, res) => {
  try{
    const { name, email, company, role, message } = req.body
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' })

    const lead = new Contact({ name, email, company, role, message })
    await lead.save()
    return res.status(201).json({ message: 'Thanks — we have received your request.' })
  }catch(err){
    console.error('Contact save error', err)
    return res.status(500).json({ error: 'Server error saving contact' })
  }
})

module.exports = router