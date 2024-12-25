import { Collection, MongoClient } from "mongodb";

export class DbHelper {
  // private properties
  private log: Collection<LogEntry>;

  // only static properties is on the class, that is why no matter the number of instances, this property will be unique too
  private static _instance: DbHelper | null;
  // if is not static property, it will be on the instance.


  // make the constructor private to avoid creating more than one instance 
  // btw constructor can't be async
  // (otherwise instance1 = new DbHelper(), instance2 = new DbHelper())
  private constructor(log: Collection<LogEntry>) {
    this.log = log;
  }

  // use static function to make sure this function is unque
  public static init() {

    // check to make sure to have one and only one instance
    if (this._instance) return;

    // Do whatever to initialize
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    const database = client.db("calculator");
    const log = database.collection<LogEntry>("logs");
    // init the instance
    this._instance = new DbHelper(log);
  }

  // methods
  public static async getCollection() {
    if (!this._instance) throw new Error("Not initialized");
    return this._instance.log
  }
}

// usage:
DbHelper.init()
DbHelper.getCollection();
