import mongoose from 'mongoose';
import survivorSchema from '../models/Survivors';

const dbUrl = process.env.DB_URL || 'mongodb://localhost/zssn';

mongoose.connect(dbUrl);
mongoose.Promise = global.Promise;

const Survivor = mongoose.model('survivors', survivorSchema);

export default { Survivor };
