import { ActivityList } from "./activities.js";
import { kantineFetch } from "./kantine.js";
import { busDepartureFetch } from "./busstops.js";
import { buildBusData } from "./busstops.js";
import { clock } from "./time.js";

ActivityList();
kantineFetch();
busDepartureFetch();
buildBusData();
clock();