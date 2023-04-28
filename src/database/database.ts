import { Client } from "pg";
import config from "../config/config";

const client = new Client(config.db);

client.connect();

export = client;
