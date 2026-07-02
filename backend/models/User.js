const mongoose=require('mongoose')
const bcrypt = require('bcryptjs');
 
const userSchema =new mongoose.Schema({
  name:{
    type:String,
    required: [true,'name is required']
  },
  email:{
    type:String,
    required:[true,'email is required'],
    unique:true,
    lowercase:true
  },
  password:{
    type:String,
    required:[true,'password is required'],
    minlength:[6,'password must be greater than 6 characters']
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})
//hash pasword 
userSchema.pre('save',async function(next){
  if(!this.isModified('password'))return ;
  this.password=await bcrypt.hash(this.password,10);
  
})
//compare password method
userSchema.methods.comparePassword=async function (password) {
  return await bcrypt.compare(password,this.password)
}
module.exports=mongoose.model('User',userSchema);