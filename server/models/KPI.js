import mongoose from "mongoose";

const Schema = mongoose.Schema;

const KPISchema = new Schema(
    {
    //    PIC: Array<number>,
    //    PPC: Array<number>,
    }

)

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;