import dayjs from "dayjs";
import Charts from "../Charts";
import Widget from "../Widget";

const Throughput = async () => {
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
  } = await fetch("http://localhost:3333/1/throughput").then((res) =>
    res.json()
  );

  return (
    <Widget
      read={<div className="text-[#8E8ECD]">{read.toFixed(2)} KB/s</div>}
      title="Throughput"
      write={<div className="text-[#00A3CA]">{write.toFixed(2)} KB/s</div>}
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

export default Throughput;
