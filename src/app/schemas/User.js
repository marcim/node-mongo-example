import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

UserSchema.methods.checkPassword = async function(password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

export default mongoose.model('User', UserSchema);
