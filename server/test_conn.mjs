import mongoose from 'mongoose';

const uri = "mongodb://gsudhanshu511_db_user:Gupta%404877@ac-y7uflsp-shard-00-00.8hteni9.mongodb.net:27017,ac-y7uflsp-shard-00-01.8hteni9.mongodb.net:27017,ac-y7uflsp-shard-00-02.8hteni9.mongodb.net:27017/?ssl=true&replicaSet=atlas-m5fobw-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const testConn = async () => {
  try {
    console.log("Connecting...");
    await mongoose.connect(uri);
    console.log("Success!");
    process.exit(0);
  } catch (err) {
    console.error("Failed:", err.message);
    process.exit(1);
  }
}

testConn();
