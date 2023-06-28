import express from "express";
import axios from "axios";
import Redis from "redis";

import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import { kpis, products, transactions } from "./data/data.js";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import KPI from "./models/KPI.js";

/* REDIS SETUP */
const redisClient = Redis.createClient();
redisClient.on("error", (error) => console.log(error));
redisClient.on("connect", () => console.log("Redis connected"));

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


/* ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(Kpis);
})
.catch((error) => console.log(`${error} did not connect`));

/*
Commands REDISH
SET : Set the value of a key
GET : Get the value of a key
DEL : Delete a key
INCR : Increment the integer value of a key by one
DECR : Decrement the integer value of a key by one
RPUSH : Append one or multiple values to a list
LRANGE : Get a range of values from a list
LINDEX : Get an element from a list by its index
LPOP : Remove an element from a list

EXPIRE : Set a key's time to live in seconds
TTL : Get the time to live for a key
PUBLISH : Publish a message to a channel
SUBSCRIBE : Listen for messages published to a channel

ZADD : Add a member to a sorted set, or update its score if it already exists
ZRANGE : Get a range of members from a sorted set, by index
ZRANGEBYSCORE : Get a range of members from a sorted set, by score
ZREM : Remove one or more members from a sorted set
ZREVRANGE : Get a range of members from a sorted set, by reverse index
ZCARD : Get the number of members in a sorted set
ZCOUNT : Count the members in a sorted set with scores within the given values
ZRANK : Determine the index of a member in a sorted set
ZRANGEBYLEX : Get a range of members from a sorted set, by lexicographical range
ZRANGEBYSCORE : Get a range of members from a sorted set, by score
ZRANK : Determine the index of a member in a sorted set
ZRANGEBYLEX : Get a range of members from a sorted set, by lexicographical range

HSET : Set the value of a hash field
HGET : Get the value of a hash field
HGETALL : Get all the fields and values in a hash
HDEL : Delete a hash field
HINCRBY : Increment the integer value of a hash field by the given number
HKEYS : Get all the fields in a hash
HVALS : Get all the values in a hash
HLEN : Get the number of fields in a hash
HEXISTS : Determine if a hash field exists
HSETNX : Set the value of a hash field, only if the field does not exist
HMSET : Set multiple hash fields to multiple values
HMGET : Get the values of all the given hash fields


SADD : Add a member to a set
SREM : Remove a member from a set
SMEMBERS : Get all the members in a set
SISMEMBER : Check if a given value is a member of a set
SCARD : Get the number of members in a set
SUNION : Get the union of multiple sets
SINTER : Get the intersection of multiple sets
SDIFF : Get the difference between multiple sets
*/

const DEFAULT_EXPIRATION = 3600;

/* REDIS SETUP */
app.get("/patients", async (req, res) => {
    const patients = await getOrSetCache("patients?noadmisip=${noadmisip}", async() => {
        const  { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/",
            { params: { noadmsip } }
        )
        return data;
    })
    res.json(patients);
});

app.get("/patients/:id", async (req, res) => {
    const patients = await getOrSetCache(`patients/${req.params.id}`, async() => {
        const  { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/",
            { params: { id: req.params.id } }
        )
        return data;
    })
    res.json(patients);
});


function getOrSetCache(key, cb) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (error, data) => {
            if (error) return reject(error);
            if (data != null) return resolve(JSON.parse(data));
            const freshData = await cb();
            redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
            resolve(freshData); 
        }
    )})
}
