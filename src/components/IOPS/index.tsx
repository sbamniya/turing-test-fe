import { formatNumber } from "@/utils/number";
import dayjs from "dayjs";
import Charts from "../Charts";
import Widget from "../Widget";

const IOPS = async () => {
  const {
    data,
    read,
    write,
  }: {
    data: {
      date: string;
      read: number;
      write: number;
      cluster_id: number;
    }[];
    read: number;
    write: number;
  } = await fetch(`${process.env.API_URL}/1/iops`).then((res) => res.json());

  return (
    <Widget
      read={<div className="text-[#AA7EDD]">{formatNumber(read)} IOPS</div>}
      title="IOPS"
      write={<div className="text-[#00A3CA]">{formatNumber(write)} IOPS</div>}
    >
      <Charts
        type="line"
        series={[
          {
            key: "read",
            stroke: "#955FD5",
            type: "monotone",
          },
          {
            key: "write",
            stroke: "#00A3CA",
            type: "monotone",
          },
        ]}
        data={data.map(({ date, read, write }) => ({
          x: dayjs(date).format("MMM, YYYY"),
          read,
          write,
        }))}
      />
    </Widget>
  );
};

export default IOPS;
