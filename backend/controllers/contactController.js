const Contact = require('../models/Contact');
//get contact
const getContacts=async(req,res)=>{
  try{
    const contacts=await Contact.find({userId:req.user.id});
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//create a contact
const createContact=async (req,res)=>{
  try{
    const {name, email, phone, address}=req.body;
    const contact=new Contact({
      name,
      email,
      phone,
      address,
      userId: req.user.id
    });
    console.log(contact);
    await contact.save();
    res.status(201).json({ message: 'Contact created', contact });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
//update contact
const updateContact=async (req,res)=>{
  try{
    const {id}=req.params;
    const { name, email, phone, address } = req.body;  
  const contact =await Contact.findOne({_id:id,userId:req.user.id});
  if(!contact){
     return res.status(404).json({ error: 'Contact not found' });
  }
  contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;
    contact.address = address || contact.address;
    await contact.save();
    res.json({ message: 'Contact updated', contact });
  }catch (error) {
    res.status(400).json({ error: error.message });
  }
}
//delet Contact
const deleteContact= async(req,res)=>{
  try{
    const {id}=req.params;
    const contact=await Contact.findOneAndDelete({_id:id,userId:req.user.id});
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact
};